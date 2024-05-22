import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CategoryEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getCategoryData()
    }, [])

    let getCategoryData = async () => {
        try {
            const user = await axios.get(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`);
            myFormik.setValues(user.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            username: "",
            email: "",
            city: "",
            state: "",
            country: ""
        },
        // Validating Forms while entering the data
        validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

            if (!values.username) {
                errors.username = "Please enter username";
            } else if (values.username.length < 5) {
                errors.username = "Name shouldn't be less than 3 letters";
            } else if (values.username.length > 25) {
                errors.username = "Name shouldn't be more than 20 letters";
            }

            if (!values.country) {
                errors.country = "Please select any one state";
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`, values);
                setLoading(false);
                navigate("/portal/user-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <h3>CategoryEdit - Id : {params.id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Category Name</label>
                            <input name='username' value={myFormik.values.username} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.username ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.username}</span>
                        </div>



                        <div className='col-lg-4'>
                            <label>image</label>
                            <select name='city' value={myFormik.values.city} onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.city ? "is-invalid" : ""} `} >
                                <option value="">----Select----</option>
                                <option value="CN">Chennai</option>
                                <option value="KN">Kochin</option>
                                <option value="MU">Mumbai</option>
                                <option value="SA">Seattle</option>
                                <option value="MI">Miami</option>
                                <option value="VB">Virginia Beach</option>
                            </select>
                            <span style={{ color: "red" }}>{myFormik.errors.city}</span>
                        </div>

                    

                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-success' />
                        </div>
                    </div>
                </form>
                {/* {JSON.stringify(myFormik.values)} */}
            </div>
        </>


    )
}

export default CategoryEdit