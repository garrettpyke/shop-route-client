import { useState } from "react";
import "../App.css";
import ItemMasterForm from "../ItemMasterForm/ItemMasterForm";

const itemsUrl = "http://localhost:8000/items/";
const shoppingListsUrl = "http://localhost:8000/shopping-lists/";

export default function ItemMaster({ userInfo }) {
  const [items, setItems] = useState([]);
  // list_num is hard-coded currently...will use to support multiple shopping lists later
  let shoppingListItem = {item_num: 0, item_qty: "", list_num: 1}

  // Fetches Item Master list for current user
  const handleClick = () => {
    fetch(itemsUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userInfo.token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        //remove this block later//
        console.log("data is ", data);
        return data;
      })
      .then((data) => setItems(data));
  };

  // Adds an item to current user's Shopping List
  const addToShoppingList = (itemId, item_qty) => {
    shoppingListItem.item_num = itemId
    shoppingListItem.item_qty = item_qty
    console.log("shoppingListItem is: ", shoppingListItem)

    fetch(shoppingListsUrl, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${userInfo.token}`,
        },
        method: 'POST',
        body: JSON.stringify(shoppingListItem)
    })
        .then(res => res.json())
        .then(data => {             //remove this block later
            console.log('shopping-list data is ', data)
            return data
        })
  }

  // Renders Item Master list
  const itemsList = items.map((item) => {
    return (
        <>
            <li key={item.id}>
                {item.item_name} {item.item_location} {item.item_class} {item.id}
            </li>
            {/* <form>
                <input type="text" name="item_qty" defaultValue="1" placeholder="Item Qty"/>
                <input type="submit" value="Add to Shopping List"/>
            </form> */}

            {/* key is incremented here re React doesn't want same key value for different children */}
            <button key={item.id+1} onClick={() => addToShoppingList(item.id, 1)}>Add to Shopping List</button>
          
        </>
    );
  });

  return (
    <div className="item-master">
      <button onClick={handleClick}>Master Items List</button>
      <ItemMasterForm userInfo={userInfo} handleClick={handleClick} />
      <div className="item-list">{itemsList}</div>
    </div>
  );
}
