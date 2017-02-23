import { createStore, combineReducers, applyMiddleware } from 'redux';
import storage from "../storage/storage.js";
import axios from 'axios';
import thunk from 'redux-thunk';

const products = (products = [], action) => {
    switch (action.type) {
        case 'ADD_PRODUCTS':
            return action.products
        case 'DELETE_PRODUCT':
            //          
        default:
            return products;
    }
};

const expandSidebar = (expandSidebar = false, action) => {
    switch (action.type) {
        case 'EXPAND_SIDEBAR':
            return true;
        case 'HIDE_SIDEBAR':
            return false;
        default:
            return expandSidebar;
    }
};

const sortOrder = (sortOrder = "ascending", action) => {
    switch (action.type) {
        case 'SORT_BY_ASCENDING_ORDER':
            return "ascending";
        case 'SORT_BY_DESCENDING_ORDER':
            return "decending";
        default:
            return sortOrder;
    }
}

const searchKey = (searchKey = "", action) => {
    if (action.type === "SEARCH_BY_KEY") {
        return action.searchKey;
    }
    return searchKey;
}

const priceRange = (priceRange = { min: 40, max: 300 }, action) => {
    if (action.type === "CHANGE_PRICE_RANGE") {
        const newPriceRange = action.priceRange;
        return newPriceRange;
    }
    return priceRange;
}

const category = (category = "all", action) => {
    if (action.type === "CHANGE_CATEGORY") {
        return action.category;
    }
    return category;
}

const activePage = (activePage = 1, action) => {
    switch (action.type) {
        case "CHANGE_PAGE":
            return action.activePage;
        case "RESET_PAGE":
            return 1;
    }
    return activePage;
}

const cart = (cart = storage.get(), action) => {
    switch (action.type) {
        case "ADD_ITEM_TO_CART":
            storage.add(action.item);
            return storage.get();
        case "DELETE_ITEM_FROM_CART":
            storage.delete(action.id);
            return storage.get();
        case "DELETE_ALL_ITEM":
            storage.deleteAll();
            return storage.get();
        default:
            return cart;
    }
}

const isLoading = (isLoading = false, action) => {
    switch (action.type) {
        case "IS_LOADING":
            return true;
        case "STOP_LOADING":
            return false;
    }
    return isLoading
}

const userInfo = (userInfo = null, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return action.user
        case 'NO_USER':
            return null
    }
    return userInfo
}

const showConfirm = (showConfirm = false, action) => {
    switch (action.type) {
        case 'SHOW_CONFIRM':
            return true;
        case 'HIDE_CONFIRM':
            return false;
    }
    return showConfirm;
}

const showAlert = (showAlert = false, action) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            return true;
        case 'HIDE_ALERT':
            return false;
    }
    return showAlert;
}


const shopReducer = combineReducers({
    products,
    expandSidebar,
    sortOrder,
    searchKey,
    priceRange,
    category,
    activePage,
    cart,
    isLoading,
    userInfo,
    showConfirm,
    showAlert
});

const store = createStore(shopReducer, applyMiddleware(thunk));

export default store;
