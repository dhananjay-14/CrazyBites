import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";


export const Store = createContext(null);
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);

    // base url for api requests
    const url = import.meta.env.VITE_BACKEND_URL;

    const fetchFood = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }



    //jwt token is stored here after login/register
    const [jwt, setJwt] = useState("");

    //user should not be logged out after reload
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setJwt(token);
        }
        async function fetch() {
            await fetchFood();
        }
        fetch();
    }, [])

    const addToCart = (id) => {
        if (!cartItems[id]) {
            setCartItems((prev) => ({ ...prev, [id]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [id]: 1 + prev[id] }));
        }
    }

    const removeFromCart = (id) => {
        setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const storeItem = { food_list, cartItems, addToCart, removeFromCart, getTotalCartAmount, jwt, setJwt, url }
    return (
        <Store.Provider value={storeItem}>
            {props.children}
        </Store.Provider>
    )
}
export default StoreContextProvider;