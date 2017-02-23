import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
const modal = (props) => {
    return <Modal show={props.show} onHide={props.hide}>
	    <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title">Confirm payment</Modal.Title>
	    </Modal.Header>
        <Modal.Body>
            Are you sure that you want to pay for those items?
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.hide}>Cancel</Button>
            <Button bsStyle="primary" onClick={props.pay}>Make payment</Button>
        </Modal.Footer>
    </Modal>
}

const mapStateToProps = (state) => {
    return {
        show: state.showConfirm,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide: () => dispatch({ type: "HIDE_CONFIRM" }),
        pay: () => {
            dispatch({ type: "DELETE_ALL_ITEM" });
            dispatch({ type: "HIDE_CONFIRM" });
            dispatch({ type: "SHOW_ALERT" });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(modal);
