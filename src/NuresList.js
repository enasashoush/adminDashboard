import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from './config'

function Nurselist() {

  const [nurseList, setNurseList] = useState([]);
  const [isLoading, setLoading] = useState(true);
 
  useEffect(() => {
    //On Load 
    getNurses();
    console.log("welcome nurse");
  }, []);

  let getNurses = async () => {
    try {
      const {data} = await axios.get(`${API_BASE_URL}/api/Nurse`);
      setNurseList(data.nurses);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`${API_BASE_URL}/api/Nurse/${id}`);
        getNurses(); //check it
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Nurse-List</h1>
        <Link to="/nurse-create" className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Add-Nurse
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
                      <th> Name</th>
                      <th>Email</th>
                      <th>Fees</th>
                      <th>Hospital</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                    <th>Id</th>
                      <th> Name</th>
                      <th>Email</th>
                      <th>Fees</th>
                      <th>Hospital</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {nurseList.map((nurse) => {
                      return (
                        <tr>
                          <td>{nurse.id}</td>
                          <td>{nurse.nurseName}</td>
                          <td>{nurse.email}</td>
                          <td>{nurse.price}</td>
                          <td>{nurse.hospital}</td>

                          <th>
                            <Link to={`/nurse-view/${nurse.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/nurse-edit/${nurse.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(nurse.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default Nurselist