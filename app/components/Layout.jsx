import React from 'react';
import Navbar from "./Navbar.jsx";
const Layout = (props) => {
    return <div>
		      	<Navbar/>
		      	{props.children}
		    </div>
}

export default Layout;
