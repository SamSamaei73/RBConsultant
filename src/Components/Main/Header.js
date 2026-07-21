import React from 'react';
import "../../Style/style.scss";

function Header() {
  return (
    <div className="header">
        <div className="logo"></div>
        <div className="options">
            <h3>Home</h3>
            <h3>About</h3>
            <h3>Services</h3>
            <h3>Partners</h3>
            <h3>Members</h3>
            <h3>Contact</h3>
        </div>
        <div className="hiden"></div>
    </div>
  )
}

export default Header