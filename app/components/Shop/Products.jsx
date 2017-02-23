import React from 'react';
import uuid from 'node-uuid';
import storage from "../../storage/storage.js";
import Paginator from "./Paginator.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
////

const Products = (props) => {
    const products = props.products;
    const pageInfo = props.pageInfo;
    const INDEX_OF_FIRST_ITEM = (pageInfo.currentPage - 1) * 6 + 1;
    const INDEX_OF_LAST_ITEM = INDEX_OF_FIRST_ITEM + products.length - 1;
    const TOTAL_NUMBER_OF_ITEM = pageInfo.numberOfItem;
    const SIDEBAR_IS_EXPAND = props.expandSidebar;
    return (
        <div className="col-md-9 col-sm-12" id="banner">
                <div className="shop-bg">
                    <h1>Start shopping now!</h1>
                </div>
                {SIDEBAR_IS_EXPAND ? null :<img id="filter-logo" onClick={()=>props.hideSideBar()} src='static/photos/filter-icon.png' />}
                {props.isLoading?<h2>Loading...</h2>:              
                    <div id="product-content" className="container-fluid">
                        <h3></h3>
                        {products.length===0?<span className="search-result-info" >No result found</span> :
                        <span className="search-result-info" >Showing {INDEX_OF_FIRST_ITEM} - {INDEX_OF_LAST_ITEM} of {TOTAL_NUMBER_OF_ITEM} results</span>}
                        <div className="row">
                            {products.map((product)=><div className="col-md-4" key={uuid.v4()}>
                                <div className="item">
                                    < Link to = {"/shop/"+product.id} ><img src={product.photo} alt=""/></Link>
                                    <h2>{product.name}</h2>
                                    <h3>{product.price}$</h3>
                                </div>                      
                            </div>)}                        
                        </div>              
                    </div>
                }
                <center>
                    <Paginator pageInfo={pageInfo}/>
                </center>
        </div>
    );
}

const filter = (products, state) => {
    const sortOrder = state.sortOrder;
    const priceRange = state.priceRange;
    const searchKey = state.searchKey;
    return sortByOrder(filterByPrice(filterByName(products, searchKey), priceRange), sortOrder);
}
const filterByPrice = (products, priceRange) => {
    return products.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max);
}
const sortByOrder = (products, sortOrder) => {
    if (sortOrder === "ascending") {
        return products.sort((a, b) => a.price - b.price);
    }
    products.sort((a, b) => b.price - a.price)
    return products;
}
const filterByName = (products, searchKey) => {
    if (searchKey) {
        return products.filter((product) => product.name.toLowerCase().includes(searchKey));
    }
    return products;
}


const getPageInfo = (products, activePage) => {
    const numberOfItem = products.length;
    const numberOfPage = Math.ceil(numberOfItem / 6);
    const currentPage = activePage;
    return { numberOfPage, numberOfItem, currentPage };
}

const paginate = (products, activePage) => {
    const currentPage = activePage;
    const startIndex = (currentPage - 1) * 6;
    return products.slice(startIndex, startIndex + 6);
}

const mapStateToProps = (state) => {
    const filteredProducts = filter([...state.products], state);
    const pageInfo = getPageInfo(filteredProducts, state.activePage);
    const displayedProducts = paginate(filteredProducts, state.activePage);
    return {
        products: displayedProducts,
        pageInfo,
        expandSidebar: state.expandSidebar,
        isLoading: state.isLoading
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        hideSideBar: () => dispatch({ type: "EXPAND_SIDEBAR" })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);
