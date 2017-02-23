import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router';
const carouselInstance = () => {
    const slideDetails = [{
        id: "slide1",
        subTitle: "AUTUMN & WINTER",
        title: "NEW COLLECTION LOOKBOOK"
    }, {
        id: "slide2",
        subTitle: "AUTUMN & WINTER",
        title: "NEW COLLECTION LOOKBOOK"
    }, {
        id: "slide3",
        subTitle: "AUTUMN & WINTER",
        title: "NEW COLLECTION LOOKBOOK"
    }, {
        id: "slide4",
        subTitle: "AUTUMN & WINTER",
        title: "NEW COLLECTION LOOKBOOK"
    }];
    return <div className="jumbotron">
			    <Carousel>
			    	{slideDetails.map((slide)=>(
					    <Carousel.Item id={slide.id} key={slide.id}>
					      	<Carousel.Caption>
					     		<center>
			                        <h2>{slide.subTitle}</h2>
			                        <h1>{slide.title}</h1>
			                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu odio
			                            <br/> non justo euismod congue ut nec orci.</p>
			                        < Link to = "/shop" >SHOP NOW</Link>
			                    </center>
					      	</Carousel.Caption>
			    		</Carousel.Item>
					))}
			    	
			  	</Carousel>
		  	</div>
};

export default carouselInstance;
