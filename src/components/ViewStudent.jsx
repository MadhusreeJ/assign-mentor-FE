import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";

const ViewStudent = () => {
    const params = useParams();

    const [student, setStudent] = useState([]);

    let getData = async () => {
        try {
          const student = await axios.get(`https://assign-mentor-be-lga4.onrender.com/previousmentors/${params.id}`);
          setStudent(student.data.previous_mentor);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);


  return (
    <div style={{marginLeft:221}}>
        <h3 style={{color:'rgb(42, 199, 50)'}}>Student previous Mentors</h3>
        {student == undefined? <p>This student does not have previous mentors.</p> : student.map((item)=>{
          return <li>{item}</li>
        })}
    </div>
  )
}

export default ViewStudent
