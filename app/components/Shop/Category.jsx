import React from 'react';
import { connect } from 'react-redux';

const Category = (props) => {
    const chosenOption = (props.component === "category" ? props.category : props.sortOrder);
    const types = ['All', 'T-shirts', 'Sweaters', 'Jackets', 'Sneakers', 'Accessories'];
    const sortOrders = ["Ascending", "Decending"]
    const categories = (props.component === "category" ? types : sortOrders);
    return <ul>
                {categories.map((category)=><li className={category.toLowerCase()===chosenOption?"chosenOption":null} onClick={changeCategory(props.chooseCategory,chosenOption)} key={category}>{category}</li>)}
            </ul>
}

const mapStateToProps = (state) => {
    return {
        category: state.category,
        sortOrder: state.sortOrder,
    }
}

const changeCategory = (chooseCategory, currentCategory) => (e) => {
    const category = e.target.innerHTML.toLowerCase();
    if (category !== currentCategory) {
        chooseCategory(category);
    }
}

export default connect(mapStateToProps, null)(Category);
