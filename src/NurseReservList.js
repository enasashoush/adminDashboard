import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from './config'
import { Helmet } from 'react-helmet'

function Reservationlist() {
    const [reservList, setReservList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAppointments();
    }, []);

    let getAppointments = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/Nurse/all-appointments`);
            setReservList(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    if (!Array.isArray(reservList)) {
        console.error("Expected data to be an array, but got:", reservList);
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <p>Unexpected data format</p>
            </div>
        );
    }

    let handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
            if (confirmDelete) {
                await axios.delete(`${API_BASE_URL}/api/Nurse/cancel-appointment/${id}`);
                getAppointments();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <>
            <Helmet>
                <title>Reservations</title>
            </Helmet>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Reservation-List</h1>
            </div>
            {/* <!-- DataTables --> */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-success">DataTables</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt='enas' />
                            : <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nurse Name</th>
                                            <th>Booking Date</th>
                                            <th>Patint Name</th>
                                            <th>Patint Address</th>
                                            <th>Fees</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nurse Name</th>
                                            <th>Booking Date</th>
                                            <th>Patint Name</th>
                                            <th>Patint Address</th>
                                            <th>Fees</th>
                                            <th>Action</th>

                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {reservList.map((appointment) => {
                                            return (
                                                <tr>
                                                    <td>{appointment.id}</td>
                                                    <td> {appointment.appNurse.nurseName} </td>
                                                    <td>Start Date: {formatDate(appointment.startTime)} - End Date: {formatDate(appointment.endTime)}</td>
                                                    <td>{appointment.patientName}</td>
                                                    <td>{appointment.street}</td>
                                                    <td>{appointment.appNurse.price}</td>
                                                    <th>
                                                        <Link to={`/reservation-view/${appointment.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                                                        <button onClick={() => handleDelete(appointment.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Reservationlist