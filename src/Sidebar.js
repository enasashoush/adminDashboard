import { faFaceLaughWink, faTachographDigital, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './authContext';

function Sidebar() {
    const { token } = useContext(AuthContext);

    return (<>
        {token ? <>
            <ul className="navbar-nav bg-gradient-success sidebar sidebar-dark accordion" id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="dashboard">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />
                    </div>
                    <div className="sidebar-brand-text mx-3">HealthGuard Admin</div>
                </a>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">
                        <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Users --> */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/user-list">
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                        <span>Users</span>
                    </Link>
                </li>

                <li className="nav-item active">
                    <Link className="nav-link" to="/product-list">
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                        <i class="fa-brands fa-product-hunt" ></i>
                        <span>Product</span>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/Nurselist">
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                        <span>Nurses</span>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/Orderlist">
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                        <span>Orders</span>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/Reservationlist">
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                        <span>Reservation</span>
                    </Link>
                </li>

            </ul> </> : <> </>} 
            </>

    )
}

export default Sidebar