import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config';
import { Helmet } from 'react-helmet';

function NurseView() {
    const { id } = useParams();
    const [nurseList, setNurseList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getNurse = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/Nurse/${id}`);
                setNurseList(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false); 
            }
        };

        getNurse();
    }, [id]); 

    return (
        <>
            <Helmet>
                <title>Nurse Info</title>
            </Helmet>
            <div>NurseView - {id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">NurseView</h6>
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
                                            <th> Name</th>
                                            <th>Email</th>
                                            <th> Hospital</th>
                                            <th> Specialty</th>
                                            <th>Fees</th>
                                            <th>Spacfication</th>
                                            <th> image</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th> Name</th>
                                            <th>Email</th>
                                            <th> Hospital</th>
                                            <th> Specialty</th>
                                            <th>Fees</th>
                                            <th>Spacfication</th>
                                            <th> image</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>{nurseList.id}</td>
                                            <td> {nurseList.nurseName} </td>
                                            <td>{nurseList.email}</td>
                                            <td>{nurseList.hospital}</td>
                                            <td>{nurseList.specialty}</td>
                                            <td>{nurseList.price}</td>
                                            <td>{nurseList.description}</td>
                                            <img className=' w-100' src={nurseList.picUrl} alt='cover' />

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

export default NurseView