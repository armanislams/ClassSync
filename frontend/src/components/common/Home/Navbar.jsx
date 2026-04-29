import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { AuthBtns } from "../AuthBtns";
import Logo from "../logo";

const Navbar = () => {
    const {user}=useAuth()
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><NavLink to="#features">Features</NavLink></li>
          <li><NavLink to="#how-it-works">How it Works</NavLink></li>
          <li><NavLink to="#teachers">For Teachers</NavLink></li>
          <li><NavLink to="#students">For Students</NavLink></li>
          {user &&
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        }
        </ul>
      </div>
      <Logo/>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 font-medium">
        <li><NavLink to="#features">Features</NavLink></li>
        <li><NavLink to="#how-it-works">How it Works</NavLink></li>
        <li><NavLink to="#teachers">For Teachers</NavLink></li>
        <li><NavLink to="#students">For Students</NavLink></li>
        {user &&
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        }
      </ul>
    </div>
    <div className="navbar-end gap-2">
      <AuthBtns/>
    </div>
    
    </div>
  );
};

export default Navbar;