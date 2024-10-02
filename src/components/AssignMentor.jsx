import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AssignMentor = () => {
  const navigate = useNavigate();
    const [unassignedStudents, setUnassignedStudents] = useState([]);
    const [mentors, setMentors] = useState([]);

    const [students, setStudents] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState();

    let getData = async () => {
        try {
          const unassignedStudents = await axios.get("https://assign-mentor-be-cbv0.onrender.com/unassignedstudents");
          setUnassignedStudents(unassignedStudents.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);

      let getMentorData = async () => {
        try {
          const mentors = await axios.get("https://assign-mentor-be-cbv0.onrender.com/getallmentors");
          setMentors(mentors.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getMentorData();
      }, []);

      const handleCheckboxChange = (event,studentString) => {
        const student = JSON.parse(studentString);
        if (event.target.checked) {
            setStudents((prev) => [...prev, student]);
    } else {
        setStudents((prev) => prev.filter((item) => item.student_id !== student.student_id));
    }
  };
    
  let onsubmit = async(event)=>{
    event.preventDefault()
    try {
       await axios.put(`http://localhost:3000/assignmentor/${selectedMentor}/students`,students);
       navigate("/");
      } catch(error){
             console.log(error);
      }
  }

  return (
    <div style={{marginLeft:200}}>
      <nav className="navbar navbar-light bg-light">
        <h1 style={{color:'rgb(42, 199, 50)'}}>Assign Mentor</h1>
      </nav>
        <form onSubmit={onsubmit}>
        <table className="table table-striped">
        <thead>
    <tr>
    <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Select</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Name</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Mail</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Phone</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Mentor</th>
    </tr>
  </thead>
  <tbody>
  {unassignedStudents.map((student,key) => {
                return (
                  <tr>
                    <td><input index={key} type="checkbox" value={JSON.stringify(student)} 
                    onChange={(event) =>handleCheckboxChange(event, JSON.stringify(student))}/></td>
                    <td>{student.student_name}</td>
                    <td>{student.mail_id}</td>
                    <td>{student.phone_number}</td>
                    <td>Not Assigned</td>
                  </tr>
                );
              })}
  </tbody>
  </table>
  <select className="form-select" aria-label="Default select example" 
  onChange={e => setSelectedMentor(e.target.value)} >
    <option>Choose mentor</option>
  {mentors.map((mentor, key) => {
    return(
        <option index={key} value={mentor._id}>{mentor.mentor_name}</option>
    );
  
  })}
</select>
<div className="col-lg-6 mt-2">
            <input type="submit" value={"Assign"} className="btn btn-success" />
          </div>
</form>
    </div>
  )
}

export default AssignMentor