import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config';

function ProductView() {
    const {id} = useParams();
    const [productList, setProductList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getProducts();
        console.log("welcome to ProductView");
    }, []);

    let getProducts = async () => {
        try {
            const {data} = await axios.get(`${API_BASE_URL}/api/Products/${id}`);
            // console.log(user);
            setProductList(data);
            // console.log(userList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    }

    return (
        <>
            <div>ProductView - {id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-successx">ProductView</h6>
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
                                            <td>{productList.name} </td>
                                            <td>{productList.price}</td>
                                            <td>{productList.description}</td>
                                            <td>{productList.rate}</td>
                                            <td>{productList.category}</td>
                                            <img className='image-fluid w-25' src={productList.pictureUrl}/>
                                            
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