import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
const alert = (props) => {
    autoHide(props.hide);
    if (props.display) {
        return <Alert bsStyle="success" id="alert" onDismiss={props.hide}>
		        	<p>{props.content}</p>
		    	</Alert>
    }
    return null;
}
const autoHide = (hide) => {
    setTimeout(hide, 1000);
}

function mapStateToProps(state) {
    return {
        display: state.showAlert
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide: () => dispatch({ type: "HIDE_ALERT" })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(alert)
