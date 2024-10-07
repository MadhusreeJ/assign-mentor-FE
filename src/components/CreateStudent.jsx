import React from 'react'
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';


const CreateStudent = () => {
    const navigate = useNavigate();

    const [mentors, setMentors] = useState([]);

    let getMentorData = async () => {
      try {
        const mentors = await axios.get("https://assign-mentor-be-lga4.onrender.com/getallmentors");
        setMentors(mentors.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getMentorData();
    }, []);

  const formik = useFormik({
    initialValues: {
      student_name: "",
      mail_id: "",
      phone_number : "",
      mentor :""
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        await axios.post(
          "https://assign-mentor-be-lga4.onrender.com/createstudent",
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
          <h1 style={{color:'rgb(42, 199, 50)'}}>Create Student</h1>
          </nav>
          <div className="col-lg-3">
            <label htmlFor="">Name</label>
            <input
              name="student_name"
              value={formik.values.student_name}
              onChange={formik.handleChange}
              type="text"
              required
              className="form-control"
            />
            <span>{formik.errors.student_name}</span>
          </div>
          <div className="col-lg-3">
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
          <div className="col-lg-3">
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              maxlength={10}
              minLength={10}
              required
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              className="form-control"
            />
            <span>{formik.errors.phone_number}</span>
          </div>
          <div className="col-lg-3">
            <label htmlFor="">Mentor</label>
            <select className="form-select" aria-label="Default select example" name="mentor" value={formik.values.mentor}
        onChange={formik.handleChange} >
    <option value={"Not assigned"}>Choose mentor</option>
  {mentors.map((mentor, key) => {
    return(
        <option index={key} value={mentor.mentor_name}>{mentor.mentor_name}</option>
    );
  
  })}
</select>
            <span>{formik.errors.mentor}</span>
          </div>
          <div className="col-lg-6 mt-2">
            <input type="submit" value={"Submit"} className="btn btn-success" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateStudent
