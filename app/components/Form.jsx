import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            feedback: "",
        }
    }

    render() {
        return (
            <div id="contact-form" >
            	<img id="close-button" src="/static/photos/close.png" onClick={this.props.close} alt=""/>
            	<div className="form-content row">
            		<div className="container">
            			<div className="col-md-8 col-md-offset-2">
            				<h1>Hello!</h1>
	            			<input type="text" placeholder="Your Name" value ={this.state.name} onChange={this.handleChange('name')}/><br/>
	            			<input type="text" placeholder="Your email" value ={this.state.email} onChange={this.handleChange('email')}/><br/>
	            			<textarea name="" placeholder="Give me feedback" rows="4" value ={this.state.feedback} onChange={this.handleChange('feedback')}></textarea>
            			</div>        			
            			<div className="col-md-2 col-md-offset-8">
            				<button type="button" className="btn btn-danger" disabled={!this.state.name||!this.state.email||!this.state.feedback} onClick={this.submit}>Submit</button>
            			</div>
            		</div>
            	</div>
            </div>
        );
    }

    handleChange = (key) => {
        return (e) => {
            const newState = {};
            newState[key] = e.target.value;
            this.setState(Object.assign({}, this.state, newState));
        }
    }

    submit = () => {
        console.log(this.state);
        this.setState(Object.assign({}, this.state, { name: "", email: "", feedback: "" }));
    }
}

export default Form;
