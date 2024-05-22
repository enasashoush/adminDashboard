import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Categorylist() {

    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getCategories();
        console.log("welcome");
    }, []);

    let getCategories = async () => {
        try {
            const users = await axios.get("https://63a9bccb7d7edb3ae616b639.mockapi.io/users");
            setCategoryList(users.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    let handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
            if (confirmDelete) {
                await axios.delete(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${id}`);
                getCategories();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Category-List</h1>
                <Link to="/portal/create-category" className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
                    <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
                    Create Category
                </Link>
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
                                            <th>Category Name</th>
                                            <th>Category Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Category Name</th>
                                            <th>Category Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {categoryList.map((user) => {
                                            return (
                                                <tr>
                                                    <td>{user.id}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
            
                                                    <th>
                                                        <Link to={`/portal/category-view/${user.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                                                        <Link to={`/portal/category-edit/${user.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                                                        <button onClick={() => handleDelete(user.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default Categorylist