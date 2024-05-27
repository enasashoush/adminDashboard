import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Productlist() {

  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getProducts();
    console.log("welcome");
  }, []);

  let getProducts = async () => {
    try {
      const users = await axios.get("https://63a9bccb7d7edb3ae616b639.mockapi.io/users");
      setProductList(users.data);
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
        getProducts(); //check it
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Product-List</h1>
        <Link to="/portal/create-product" className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create Product
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
                      <th>product Name</th>
                      <th>product Price</th>
                      <th>category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                    <th>Id</th>
                      <th>product Name</th>
                      <th>product Price</th>
                      <th>category</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {productList.map((user) => {
                      return (
                        <tr>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.country}</td>

                          <th>
                            <Link to={`/portal/product-view/${user.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/product-edit/${user.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
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

export default Productlist