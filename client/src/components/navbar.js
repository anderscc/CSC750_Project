
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
            Student
          </NavLink>
          <NavLink to="/course" activeStyle>
            Courses
          </NavLink>
          <NavLink to="/lab" activeStyle>
            Labs
          </NavLink>
          <NavLink to="/Confirmation" activeStyle>
            Confirmation
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