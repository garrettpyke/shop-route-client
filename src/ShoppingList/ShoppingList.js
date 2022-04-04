import { useState } from "react"
import "../App.css"

const shoppingListsUrl = "http://localhost:8000/shopping-lists/all"

export default function ShoppingList({ userInfo }) {
    const [shoppingList, setShoppingList] = useState([])

    // Fetches Shopping List for current user
    const handleClick = () => {
    fetch(shoppingListsUrl, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userInfo.token}`,
        },
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
        //remove this block later//
        console.log("ShoppingList data is: ", data);
        return data;
        })
        .then((data) => setShoppingList(data));
    };

    const shoppingListItems = shoppingList.map((listItem) => {
        return (
            <>
                <li key={listItem.item_num}>
                    {listItem.item_desc} 
                    {listItem.item_loc} 
                    {listItem.item_qty} 
                    {listItem.item_complete.toString()} 
                </li>
            </>
        )
    })

    return (
        <div className="shopping-list">
            <h3>Shopping List</h3>
            <button onClick={handleClick}>View Shopping List</button>
            <ul>{shoppingListItems}</ul>
        </div>
    )

}