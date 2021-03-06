import { useState } from "react";
import "../App.css";

const shoppingListsUrl = "http://localhost:8000/shopping-lists/1";
const shoppingListItemUrl = "http://localhost:8000/shopping-lists/item/";

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
    if (listItem1.item_location < listItem2.item_location) {
      return -1;
    }
    if (listItem1.item_location > listItem2.item_location) {
      return 1;
    }
    return 0;
  }

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

  const shoppingListItems = shoppingList.sort(compare).map((listItem) => {
    return (
      <>
        <p key={listItem.id}>{listItem.item_name}</p>
        <p key={listItem.id + 1}>{listItem.item_location}</p>
        {/* {listItem.item_qty}  Add to list later... */}
        <button key={listItem.id + 2} onClick={() => handleDelete(listItem.id)}>
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
