import React from "react";
import { Link } from 'react-router';
import ProductCarousel from "./ProductCarousel.jsx";
const Row = (props) => {
    const products = props.products;
    const detail = props.detail;
    const index = props.index;
    return <div className="row">
				<div className={"col-md-8 "+(index % 2==0? "col-md-push-4": null)} id={"banner"+(index+1).toString()}>
					<div className={"bannerInfo"+(index+1).toString()} >
						<h1>{detail.title}<br/>{detail.subtitle}</h1>
						< Link to = "/shop" >SHOP NOW</Link>
					</div>
				</div>
					    
				<div className={"col-md-4 productSlider "+(index % 2 == 0?"col-md-pull-8":null)}>
					<ProductCarousel products={products} filterType={detail.filter}/>
				</div>
			</div>
}
export default Row;
