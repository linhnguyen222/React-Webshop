import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router';
const productCarousel = (props) => {
    const products = props.products.filter((product) => product.type == props.filterType);
    return <Carousel>
					{products.map((product)=>
						<Carousel.Item key={product.photo}>
							<div>
								<center>
									<img src={product.photo}  alt=""/>
									<h3>{product.name}</h3>
									<text>{product.price}$</text>
									<div>
										< Link to = {product.link} className="btn btn-primary btn-md">SHOP NOW</Link>
										<a href="" className="btn btn-success btn-md">ADD TO CART</a>
									</div>
								</center>
							</div>	    
					    </Carousel.Item>)}   							    	
			</Carousel>

};

export default productCarousel;
