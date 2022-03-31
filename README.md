# Project Overview

## Project Links

- [TBD]()
- [TBD]()
- [Back-end GitHub Repo](https://github.com/garrettpyke/shop-route)

## Project Description

My capstone SEI bootcamp project will be Shop-Route, a utility for shopping at a grocery store. The concept is an intelligent shopping list that will "route" the user through the store in order to maximize efficiency and save time. Most grocery shoppers would rather be spending their time elsewhere. 

The main user story is the typical shopper who traverses from one side of the store to the other, trying to be efficient while checking off items on their list. Unfortunately, as the list nears completion the shopper finds they forgot to get a certain produce item that happens to be at the far end of the store.

The application would likely require some initial setup by the user. The user could define how many aisles are in the store (preferably the store they normally frequent) and number them. The application will then section the aisle into 2 sides (left and right) and 3 parts (front, middle and back). For example, '3LM' would indicate aisle 3, left side, middle of the aisle. Assumptions will be made that adjacent aisles are facing each other and that the travel between the 2 facing aisles is minimal. 

The user will input a list of items, and the application will sort the list by location and display the location for each item. When the user is "checking off" an item, they will be able to enter its location if the application hasn't already "learned" it. 

Later versions could include more specific location information such as top or bottom rack. Another potential user story is the "I forgot the milk" situation when a person returns from shopping only to find they are out of a certain staple item. In this case, the application could use purchase history to remind the user that they may be low on a certain staple if they happen to be at the store now and the item is not on their list. The application could also be scoped out to include more than one store layout per shopper. Potential future updates:

1. More specific location information (top/bottom rack, etc.)
1. Feature to prevent the "I forgot the milk" situation as outlined above
1. Feature to save frequently used lists of staple items or ingredients for different recipes
1. The ability to save more than one set of locations (to support multiple stores) 

## Tech Stack: "PDRN"
- Back-end
	- Python
	- Django/Postgres
- Front-end
	- React
	- Node.js
- Deployment
	- Back-end: Heroku
	- Front-end (client): GitHub Pages

## Wireframes

- [Mobile](https://github.com/garrettpyke/shop-route/blob/main/Wireframe%20-%20Mobile.pdf)
- [Desktop](https://github.com/garrettpyke/shop-route/blob/main/Wireframe%20-%20Desktop.pdf)
- [React front-end components]()


### MVP/PostMVP - 5min

The functionality will be divided into two separate lists: MVP and PostMVP.  

#### MVP
- Allow user to enter items and quantities on shopping list
- Display location of items
- If location of an item is not in DB, allow user to enter it and store in DB
- Sort items by location, and use a logical algorithm for picking items from the opposite aisles as the user moves down the aisle
- When an item has been "checked off", change font or remove from list
- Allow user to delete an item
- Enable user to clear entire list

#### PostMVP

- An edit page to allow for item locations to change
- More specific location information (upper/lower rack and more zones than front, middle & back)
- Classification of staple items and reminders based on purchase history when user is actively shopping and a certain item isn't on the current list
- Feature to save frequently used lists of staple items or ingredients for different recipes
- Support for more than 1 store
- Graphical view of aisles & user's route through store

## Components

Based on the initial logic defined in the previous sections, here is a breakdown the logic further divided into stateless/stateful components. 

| Component | Description | 
| --- | :--- |  
| App | Will display components and include React Router |
| Home | Allow user to login
| ItemMaster | Displays current list of items & locations, and allows user to enter/edit an item and location (location will not be a required field as user may not know at time of entry)
| ShoppingList | List of items, allow user to enter a quantity  and a "done" checkbox
| About | About application & developer
| Header | Render the header including the nav | 
| Footer | Render the footer | 

## API Routing Table
| Verb   | URI Pattern            | Token    |  Response |
|--------|------------------------|----------|-----------|
| POST   | `/sign-up`             |          | 201 user object |
| POST   | `/sign-in`             |          | 201 user object with token|
| PATCH  | `/change-password`     | required | 204  |
| DELETE | `/sign-out`            | required | 204 |
| GET | `/items` | required | 200 - array of items created by that user
| POST | `/items` | required | 201 - item object
| GET | `/items/:id` | required | 200 - item object
| DELETE | `/items/:id` | required | 204
| PATCH | `/items/:id` | required | 200 - item object
| GET | `/shopping-lists/:list_num` | required | 200 -  array shopping_list items for a specific shopping list for that user
| POST | `/shopping-lists` | required | 201 - shopping_list item object
| DELETE | `/shopping-lists/item/:id` | required | 204 - (allows user to remove item from a specific shopping list)
| DELETE | `/shopping-lists/:list_num` | required | 204 - allows user to delete an entire shopping list
| PATCH | `/shopping-lists/item/:id` | required | 200 - shopping_list item object


#### Estimated time-frames

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: | 
| Spin up Django project with dependencies | H | 1 hr| 1.5 hrs | 
| Set up custom user model & test all routes | H | 3 hrs | 4 hrs |
| Create Item master model, migrate, add serializer, test all routes | H | 4 hrs | 2.5 hrs |
| Create List model with relationship to Item master, migrate, add serializer, test all routes | H | 4 hr|  | 
| Total | H | hrs| hrs | 

## Additional Libraries
- [Django QuerySet API reference](https://docs.djangoproject.com/en/4.0/ref/models/querysets/)

## Code Snippet

This section will include a brief code snippet of functionality that I am proud of an a brief description.  Code snippet will not be greater than ~10 lines of code. 

```
// code will be posted here
```
