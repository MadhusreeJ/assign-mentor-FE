import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
        <div className="sidebar">
        <h2>Dashboard</h2>
        <ul className="nav flex-column">
            <li className={activeIndex === 0 ? 'active' : ''} onClick={() => handleClick(0)}>
            <Link to = "/" className='linkstyle'>Database</Link>
            </li>
            <li className={activeIndex === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
            <Link to = "/creatementor" className='linkstyle'>Create Mentor</Link>
            </li>
            <li className={activeIndex === 2 ? 'active' : ''}onClick={() => handleClick(2)}>
            <Link to = "/createstudent" className='linkstyle'>Create Student</Link>
            </li>
            <li className={activeIndex === 3 ? 'active' : ''}onClick={() => handleClick(3)}>
            <Link to = "/assignmentor" className='linkstyle'>Assign Mentor</Link>
            </li>
        </ul>
    </div>
    <Outlet/>
    </div>
  );
}

export default Sidebar