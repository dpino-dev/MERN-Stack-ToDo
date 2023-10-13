import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="bg-neutral-800 flex justify-between px-20 py-4">
      <Link to={"/"} className="font-bold text-white">
        <h1>React with MySQL</h1>
      </Link>
      <ul className="flex gap-x-2">
        <li>
          <Link to={"/"} className="bg-slate-200 px-2 py-1">Home</Link>
        </li>
        <li>
          <Link to={"/new"}  className="bg-teal-200 px-2 py-1">Create task</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
