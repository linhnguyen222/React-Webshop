import React from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import Contact from "./Form.jsx";
import axios from 'axios';
class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollValue: 0,
            colorNavBar: false,
            hidden: false,
            contact_form_visible: false,
            animation: false
        };
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.props.check_authenticated();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = (e) => {
        let scrollValue = window.pageYOffset;
        const state = Object.assign({}, this.state);
        if (scrollValue > this.state.scrollValue) {
            state.colorNavBar = false;
            state.hidden = true;
            if (JSON.stringify(state) !== JSON.stringify(this.state)) {
                this.setState(state);
            }

        } else {
            state.colorNavBar = false;
            state.hidden = false;
            if (scrollValue != 0) {
                state.colorNavBar = true;
            }
            if (JSON.stringify(state) !== JSON.stringify(this.state)) {
                this.setState(state);
            }
        }
        this.setState(Object.assign(this.state, { scrollValue }));
    }

    render = () => {
        const colorNavBar = this.state.colorNavBar;
        const user = this.props.user;
        const contact_visible = this.state.contact_form_visible;
        return (
            <div>
                < Navbar className = "navbar-fixed-top"
                    style = { this.state.hidden ? { "display": "none" } : null }
                    id = { colorNavBar ? "colorNav" : "transparent" } >
                    <Navbar.Header>
                              <Navbar.Brand>
                                < Link to = "/" ><img src='/static/photos/logo.png' /></Link>
                              </Navbar.Brand>                    
                              <Navbar.Toggle className={this.state.animation?"x-animation":null} onClick={this.animate}/>
                    </Navbar.Header> 
                    < Navbar.Collapse className = "navbar-default" >
                        <Nav pullRight>
                            <LinkContainer to="/shop"><NavItem eventKey={1}><span className="glyphicon glyphicon-shopping-cart"></span> SHOP</NavItem></LinkContainer>
                            <NavItem eventKey={2} onClick={this.openContactForm(true)}><span className="glyphicon glyphicon-earphone"></span> CONTACT</NavItem>
                            {user?<NavItem eventKey={3} id="fb-profile"><img className="img-circle" src={user.picUrl} alt="profile pic"/><span> {user.name}</span></NavItem>:
                                <NavItem eventKey={3} onClick={this.fbLogin}><span className="glyphicon glyphicon-user"></span> LOGIN</NavItem>
                            }
                            {user?<NavItem eventKey={4} onClick= {this.props.logOut}>LOG OUT</NavItem>:null}
                        </Nav> 
                    < /Navbar.Collapse> 
                </Navbar >
                {contact_visible?<Contact close={this.openContactForm(false)}/>:null}
            </div>
        );
    }
    animate = () => {
        this.setState(Object.assign(this.state, { animation: !this.state.animation }));
    }
    openContactForm = (value) => {
        return () => {
            this.setState(Object.assign(this.state, { contact_form_visible: value }));
        }
    }


    fbLogin = () => {
        var popupWidth = 500;
        var popupHeight = 300;
        var xPosition = (window.innerWidth - popupWidth) / 2;
        var yPosition = (window.innerHeight - popupHeight) / 2;
        var loginUrl = "https://www.facebook.com/dialog/oauth?client_id=1173733756052776&response_type=code&redirect_uri=http://atshop.pythonanywhere.com/fblogin/&scope=user_friends&display=popup";
        window.open(loginUrl, "LoginWindow",
            "location=1,scrollbars=1," +
            "width=" + popupWidth + ",height=" + popupHeight + "," +
            "left=" + xPosition + ",top=" + yPosition);

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userInfo
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        check_authenticated: () => {
            dispatch(check_authenticate())
        },
        logOut: () => {
            axios.post('/api/logout', {})
                .then(function(response) {
                    dispatch({ type: "NO_USER" });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};

const check_authenticate = () => {
    return dispatch => {
        return axios.get('/api/checklogin').then(
            (response, err) => {
                const loginStatus = response.data;
                if (loginStatus !== "failed") {
                    axios.get('/api/getuserinfo').then(
                        (res, err) => {
                            const user = res.data;
                            if (user) {
                                dispatch({ type: "ADD_USER", user })
                            }
                        }
                    )
                }
            });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
