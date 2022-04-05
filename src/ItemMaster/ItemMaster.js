import { useState } from "react";
import "../App.css";
import ItemMasterForm from "../ItemMasterForm/ItemMasterForm";
import ShoppingList from "../ShoppingList/ShoppingList";

const itemsUrl = "http://localhost:8000/items/";
const shoppingListsUrl = "http://localhost:8000/shopping-lists/";

export default function ItemMaster({ userInfo }) {
  const [items, setItems] = useState([]);
  // list_num is hard-coded currently...will use to support multiple shopping lists later
  let shoppingListItem = {
    item_num: 0,
    item_qty: "",
    list_num: 1,
    item_desc: "",
    item_loc: "",
  };

  // Fetches Item Master list for current user
  const handleClick = () => {
    fetch(itemsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userInfo.token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
    //   .then(() => setItems([])) 
  };

  // Adds an item to current user's Shopping List
  const addToShoppingList = (itemId, itemQty, itemName, itemLocation) => {
    shoppingListItem.item_num = itemId;
    shoppingListItem.item_qty = itemQty;
    shoppingListItem.item_desc = itemName;
    shoppingListItem.item_loc = itemLocation;
    // remove later //
    console.log("shoppingListItem is: ", shoppingListItem);

    fetch(shoppingListsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userInfo.token}`,
      },
      method: "POST",
      body: JSON.stringify(shoppingListItem),
    })
      .then((res) => res.json())
      .then((data) => {
        //remove this block later
        console.log("shopping-list-item data is ", data);
        return data;
      });
  };

  // Sort master items list by item description (name)
  function compare(item1, item2) {
    if (item1.item_name < item2.item_name) {
      return -1;
    }
    if (item1.item_name > item2.item_name) {
      return 1;
    }
    return 0;
  }

  // Renders Item Master list
  const itemsList = items.sort(compare).map((item) => {
    return (
      <>
        <p key={item.id}>{item.item_name}</p>
        <p>{item.item_location}</p>
        <p>{item.item_class}</p>
        {/* key is incremented here re React doesn't want same key value for different children */}
        <button
          key={item.id + 1}
          onClick={() =>
            addToShoppingList(item.id, 1, item.item_name, item.item_location)
          }
        >
          Add to Shopping List
        </button>
      </>
    );
  });

  return (
    <div className="item-master">
      <button className="button-main" onClick={handleClick}>
        Master Items List
      </button>
      <ItemMasterForm userInfo={userInfo} handleClick={handleClick} />
      <div className="item-list">
        <h5>Item Description</h5>
        <h5>Location</h5>
        <h5>Category</h5>
        <h5>Add</h5>
        {itemsList}
      </div>
      <ShoppingList userInfo={userInfo} />
    </div>
  );
}
