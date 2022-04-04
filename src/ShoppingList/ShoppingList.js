import { useState } from "react"
import "../App.css"

const shoppingListsUrl = "http://localhost:8000/shopping-lists/all"

// Enables display of shopping lists
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
        console.log("ShoppingList data is: ", data)
        return data;
        })
        .then((data) => setShoppingList(data))
        // .then(() => shoppingList.sort(compare))
        .then(() => console.log(shoppingList.sort(compare)))
    };

    /*
        ///// Sorting Shopping List /////
        1. Assign each item a number based on its order in object or array (maybe use array index)
        2. Sort list according to assigned number
    */

    function compare(listItem1, listItem2) {
        if ( listItem1.item_loc < listItem2.item_loc ){
            return -1;
        }
        if ( listItem1.item_loc > listItem2.item_loc ){
            return 1;
        }
        return 0;
    }
    // shoppingList.sort(compare)
    // console.log('Sorted list is: ', shoppingList)

    const shoppingListItems = shoppingList.sort(compare).map((listItem) => {
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
            <div>{shoppingListItems}</div  >
        </div>
    )

}