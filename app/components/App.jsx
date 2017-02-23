import React from 'react';
import Navbar from "./Navbar.jsx";
import FirstPage from "./FirstPage.jsx";
import Shop from "./Shop/Shop.jsx";
import ProductInfo from "./Shop/ProductInfo.jsx"
import Layout from "./Layout.jsx";
import Contact from "./Form.jsx";
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history = { browserHistory }>
				<Route path="/" component={Layout} >
					<IndexRoute component={FirstPage}/>
					<Route path="shop" component={Shop}/>
					<Route path="shop/:productId" component={ProductInfo}/>
				</Route>
			</Router>
        )
    }

}


export default App;
/* 
<Router history = { browserHistory }>
				<Route path="/" component={Layout} >
					<IndexRoute component={FirstPage}/>
					<Route path="shop" component={Shop}/>
					<Route path="shop/:productId" component={ProductInfo}/>
				</Route>
			</Router>*/
