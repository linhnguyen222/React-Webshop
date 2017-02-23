import React from 'react';
import { connect } from 'react-redux';
class CommentsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user ? this.props.user.name : "",
            rating: 5,
            comment: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            if (nextProps.user.name != this.state.name) {
                this.setState(Object.assign({}, this.state, { name: nextProps.user.name }));
            }
        } else {
            if (this.state.name) {
                this.setState(Object.assign({}, this.state, { name: "" }));
            }
        }
    }
    render() {
        const ratings = [1, 2, 3, 4, 5]
        return (
            <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Your Name</label>
                    <div className="col-sm-8">
                    	{this.props.user ? <label className="control-label">{this.props.user.name}</label>: <input type="text" className="form-control" name="name" onChange={this.handleChange('name')} value ={this.state.name} placeholder="Enter Your Name" />}     	
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Number of Stars</label>
                    <div className="col-sm-8">
                    	{ratings.map((rating)=>(<label className="radio-inline" key={rating}>
                            <input type="radio" name="optradio" onChange={this.handleChange('rating')} value={rating} defaultChecked={rating==5?true:false}/>{rating}</label>))}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Your comments</label>
                    <div className="col-sm-8">
                        <textarea className="form-control" rows = "12" value ={this.state.comment} onChange={this.handleChange('comment')}></textarea>  
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-primary" disabled={!this.state.name||!this.state.comment}>Submit Comment</button>
                    </div>
                </div>
        	</form>
        );
    }

    handleChange = (key) => (e) => {
        const newState = {}
        newState[key] = e.target.value;
        this.setState(Object.assign({}, this.state, newState));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        const commentDetail = Object.assign({}, this.state, { date: date.toLocaleDateString() });
        this.props.addComment(commentDetail);
        this.setState(Object.assign({}, this.state, { name: this.props.user ? this.props.user.name : "", rating: 5, comment: "" }));
    }


}

const mapStateToProps = (state) => {
    return {
        user: state.userInfo
    };
}



export default connect(mapStateToProps, null)(CommentsForm);
