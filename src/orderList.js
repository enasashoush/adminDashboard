import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from './config'
import { Helmet } from 'react-helmet'

function Orderlist() {

  const [orderList, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  let getOrders= async () => {
    try {
      const {data} = await axios.get(`${API_BASE_URL}/api/Orders/all-orders`);
      setOrderList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`${API_BASE_URL}/api/Orders/${id}`);
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (!Array.isArray(orderList)) {
    console.error("Expected data to be an array, but got:", orderList);
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <p>Unexpected data format</p>
        </div>
    );
}
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
  return (
    <>
          <Helmet>
            <title>Order List</title>
        </Helmet>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Order-List</h1>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt='loading' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                    <th>Id</th>
                      <th>User E-Mail</th>
                      <th>OrderDate</th>
                      <th>ShippingAddress </th>
                      <th>Total Order COSt</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                    <th>Id</th>
                      <th>User E-Mail</th>
                      <th>OrderDate</th>
                      <th>ShippingAddress </th>
                      <th>Total Order COSt</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {orderList.map((orderList) => {
                      return (
                        <tr>
                          <td>{orderList.id}</td>
                          <td>{orderList.buyerEmail}</td>
                          <td>{formatDate(orderList.orderDate)}</td>
                          <td>{orderList.shippingAddress.city}</td>
                          <td>{orderList.total}</td>

                          <th>
                            <Link to={`/order-view/${orderList.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <button onClick={() => handleDelete(orderList.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default  Orderlist