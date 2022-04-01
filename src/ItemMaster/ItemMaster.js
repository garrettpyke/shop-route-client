import { useState } from 'react';
import '../App.css'
import ItemMasterForm from '../ItemMasterForm/ItemMasterForm';

const itemsUrl = 'http://localhost:8000/items/'

export default function ItemMaster({ userInfo }) {
    const [items, setItems] = useState([])

    const handleClick = () => {
        fetch(itemsUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${userInfo.token}`
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {             //remove this block later
                console.log('data is ', data)
                return data
            })
            .then(data => setItems(data))
    }

    const itemsList = items.map((item) => {
        return (
            <li key={item.id}>{item.item_name} {item.item_location} {item.item_class}</li>
        )
    })

    return (
        <div className="item-master">
            <button onClick={handleClick}>Master Items List</button>
            <ItemMasterForm userInfo={userInfo} handleClick={handleClick}/>
            <h5>{itemsList}</h5>
        </div>
    )


}