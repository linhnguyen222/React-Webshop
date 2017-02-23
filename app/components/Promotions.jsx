import React from 'react';
import PromotionRow from "./Promotion-row.jsx";
const promotion = () => {
    const products = [{ photo: "static/photos/slideModel1.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "male" },
        { photo: "static/photos/slideModel2.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "male" },
        { photo: "static/photos/slideModel3.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "female" },
        { photo: "static/photos/slideModel4.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "female" },
        { photo: "static/photos/slideModel5.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "glass" },
        { photo: "static/photos/slideModel6.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "glass" },
        { photo: "static/photos/slideModel3.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "saleOff" },
        { photo: "static/photos/slideModel4.jpg", name: "Hoodie", price: 100, link: "/shop/11", type: "saleOff" },
    ];

    const details = [{ title: "MEN STYLE", subtitle: "LOOKBOOK", filter: "male" },
        { title: "HELLO GIRLS", subtitle: "FASHION", filter: "female" },
        { title: "CASUAL SPRING", subtitle: "EYEWEAR", filter: "glass" },
        { title: "SALE UP TO", subtitle: "50% OFF", filter: "saleOff" },
    ];
    return <div className="container-fluid" id="promotions">
			    	{details.map((detail, index)=><PromotionRow key={index} products={products} index ={index} detail={detail}/>)}
		  	</div>
};

export default promotion;
