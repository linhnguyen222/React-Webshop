import React from 'react';
import PriceBar from './PriceRange.jsx';
import Cart from './Cart.jsx';
import { connect } from 'react-redux';
import SearchBox from "./SearchBox.jsx";
import Category from "./Category.jsx";
const SideBar = (props) => {
    const expandSidebar = props.expandSidebar;
    const styleSideBar = { width: "80%", padding: "0px 15px 0px 15px" };
    const sortOption = props.sortOrder;
    const categories = ['All', 'T-shirts', 'Sweaters', 'Jackets', 'Sneakers', 'Accessories'];
    const sortOrder = ["Ascending", "Decending"];
    return <aside className="col-md-3 col-xs-10" id="sideBar" style={expandSidebar?styleSideBar:null}>
                <div id="sidebar-content">
                    <div id="closeButton"><span onClick={props.hide}>x</span></div>
                    <SearchBox/>
                    <h2>Category</h2>
                    <Category chooseCategory={props.chooseCategory} component={"category"}/>
                    <h2>Price</h2>
                    <PriceBar/>
                    <h2>Sorted by price</h2>
                    <Category chooseCategory={props.chooseSortOrder} component={"sorter"}/>
                    <Cart/>
                </div>
            </aside>
}




const mapStateToProps = (state) => {
    return {
        expandSidebar: state.expandSidebar
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        hide: () => dispatch({ type: "HIDE_SIDEBAR" }),
        chooseCategory: (category) => {
            ownProps.fetchProducts(category);
            dispatch({ type: 'CHANGE_CATEGORY', category });
        },
        chooseSortOrder: (sortOrder) => {
            if (sortOrder === "ascending") {
                dispatch({ type: "SORT_BY_ASCENDING_ORDER" });
            } else {
                dispatch({ type: "SORT_BY_DESCENDING_ORDER" });
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
