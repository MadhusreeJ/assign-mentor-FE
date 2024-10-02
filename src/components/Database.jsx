import React from 'react'
import { FaRegEye ,FaPencilAlt,FaFilter } from "react-icons/fa";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link,Outlet } from 'react-router-dom';

const Database = () => {
    const [students, setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
  
    let getData = async () => {
        try {
          const students = await axios.get("https://assign-mentor-be-lga4.onrender.com/getallstudents");
          setStudents(students.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);

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

      let getFilteredData = async (event,selectedMentor) => {
        event.preventDefault()
        if(selectedMentor.mentor === 'all' ){
          try {
            const students = await axios.get("https://assign-mentor-be-lga4.onrender.com/getallstudents");
            setStudents(students.data);
          } catch (error) {
            console.log(error);
          }
        }else{
          try {
            const students = await axios.get(`https://assign-mentor-be-lga4.onrender.com/studentsmentor/${selectedMentor._id}`);
            setStudents(students.data);
          } catch (error) {
            console.log(error);
          }
        }
       };
  


  return (
    <div style={{marginLeft:200}}>
      <nav className="navbar navbar-light bg-light">
        <h1 style={{color:'rgb(42, 199, 50)'}}>Student Database</h1>
        </nav>
        <div className='d-flex' style={{marginTop:5}}>
        <FaFilter /> 
      <select className="form-select" style={{width:140, height:40}} aria-label="Default select example" 
        onChange={(event) => getFilteredData(event,JSON.parse(event.target.value))} >
      <option value={JSON.stringify({"mentor":"all"})}>All mentors</option> 
      {mentors.map((mentor, key) => {
    return(
        <option index={key} value={JSON.stringify(mentor)}>{mentor.mentor_name}</option>
    );
  
  })}
      </select>
        </div>
            <table className="table table-striped">
        <thead>
    <tr>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Name</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Mail</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Phone</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Mentor</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>View</th>
      <th scope="col" style={{color:'rgb(42, 199, 50)'}}>Edit</th>
      
    </tr>
  </thead>
  <tbody> 
  {students.map((student, key) => {
                return (
                  <tr>
                    <td>{student.student_name}</td>
                    <td>{student.mail_id}</td>
                    <td>{student.phone_number}</td>
                    {student.mentor == ""? <td>Not assigned</td> : <td>{student.mentor}</td>}
                    <td>
                    <Link to ={ `/viewstudent/${student._id}`} 
                    style={{textDecoration:"none", color:"black"}}> 
                      <FaRegEye/> 
                      </Link>
                      </td>
                    <td>
                    <Link to ={ `/changementor/${student._id}`} 
                    style={{textDecoration:"none", color:"black"}}> <FaPencilAlt/> 
                    </Link>
                    </td>
                  </tr>
                );
              })}
  </tbody>
  </table>
  <Outlet/>
    </div>
  )
}

export default Database
