import {  faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './authContext'
import { jwtDecode } from "jwt-decode";


function Topbar() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate()
    const [username, setUsername] = useState('');


    useEffect(() => {
        const token = localStorage.getItem("tkn");
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded);
            setUsername(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
        }
    }, []);

    function logout() {
        localStorage.removeItem('tkn')
        setToken(null)
        navigate('/')
    }
    return (<>
        {token ? <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <FontAwesomeIcon icon={faBars} />
                </button>

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">

                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/* <!-- Nav Item - User Information --> */}
                    <li className="nav-item dropdown no-arrow">
                        <Link onClick={logout} className="nav-link dropdown-toggle" to="/" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {/* Admin name */}
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{username}</span>
                            <FontAwesomeIcon icon={faCircleUser} size={"xl"} />
                        </Link>
                    
                    </li>

                </ul>

            </nav></> : <> </>}
    </>

    )
}

export default Topbar