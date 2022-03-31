import { useState } from 'react';
import './App.css'

const itemsUrl = 'http://localhost:8000/items/'

export default function ItemMaster({ tokenInfo }) {
    const [items, setItems] = useState([])

    const handleClick = () => {
        fetch(itemsUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${tokenInfo.user.token}`
            },
            method: 'GET'
            // no body OK?
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
            <h5>{itemsList}</h5>
        </div>
    )


}