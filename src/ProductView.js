import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config';
import { Helmet } from 'react-helmet';

function ProductView() {
    const { id } = useParams();
    const [productList, setProductList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getProducts = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/Products/${id}`);
            setProductList(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false); 
        }
    }, [id]);

    useEffect(() => {
        getProducts();
    }, [getProducts]); 

    return (
        <>
            <Helmet>
                <title>Product Info</title>
            </Helmet>
            <div>ProductView - {id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-successx">ProductView</h6>
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
                                            <img className='image-fluid w-100' src={productList.pictureUrl} alt='cover' />

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