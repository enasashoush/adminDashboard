import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from './config'

function Userlist() {

  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getUsers();
    console.log("welcome");
  }, []);

  let getUsers = async () => {
    try {
      const {data} = await axios.get(`${API_BASE_URL}/api/Account/normalUsers`);
      setUserList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  if (!Array.isArray(userList)) {
    console.error("Expected data to be an array, but got:", userList);
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
        await axios.delete(`${API_BASE_URL}/api/Account/users/${id}`);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">User-List</h1>
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
                      <th>Name</th>
                      <th>E-Mail</th>
                      <th>Phone Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>Phone Number</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {userList.map((user) => {
                      return (
                        <tr>
                          <td>{user.id}</td>
                          <td>{user.displayName}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <th>
                            <Link to={`/user-view/${user.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
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

export default  Userlist