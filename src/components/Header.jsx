import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="text-slate-300 flex justify-center items-center sticky w-full top-0 bg-black z-10">
      <ul className="flex gap-2  py-4">
        <li className="w-[200px] flex justify-center items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive
                  ? "active bg-purple-700 font-semibold"
                  : "border border-purple-700"
              } rounded-md p-2 w-full h-full text-center text-md`
            }
          >
            Site
          </NavLink>
        </li>
        <li className="w-[200px] flex justify-center items-center  ">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${
                isActive
                  ? "active bg-purple-700 font-semibold"
                  : "border border-purple-700"
              } rounded-md p-2 w-full h-full text-center text-md`
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
