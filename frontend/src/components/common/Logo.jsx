import { NavLink } from "react-router";

export default function Logo() {
    return (
        <NavLink to={'/'} className="btn btn-ghost text-xl text-primary font-bold">
            ClassSync
        </NavLink>
    );
}