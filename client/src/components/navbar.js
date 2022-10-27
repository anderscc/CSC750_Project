
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
            Student
          </NavLink>
          <NavLink to="/course" >
            Courses
          </NavLink>
          <NavLink to="/lab" >
            Lab
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