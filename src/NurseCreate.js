import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

function NurseCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function addNurse(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/Nurse/create-nurse`, {
        ...values,
        displayName: nurses.nurseName

      });


      if (data) {
        toast.success("Nurse has been added");
        setTimeout(function () {
          navigate("/nurselist");
        }, 1000);

      }
    }catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data.message;
        if (errorMessage === 'Email already exists') {
          toast.error("Email already exists");
        } else {
          toast.error("Email already exists");
        }
      } else {
        console.error("Failed to create nurse. Please try again later.", err);
      }
    } finally {
      setLoading(false);
    }
  }

  let nurses = {
    nurseName: "",
    price: "",
    description: "",
    specialty: "",
    email: "",
    picUrl: "",
    hospital: "",
    password: "",
    phoneNumber: ""
  };

  const myFormik = useFormik({
    initialValues: nurses,
    onSubmit: addNurse,
    validate: (values) => {
      let errors = {};

      if (!values.nurseName) {
        errors.nurseName = "Please enter nurseName";
      } else if (values.nurseName.length < 5) {
        errors.nurseName = "Name shouldn't be less than 5 letters";
      } else if (values.nurseName.length > 20) {
        errors.nurseName = "Name shouldn't be more than 20 letters";
      }

      if (!values.email) {
        errors.email = "Please enter email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.price) {
        errors.price = "Please add price";
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = "Please add phone number";
      }

      if (!values.description) {
        errors.description = "Please add description";
      }

      if (!values.specialty) {
        errors.specialty = "Please add specialty";
      }
      if (!values.hospital) {
        errors.hospital = "Please add hospital";
      }
      if (!values.picUrl) {
        errors.picUrl = "Please add nurse image";
      }

      return errors;
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const lastSlashIndex = fileName.lastIndexOf('/');
      const imageName = lastSlashIndex !== -1 ? fileName.substring(lastSlashIndex + 1) : fileName;
      const imageURL = `nurses/${imageName}`;
      myFormik.setFieldValue("picUrl", imageURL);
    }
  };

  return (

    <>
      <Helmet>
        <title>Create Nurse</title>
      </Helmet>

      <div className='container'>

        <form onSubmit={myFormik.handleSubmit}>
          <div className='row'>
            <div className="col-lg-6">
              <label>Nurse Name</label>
              <input name='nurseName' onBlur={myFormik.handleBlur} value={myFormik.values.nurseName} onChange={myFormik.handleChange} type="text"
                className={`form-control ${myFormik.errors.nurseName && myFormik.touched.nurseName ? "is-invalid" : ""}`} />
              {myFormik.errors.nurseName && myFormik.touched.nurseName && <span style={{ color: "red" }}>{myFormik.errors.nurseName}</span>}
            </div>
            <div className="col-lg-6">
              <label>Phone</label>
              <input name='phoneNumber' onBlur={myFormik.handleBlur} value={myFormik.values.phoneNumber} onChange={myFormik.handleChange} type="text"
                className={`form-control ${myFormik.errors.phoneNumber && myFormik.touched.phoneNumber ? "is-invalid" : ""}`} />
              {myFormik.errors.phoneNumber && myFormik.touched.phoneNumber && <span style={{ color: "red" }}>{myFormik.errors.phoneNumber}</span>}
            </div>
            <div className="col-lg-6">
              <label>Email</label>
              <input name='email' onBlur={myFormik.handleBlur} value={myFormik.values.email} onChange={myFormik.handleChange} type={"email"}
                className={`form-control ${myFormik.errors.email && myFormik.touched.email ? "is-invalid" : ""} `} />
              <span style={{ color: "red" }}>{myFormik.errors.email && myFormik.touched.email}</span>
            </div>
            <div className="col-lg-6">
              <label>Password</label>
              <input name='password' onBlur={myFormik.handleBlur} value={myFormik.values.password} onChange={myFormik.handleChange} type="password"
                className={`form-control ${myFormik.errors.password && myFormik.touched.password ? "is-invalid" : ""}`} />
              {myFormik.errors.password && myFormik.touched.password && <span style={{ color: "red" }}>{myFormik.errors.password}</span>}
            </div>
            <div className="col-lg-6">
              <label>Fees</label>
              <input name='price' onBlur={myFormik.handleBlur} value={myFormik.values.price} onChange={myFormik.handleChange} type="number"
                className={`form-control ${myFormik.errors.price && myFormik.touched.price ? "is-invalid" : ""}`} />
              {myFormik.errors.price && myFormik.touched.price && <span style={{ color: "red" }}>{myFormik.errors.price}</span>}
            </div>
            <div className="col-lg-6">
              <label>Specialty</label>
              <input name='specialty' onBlur={myFormik.handleBlur} value={myFormik.values.specialty} onChange={myFormik.handleChange} type="text"
                className={`form-control ${myFormik.errors.specialty && myFormik.touched.specialty ? "is-invalid" : ""}`} />
              {myFormik.errors.specialty && myFormik.touched.specialty && <span style={{ color: "red" }}>{myFormik.errors.specialty}</span>}
            </div>
            <div className="col-lg-6">
              <label>Hospital</label>
              <input name='hospital' onBlur={myFormik.handleBlur} value={myFormik.values.hospital} onChange={myFormik.handleChange} type="text"
                className={`form-control ${myFormik.errors.hospital && myFormik.touched.hospital ? "is-invalid" : ""}`} />
              {myFormik.errors.hospital && myFormik.touched.hospital && <span style={{ color: "red" }}>{myFormik.errors.hospital}</span>}
            </div>
            <div className="col-lg-6">
              <label>Specfication</label>
              <input name='description' onBlur={myFormik.handleBlur} value={myFormik.values.description} onChange={myFormik.handleChange} type="text"
                className={`form-control ${myFormik.errors.description && myFormik.touched.description ? "is-invalid" : ""}`} />
              {myFormik.errors.description && myFormik.touched.description && <span style={{ color: "red" }}>{myFormik.errors.description}</span>}
            </div>

            <div className='col-lg-6'>
              <label htmlFor='picUrl'>Image :</label>
              <input onBlur={myFormik.handleBlur} onChange={handleFileChange} id='picUrl' type='file'
                className={`form-control ${myFormik.errors.picUrl && myFormik.touched.picUrl ? "is-invalid" : ""}`} />
              {myFormik.errors.picUrl && myFormik.touched.picUrl && <div className='alert alert-info'>{myFormik.errors.picUrl}</div>}
              {/* <div>Selected Image: {myFormik.values.picUrl}</div> */}
            </div>


            <div className='col-lg-12 mt-3'>
              <button disabled={!myFormik.dirty || !myFormik.isValid || isLoading} onClick={myFormik.handleSubmit} type='submit' className='btn btn-success '>
                {isLoading ? <FallingLines
                  color="#072E33"
                  width="50"
                  visible={true}
                  ariaLabel='falling-lines-loading'
                /> : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NurseCreate