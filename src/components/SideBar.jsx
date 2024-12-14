import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const lettres = useSelector((state) => state.lettres.lettresData);
  return (
    <nav>
      <h4 className="font-bold text-fuchsia-900 text-2xl mb-2">
        Lettres express
      </h4>
      <ul>
        <li>
          <Link to="/dashboard">
            {" "}
            Boîte de reception <span>[{lettres.length}]</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
