
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/home" activeStyle>
            Home
          </NavLink>
          <NavLink to="/student" activeStyle>
            Add Student
          </NavLink>
          <NavLink to="/course" activeStyle>
            Add Course
          </NavLink>
          <NavLink to="/lab" activeStyle>
            Add Lab
          </NavLink>
          <NavLink to="/viewRecords" activeStyle>
           View Records
          </NavLink>
          <NavLink to="/viewSchedule" activeStyle>
            View Schedule
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;