import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config';
import { Helmet } from 'react-helmet';

function UserView() {
    const { id } = useParams();
    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const getUsers = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/Account/users/${id}`);
            setUserList(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [id]); 

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (

        <>
            <Helmet>
                <title>User Info</title>
            </Helmet>
            <div>UserView - {id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">UserView</h6>
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
                                            <th>Name</th>
                                            <th>E-Mail</th>
                                            <th>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>E-mail</th>
                                            <th>Phone Number</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>{userList.id}</td>
                                            <td> {userList.displayName} </td>
                                            <td>{userList.email}</td>
                                            <td>{userList.phoneNumber}</td>

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

export default UserView