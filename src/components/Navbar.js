import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { userProfile } from '../redux/slices/users';


const Navbar = () => {
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('userName')))
    const { user } = useSelector((state) => state.userProfile)
    const dispatch = useDispatch();

    const onLogout = () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('userId')
        window.location.href = '/login'
        setUserName('')
        dispatch(userProfile(null))
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">THE ROYAL RETREAT</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <RxHamburgerMenu />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {(userName || user) ?
                            <Dropdown className='loged-user-name' bsPrefix="user-dropdown">
                                <Dropdown.Toggle id="dropdown-basic">
                                    <FaUser/> {userName ?? user.name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Bookings</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={onLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            : <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </ul>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar