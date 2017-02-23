import React from 'react';
import Sidebar from "./Sidebar.jsx";
import Products from "./Products.jsx";
import { connect } from 'react-redux';
import axios from 'axios';
import Confirm from "./Confirm.jsx";
import Alert from "./Alert.jsx";
export class Shop extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts(this.props.category);
    }
    render() {
        return (
            <div id="shop" className="container-fluid">
		      	<div className="row">
			      	<Sidebar fetchProducts={this.props.fetchProducts}/>
			      	<Products />
		      	</div>
                <Confirm/>
                <Alert content={"Successful payment!"}/>
		    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: (category) => {
            dispatch(fetchData(category))
        }
    }
};

const fetchData = (category) => {
    return dispatch => {
        dispatch({ type: "IS_LOADING" });
        return axios.get('/api/products/' + category)
            .then(function(response) {
                const products = response.data;
                dispatch({ type: "STOP_LOADING" })
                dispatch({ type: "ADD_PRODUCTS", products })
            })
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Shop);
