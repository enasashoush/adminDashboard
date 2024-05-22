import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CategoryView() {
    const params = useParams();
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getCategories();
        console.log("welcome to userview");
    }, []);

    let getCategories = async () => {
        try {
            const user = await axios.get(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`);
            // console.log(user);
            setCategoryList(user.data);
            // console.log(userList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    }

    return (
        <>
            <div>CategoryView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-success">CategoryView</h6>
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
                                            <th>Category  Name</th>
                                            <th>Image</th>

                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Category  Name</th>
                                            <th>Image</th>

                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>{categoryList.id}</td>
                                            <td> {categoryList.username} </td>
                                            <td>{categoryList.country}</td>
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

export default CategoryView