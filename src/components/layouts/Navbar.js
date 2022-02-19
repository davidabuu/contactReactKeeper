import { Fragment, useContext } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
const Navbar = ({title}) => {
    const contactContext = useContext(ContactContext)
    const authContext = useContext(AuthContext);
    const {isAuthenticated, logout, user} = authContext;
    const {clearContacts} = contactContext;
    const onLogout = () => {
        logout();
        clearContacts();
    }
    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#:" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )
    return (
        <div className='navbar bg-primary'>
        <h1>{title}</h1>
        <ul>
            {isAuthenticated ? authLinks : guestLinks}
        </ul>
        </div>
    )
}
Navbar.defaultProps = {
    title: 'Contact Keeper'
}

export default Navbar;
