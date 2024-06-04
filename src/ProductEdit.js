import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from './config';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

function ProductEdit() {
    const [isLoading, setLoading] = useState(false);
    const [getAllCategory, setGetAllCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/Products/categories`);
                setGetAllCategory(response.data);
            } catch (error) {
                console.error('Error fetching Get All Category:', error);
            }
        }

        async function fetchProductData() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/Products/${id}`);
                setSelectedCategory(data.categoryId);
                myFormik.setValues(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        }

        fetchCategory();
        fetchProductData();
    }, [id]);

    const myFormik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            rate: '',
            pictureUrl: ''
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axios.put(`${API_BASE_URL}/api/Products/${id}`, {
                    ...values,
                    categoryId: selectedCategory
                });
                toast.success("Nurse has been updated successfully");
                setLoading(false);
                navigate("/product-list");
            } catch (error) {
                console.error('Error updating product:', error);
                setLoading(false);
            }
        },
        validate: (values) => {
            let errors = {};

            if (!values.name) {
                errors.name = "Please enter product name";
            } else if (values.name.length < 5) {
                errors.name = "Name shouldn't be less than 5 letters";
            }

            if (values.description.length < 5) {
                errors.description = "Description shouldn't be less than 5 letters";
            } else if (values.description.length > 200) {
                errors.description = "Description shouldn't be more than 200 letters";
            }

            if (!values.price) {
                errors.price = "Please add product price";
            }

            if (!values.rate) {
                errors.rate = "Please enter product rate";
            } else if (values.rate > 5) {
                errors.rate = "Rate shouldn't be more than 5";
            }

            if (!values.pictureUrl) {
                errors.pictureUrl = "Please add product image";
            }

            if (!selectedCategory) {
                errors.selectedCategory = "Please select a category";
            }

            return errors;
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            const lastSlashIndex = fileName.lastIndexOf('/');
            const imageName = lastSlashIndex !== -1 ? fileName.substring(lastSlashIndex + 1) : fileName;
            const imageURL = `Img/${imageName}`;
            myFormik.setFieldValue("pictureUrl", imageURL); 
        }
    };
    return (
        <>
            <Helmet>
                <title>Edit Product</title>
            </Helmet>
            <h3>ProductEdit - Id : {id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Product Name</label>
                            <input name='name' onBlur={myFormik.handleBlur} value={myFormik.values.name} onChange={myFormik.handleChange} type="text"
                                className={`form-control ${myFormik.errors.name && myFormik.touched.name ? "is-invalid" : ""}`} />
                            {myFormik.errors.name && myFormik.touched.name && <span style={{ color: "red" }}>{myFormik.errors.name}</span>}
                        </div>

                        <div className="col-lg-6">
                            <label>Price</label>
                            <input name='price' onBlur={myFormik.handleBlur} value={myFormik.values.price} onChange={myFormik.handleChange} type="number"
                                className={`form-control ${myFormik.errors.price && myFormik.touched.price ? "is-invalid" : ""}`} />
                            {myFormik.errors.price && myFormik.touched.price && <span style={{ color: "red" }}>{myFormik.errors.price}</span>}
                        </div>

                        <div className="col-lg-6">
                            <label>Description</label>
                            <input name='description' onBlur={myFormik.handleBlur} value={myFormik.values.description} onChange={myFormik.handleChange} type="text"
                                className={`form-control`} />
                        </div>

                        <div className='col-lg-6'>
                            <label htmlFor='pictureUrl'>Image :</label>
                            <input onBlur={myFormik.handleBlur} onChange={handleFileChange} id='pictureUrl' type='file'
                                className={`form-control ${myFormik.errors.pictureUrl && myFormik.touched.pictureUrl ? "is-invalid" : ""}`} />
                            {myFormik.errors.pictureUrl && myFormik.touched.pictureUrl && <div className='alert alert-info'>{myFormik.errors.pictureUrl}</div>}
                            <div>Selected Image: {myFormik.values.pictureUrl}</div> Display the selected image as a string link
                        </div>

                        <div className='col-lg-4'>
                            <label>Rate</label>
                            <input name='rate' onBlur={myFormik.handleBlur} value={myFormik.values.rate} onChange={myFormik.handleChange} type="number"
                                className={`form-control ${myFormik.errors.rate && myFormik.touched.rate ? "is-invalid" : ""}`} />
                            {myFormik.errors.rate && myFormik.touched.rate && <span style={{ color: "red" }}>{myFormik.errors.rate}</span>}
                        </div>
                        <div className='col-lg-4'>
                            <label>Category</label>
                            <select
                                name='categoryId'
                                onBlur={myFormik.handleBlur}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`form-control ${myFormik.errors.selectedCategory && myFormik.touched.selectedCategory ? "is-invalid" : ""}`}
                            >
                                <option value="">----Select----</option>
                                {getAllCategory.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {myFormik.errors.selectedCategory && myFormik.touched.selectedCategory && <span style={{ color: "red" }}>{myFormik.errors.selectedCategory}</span>}
                        </div>


                        <div className='col-lg-12 mt-3'>
                            <button disabled={!myFormik.dirty || !myFormik.isValid || isLoading} onClick={myFormik.handleSubmit} type='submit' className='btn btn-success '>
                                {isLoading ? <FallingLines
                                    color="#072E33"
                                    width="50"
                                    visible={true}
                                    ariaLabel='falling-lines-loading'
                                /> : 'Update'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>


    )
}

export default ProductEdit