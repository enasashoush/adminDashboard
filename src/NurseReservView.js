import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config';
import { Helmet } from 'react-helmet';

function ReservationView() {
    const { id } = useParams();
    const [appointment, setAppointment] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/Nurse/appointments/${id}`);
                setAppointment(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, [id])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <>
            <Helmet>
                <title>Reservation Details</title>
            </Helmet>
            <div>Reservation View - {id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-success">Reservation View</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt='loading' />
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nurse Name</th>
                                            <th>Booking Date</th>
                                            <th>Patint Name</th>
                                            <th>Patint Address</th>
                                            <th>Fees</th>


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

                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>{appointment.id}</td>
                                            <td>{appointment.appNurse.nurseName}</td>
                                            <td>Start Date: {formatDate(appointment.startTime)} - End Date: {formatDate(appointment.endTime)}</td>
                                            <td>{appointment.patientName}</td>
                                            <td>{appointment.street} {appointment.city}</td>
                                            <td>{appointment.appNurse.price}</td>



                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        </>

    )
}

export default ReservationView