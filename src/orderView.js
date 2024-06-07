import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config';
import { Helmet } from 'react-helmet';

function OrderView() {
    const { id } = useParams();
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/Orders/${id}`);
                setOrderList(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false); 
            }
        };

        getOrder();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return <>
        <Helmet>
            <title>Order View</title>
        </Helmet>
        <div>OrderView - {id}</div>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">OrderView</h6>
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
                                        <th>User E-Mail</th>
                                        <th>Orders</th>
                                        <th>OrderDate</th>
                                        <th>ShippingAddress</th>
                                        <th>DeliveryMethodCost</th>
                                        <th>Total Order Cost</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Id</th>
                                        <th>User E-Mail</th>
                                        <th>Orders</th>
                                        <th>OrderDate</th>
                                        <th>ShippingAddress</th>
                                        <th>DeliveryMethod Cost</th>
                                        <th>Total Order Cost</th>

                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr>
                                        <td>{orderList.id}</td>
                                        <td> {orderList.buyerEmail} </td>
                                        <td>  <div className="order-container rounded-3 p-3">
                                            <div className="container">
                                                <div className="row">
                                                    {orderList.items?.map((item, indx) => (
                                                        <div key={indx} className="row">
                                                            <div className="col-md-12 my-2 ">
                                                                <img src={item.pictureUrl} alt="Product" className="w-50" />
                                                                <div className="order-info">
                                                                    <h3>{item.productName.split(" ").slice(0, 2).join(" ")}</h3>
                                                                    <h5>Count: {item.price}</h5>
                                                                    <h5>Price: {item.quantity}</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div></td>
                                        <td>{formatDate(orderList.orderDate)}</td>
                                        <td>{orderList.shippingAddress.street}</td>
                                        <td>{orderList.deliveryMethod}-{orderList.deliveryMethodCost}</td>
                                        <td>{orderList.total}</td>


                                    </tr>
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    </>
}

export default OrderView