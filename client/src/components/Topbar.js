import React from 'react'

import { Link } from 'react-router-dom';

import * as FaIcons from 'react-icons/fa';
import logo from '../assets/logo.png'
import eye from '../assets/eye.png'
import '../styles/topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link className="logoWrapper" to='/'>
            <img src={eye} className="logo-img" alt="logo" />
            <span className="logo">EoS Monitor</span>
          </Link>
        </div>
          
        <div className="topLeft">
          <div className="profile">
            <FaIcons.FaRegUserCircle />
            <span className="profile-txt">Account</span>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Topbar
