import { useState } from "react"
import "../App.css"

// List number is hard-coded for version 1
const shoppingListsUrl = "http://localhost:8000/shopping-lists/1"
const shoppingListItemUrl = "http://localhost:8000/shopping-lists/item/";

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
        .then((data) => setShoppingList(data))
        .then(() => console.log(shoppingList.sort(compare))); //remove console.log later (but still sort)
    };

    function handleDelete(listItemId) {
      fetch(`${shoppingListItemUrl}${listItemId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userInfo.token}`,
        },
        method: "DELETE",
      })
        .then((res) => console.log(res)) // remove //
        .then(() => handleClick());
    }

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
          <p key={listItem.item_num}>{listItem.item_name}</p>
          <p>{listItem.item_location}</p>
          {/* {listItem.item_qty}  Add to list later... */}
          {/* <p>{listItem.item_complete.toString()}</p> */}
          <button
            key={listItem.item_num + 2}
            onClick={() => handleDelete(listItem.id)}
          >
            Done!
          </button>
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