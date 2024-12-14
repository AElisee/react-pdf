import React from "react";
import { useSelector } from "react-redux";
import LettreCard from "../components/LettreCard.jsx";
import SideBar from "../components/SideBar.jsx";

const Dashboard = () => {
  const lettres = useSelector((state) => state.lettres.lettresData);

  return (
    <div className="flex gap-5 text-slate-300 ">
      <div className="w-1/5 h-[500px] sticky top-[85px] bg-slate-900 rounded-md px-2">
        <SideBar />
      </div>
      <div className="w-full flex flex-col gap-2">
        {lettres
          ? lettres
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((lettre) => <LettreCard lettre={lettre} key={lettre.id} />)
          : "Aucune lettre reçue"}
      </div>
    </div>
  );
};

export default Dashboard;
