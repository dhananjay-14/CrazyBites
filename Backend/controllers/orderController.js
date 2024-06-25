import { CurrencyCodes } from "validator/lib/isISO4217.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontendurl = "https://crazybites-frontend.onrender.com";
// Placing user order 
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 1000
            },
            quantity: item.quantity
        }))
        line_items.push(
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: 10 * 1000
                },
                quantity: 1
            })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontendurl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendurl}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({
            success: true,
            session_url: session.url
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to place order"
        })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true,
                message: "Payment success"
            })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Payment failed"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to verify payment"
        })
    }
}

//get user orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

//  get all orders 
const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//update order status
const updateStatus = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        return res.json({
            success: true,
            message: "Order status updated successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
export { placeOrder, verifyOrder, userOrders, getOrders, updateStatus }
