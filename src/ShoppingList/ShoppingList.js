import { useState } from "react";
import "../App.css";

const shoppingListsUrl = "http://localhost:8000/shopping-lists/all";

// Enables display of shopping lists
export default function ShoppingList({ userInfo }) {
  const [shoppingList, setShoppingList] = useState([]);

  // Fetches Shopping List for current user
  const handleClick = () => {
    fetch(shoppingListsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userInfo.token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setShoppingList(data))
      .then(() => console.log(shoppingList.sort(compare))); //remove
  };

  // Sorts by item location
  function compare(listItem1, listItem2) {
    if (listItem1.item_loc < listItem2.item_loc) {
      return -1;
    }
    if (listItem1.item_loc > listItem2.item_loc) {
      return 1;
    }
    return 0;
  }

  const shoppingListItems = shoppingList.sort(compare).map((listItem) => {
    return (
      <>
        <p key={listItem.item_num}>{listItem.item_desc}</p>
        <p>{listItem.item_loc}</p>
        {/* {listItem.item_qty}  Add to list later... */}
        <p>{listItem.item_complete.toString()}</p>
        {/* <button></button> */}
      </>
    );
  });

  return (
    <div className="shopping-list-header">
      <h3>Shopping List</h3>
      <button className="button-main" onClick={handleClick}>
        View Shopping List
      </button>
      <div className="shopping-list">
        <h5>Item</h5>
        <h5>Location</h5>
        <h5>Done?</h5>
        {shoppingListItems}
      </div>
    </div>
  );
}
