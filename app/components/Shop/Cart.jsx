import React from 'react';
import { connect } from 'react-redux';

const Cart = (props) => {
    const itemsInCard = props.cart;
    const totalPrice = calculateTotalPrice(itemsInCard);
    return <div>
	        	<h2>Your cart</h2>
	            <ul>			
	            	{itemsInCard.length !== 0? itemsInCard.map((item)=><li className="cart-items" key={item.id}>
	            	<span className="remove-from-cart-button" onClick={() => props.deleteItem(item.id)}>x</span>
	            	<img src={item.photo} alt=""/>
	            	<span>{item.name}</span>
	            	<span className="amount">{item.price}$ x {item.amount}</span> 
	            	</li>
	            	):<span>Your cart is empty</span>}
	            </ul>
	            {itemsInCard.length!==0?
	            	(<center><hr/><h2>Total: {totalPrice}$</h2><span></span><button id="checkout-button" onClick={props.checkOut}>CHECK OUT</button></center>)
	            	:null}
            </div>
}
const calculateTotalPrice = (itemsInCard) => itemsInCard.reduce((totalPrice, item) => totalPrice + item.price * item.amount, 0);
const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (id) => {
            dispatch({ type: "DELETE_ITEM_FROM_CART", id });
        },
        checkOut: () => dispatch({ type: "SHOW_CONFIRM" })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
