
export default function compare(listItem1, listItem2) {
    if ( listItem1.item_loc < listItem2.item_loc ){
        return -1;
    }
    if ( listItem1.item_loc > listItem2.item_loc ){
        return 1;
    }
    return 0;
}

/*
        ///// Sorting Shopping List /////
        1. Assign each item a number based on its order in object or array (maybe use array index)
        2. Sort list according to assigned number
*/