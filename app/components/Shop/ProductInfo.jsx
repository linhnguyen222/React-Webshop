import React from 'react';
import uuid from 'node-uuid';
import CommentForm from './CommentsForm.jsx'
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import Alert from "./Alert.jsx";
export class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainImage: "",
            isLoading: true,
            photos: [],
            price: 0,
            name: "",
            comments: [],
            id: 1
        };
    }
    componentDidMount() {
        const photos = ["/static/photos/slideModel3.jpg", "/static/photos/slideModel4.jpg",
            "/static/photos/slideModel5.jpg", "/static/photos/slideModel6.jpg"
        ];
        const pathName = this.props.location.pathname;
        axios.get('/api' + pathName)
            .then((response) => {
                let product = response.data;
                product.mainImage = product.photo;
                product.photos = photos;
                this.setState(Object.assign({}, this.state, product));
            });
    }

    render() {
        const mainImage = this.state.mainImage;
        const images = this.state.photos;
        const name = this.state.name;
        const price = this.state.price;
        const comments = this.state.comments;
        return (
            <div id="product-details">
            <div id="bg-product">
            </div>      
            <div className="container">
                <div className="row">
                    <div className="col-sm-1 col-xs-3" id="small-images">
                        {images.map((image)=><img onMouseOver={()=>this.changeMainImage(image)} onClick={()=>this.changeMainImage(image)} key={uuid.v4()} src={image} alt="" className={"img-responsive" +(image === mainImage?" chosen-picture":"")}/>)}
                    </div>
                    <div className="col-sm-5 col-xs-8">
                        <img src={mainImage} alt="" className="img-responsive"/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div id="info">
                            <h1>{name}</h1>
                            <h2><span className="label label-danger">{price}$</span></h2>
                            <h4 id="availability"><strong>Availability:</strong> In stock</h4>
                            <p><strong>Description:</strong> A skirt is the lower part of a dress or gown, covering the person from the waist downwards, or a separate outer garment serving this purpose.[1]
The hemline of skirts can vary from micro to floor-length art of another garment such as leggings, shorts, and swimsuits.
In the western world, skirts are more commonly worn by women</p>
                            <span><strong>Amount:</strong> </span>
                            <input ref={(input) => this.amount = input} type="number" defaultValue="1" name="quantity" min="1" max="100"/>
                            <br/>
                            <button className="btn btn-success" onClick={this.addToCart}>Add to cart</button>
                            <Link className="btn btn-primary" to = "/shop" >Go back to shop</Link>
                        </div>
                        <Alert id="alert" content={"Added to cart successfully!"}/>                  
                    </div>

                </div>
                <center>
                    <h3>Comments</h3>
                </center>
                <div className="row">
                    <div className="col-md-offset-2 col-md-8" >
                        {comments.map((comment)=>(
                            <blockquote key={uuid.v4()}>
                                <h3>{comment.rating} {comment.rating>1?"stars":"star"}</h3>
                                <p>{comment.comment}</p>
                                <footer>By {comment.name} at {comment.date}</footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
                <CommentForm addComment={this.addComment}/>
            </div>
            
        </div>
        )
    }

    changeMainImage = (newImage) => {
        this.setState(Object.assign({}, this.state, { mainImage: newImage }));
    }
    addComment = (comment) => {
        const pathName = this.props.location.pathname;
        axios.post('/api' + pathName, comment)
            .then((response) => {
                const comments = this.state.comments.concat([comment]);
                this.setState(Object.assign({}, this.state, { comments }));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    addToCart = () => {
        const id = this.state.id;
        const photo = this.state.mainImage;
        const name = this.state.name;
        const price = this.state.price;
        const amount = parseInt(this.amount.value);
        this.props.addToCart({ id, photo, name, price, amount });
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {
            dispatch({ type: "ADD_ITEM_TO_CART", item });
            dispatch({ type: "SHOW_ALERT" });
        },
    }
}

export default connect(null, mapDispatchToProps)(ProductInfo);
