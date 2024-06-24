import React, { useEffect } from 'react'
import './List.css'
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
const List = ({ url }) => {
    const [list, setList] = useState([]);
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response.data.data);
        if (response.data.success) {
            setList(response.data.data);
        }
        else {
            toast.error("Failed to fetch list");
        }
    }

    const removeItem = async (id) => {
        console.log("item id ", id)
        const response = await axios.delete(`${url}/api/food/remove`, { data: { id: id } });
        if (response.data.success) {
            toast.success("Item removed successfully");
            await fetchList();
        }
        else {
            toast.error("Failed to remove item");
            console.log(response.data)
        }
    }
    useEffect(() => {
        fetchList();
    }, []);
    return (
        <div className='list add flex-col'>
            <h1 className='Allfood'>All Food items</h1>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Category</b>
                    <b >Action</b>
                </div>
                {list.map((item, index) => {
                    return (<div key={index} className='list-table-format'>
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>Rs.{item.price}</p>
                        <p>{item.category}</p>
                        <p className='cursor' onClick={() => removeItem(item._id)}>X</p>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default List