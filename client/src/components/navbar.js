
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/home" >
            Home
          </NavLink>
          <NavLink to="/student" >
            Add GA/TA
          </NavLink>
          <NavLink to="/course" >
            Add Course
          </NavLink>
          <NavLink to="/lab" >
            Add Lab
          </NavLink>
          <NavLink to="/viewRecords" >
           View Records
          </NavLink>
          <NavLink to="/viewSchedule" >
            View Schedule
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;