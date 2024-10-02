import React from 'react'
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


const CreateMentor = () => {
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      mentor_name: "",
      mail_id: "",
      phone_number : ""
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        await axios.post(
          `https://assign-mentor-be-lga4.onrender.com/creatementor`,
          values);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div  className="container"style={{marginLeft:200}}>
        <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <nav className="navbar navbar-light bg-light">
          <h1 style={{color:'rgb(42, 199, 50)'}}>Create Mentor</h1>
          </nav>
          <div className="col-lg-4">
            <label htmlFor="">Name</label>
            <input
              name="mentor_name"
              value={formik.values.mentor_name}
              onChange={formik.handleChange}
              type="text"
              required
              className="form-control"
            />
            <span>{formik.errors.mentor_name}</span>
          </div>
          <div className="col-lg-4">
            <label htmlFor="">Mail Address</label>
            <input
              type="email"
              name="mail_id"
              required
              value={formik.values.mail_id}
              onChange={formik.handleChange}
              className="form-control"
            />
            <span>{formik.errors.mail_id}</span>
          </div>
          <div className="col-lg-4">
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              maxlength="10"
              minLength='10'
              required
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              className="form-control"
            />
            <span>{formik.errors.phone_number}</span>
          </div>
          <div className="col-lg-6 mt-2">
            <input type="submit" value={"Submit"} className="btn btn-success" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateMentor
