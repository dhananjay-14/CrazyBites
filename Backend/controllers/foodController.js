import foodModel from "../models/foodModel.js";
import fs from "fs";

//Add a food item
const addFood = async (req, res) => {
    const imageName = `${req.file.filename}`
    const item = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: imageName,
        category: req.body.category
    })
    try {
        await item.save();
        res.json({
            message: "Food item added successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: "Failed to upload the image",
            success: false
        })
    }
}

// get all food items
const listFood = async (req, res) => {
    try {
        const foodlist = await foodModel.find({});
        res.json({
            success: true,
            data: foodlist
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to fetch food list"
        })
    }
}

// remove an item 
const removeFood = async (req, res) => {
    try {
        const item = await foodModel.findById(req.body.id);
        if (item) {
            fs.unlink(`uploads/${item.image}`, () => { });
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({
                success: true,
                message: "Successfully deleted item from the database"
            })
        }
        else {
            console.log("Item not found")
            res.json({
                success: false,
                message: "Item not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to remove food item"
        })
    }
}
export { addFood, listFood, removeFood }