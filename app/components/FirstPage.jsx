import React from "react";
import Promotions from "./Promotions.jsx";
import Carousel from "./CarouselComponent.jsx";
import { Link } from 'react-router';
const FirstPage = (props) => (
    <div>
    	<Carousel/>
    	<Promotions/>
    </div>
);
export default FirstPage;
