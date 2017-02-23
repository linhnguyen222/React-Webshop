import React from 'react';
import { Pagination } from 'react-bootstrap';
class Paginator extends React.Component {
    componentDidMount() {
        this.unsubscribe = this.store.subscribe(this.resetActivePage);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    constructor(props, context) {
        super(props);
        this.store = context.store;
        this.state = { activePage: this.props.pageInfo.currentPage };
    }

    handleSelect = (eventKey) => {
        const CURRENT_PAGE = this.props.pageInfo.currentPage;
        if (CURRENT_PAGE !== eventKey) {
            this.store.dispatch({ type: "CHANGE_PAGE", activePage: eventKey });
        }
    }
    resetActivePage = () => {
        const CURRENT_PAGE = this.state.activePage;
        const NEW_PAGE_FROM_STORE = this.store.getState().activePage;
        if (CURRENT_PAGE === NEW_PAGE_FROM_STORE && CURRENT_PAGE != 1) {
            this.store.dispatch({ type: "RESET_PAGE" });
        } else {
            this.setState({ activePage: NEW_PAGE_FROM_STORE });
        }
    }

    render() {
        const numberOfPage = this.props.pageInfo.numberOfPage;
        if (numberOfPage > 0) {
            return (
                <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={numberOfPage}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect} />
            );
        }
        return null;
    }
}
Paginator.contextTypes = { store: React.PropTypes.object };
export default Paginator;
