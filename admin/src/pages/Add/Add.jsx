import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "Salad"
    })

    const notify = () => toast.success("Product added successfully!");

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        const res = await axios.post(`${url}/api/food/add`, formData);
        if (res.data.success) {
            notify();
            const data = res.data;
            console.log(data);
            setData({
                name: "",
                description: "",
                price: 0,
                category: "Salad"
            })
            setImage(false)
        } else {
            toast.error("Food adding failed!");
        }
    }
    return (
        <div className='add'>
            <form action="submit" onSubmit={onSubmitHandler} className='flex-col'>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={(e) => onChangeHandler(e)} value={data.name} type="text" name="name" placeholder='Enter product' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={(e) => onChangeHandler(e)} value={data.description} type="text" name="description" rows='6' placeholder='enter product description' />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select name="category" onChange={(e) => onChangeHandler(e)} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Price</p>
                        <input onChange={(e) => { onChangeHandler(e) }} value={data.price} type="Number" name="price" placeholder='enter price of product' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add