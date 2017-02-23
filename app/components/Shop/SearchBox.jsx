import React from 'react';
import { connect } from 'react-redux';

const SearchBox = (props) => {
    return <input type="text" id="Search-box" className="form-control" onChange={props.search} value={props.searchKey} placeholder="Search by name"/>
}

const mapStateToProps = (state) => {
    return {
        searchKey: state.searchKey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search: (e) => {
            const searchKey = e.target.value.toLowerCase();
            dispatch({ type: "SEARCH_BY_KEY", searchKey });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
