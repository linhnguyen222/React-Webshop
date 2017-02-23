import React from 'react';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';

const PriceRange = (props) => {
    const values = props.values;
    return (<form className="form">
                    <InputRange maxValue={500} minValue={0} value={values} onChange={props.changePriceRange} />
            </form>);
}
const mapStateToProps = (state) => {
    return {
        values: state.priceRange,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePriceRange: (component, priceRange) => {
            dispatch({ type: "CHANGE_PRICE_RANGE", priceRange });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceRange);
