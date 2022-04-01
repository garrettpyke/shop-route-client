import { useState } from "react";
import "../App.css";

const itemsUrl = 'http://localhost:8000/items/'

export default function ItemMasterForm({ userInfo }) {
  const [newItem, setNewItem] = useState({
    item_name: "",
    item_location: "",
    item_class: "",
    shopper_id: 0,
  });

  const handleChange = (event) => {
    event.persist();
    setNewItem((prevNewItem) => {
      const editedNewItem = {
        ...prevNewItem,
        [event.target.name]: event.target.value,
      };
      return editedNewItem;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(itemsUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${userInfo.token}`
        },
        method: 'POST',
        body: JSON.stringify(newItem)
    })
        .then(data => {               //remove this block later
            console.log('data is ', data)
            return data
        })
  }

  return (
      <div className="form add-item">
          <h3>Add new item:</h3>
          <form onSubmit={handleSubmit}>
                <input type="text" name="item_name" value={newItem.item_name} onChange={handleChange} placeholder="Grocery item"/>
                <input type="text" name="item_location" value={newItem.item_location} onChange={handleChange} placeholder="Location"/>
                <input type="text" name="item_class" value={newItem.item_class} onChange={handleChange} placeholder="Group"/>
                <input type="hidden" name="shopper_id" value={userInfo.id}/>
                <input type="submit" value="Add Item"/>
          </form>
      </div>
  )

}
