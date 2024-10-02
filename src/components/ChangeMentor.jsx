import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";

const ChangeMentor = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState();

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

  let onsubmit = async(event)=>{
    event.preventDefault()
    console.log(selectedMentor);
    try {
       await axios.put(`https://assign-mentor-be-cbv0.onrender.com/changementor/${params.id}`,selectedMentor);
       navigate("/");
      } catch(error){
             console.log(error);
      }
  }

  return (
    <div style={{marginLeft:200}}>
      <form onSubmit={onsubmit}>
        <nav className="navbar navbar-light bg-light">
        <h4 style={{color:'rgb(42, 199, 50)'}}>Change Mentor</h4>
        </nav>
      <select className="form-select" aria-label="Default select example" style={{marginTop:2}}
        onChange={e => setSelectedMentor(JSON.parse(e.target.value))} >
    <option>Choose mentor</option>
  {mentors.map((mentor, key) => {
    return(
        <option index={key} value={JSON.stringify(mentor)}>{mentor.mentor_name}</option>
    );
  
  })}
</select>
<div className="col-lg-6 mt-2">
            <input type="submit" value={"Update"} className="btn btn-success" />
          </div>
</form>
    </div>
  )
}

export default ChangeMentor