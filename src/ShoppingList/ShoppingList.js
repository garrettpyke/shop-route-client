import { useState } from "react"
import "../App.css"

const shoppingListsUrl = "http://localhost:8000/shopping-lists/all"

export default function ShoppingList(userInfo) {
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

    const shoppingListItems = shoppingList.map((item) => {
        
    })
}