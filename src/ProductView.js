import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductView() {
    const params = useParams();
    const [productList, setProductList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getProducts();
        console.log("welcome to ProductView");
    }, []);

    let getProducts = async () => {
        try {
            const user = await axios.get(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`);
            // console.log(user);
            setProductList(user.data);
            // console.log(userList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    }

    return (
        <>
            <div>ProductView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">ProductView</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>product Name</th>
                                            <th>product Price</th>
                                            <th>Product description</th>
                                            <th>product rate</th>
                                            <th>category</th>
                                            <th>product Image</th>
                                            
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>product Name</th>
                                            <th>product Price</th>
                                            <th>Product description</th>
                                            <th>product rate</th>
                                            <th>category</th>
                                            <th>product Image</th>
                                          
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>{productList.id}</td>
                                            <td> {productList.username} </td>
                                            <td>{productList.email}</td>
                                            <td>{productList.city}</td>
                                            <td>{productList.state}</td>
                                            <td>{productList.country}</td>
                                            <td>{productList.country}</td>
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

export default ProductView