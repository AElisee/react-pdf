import React from "react";
import SideBar from "../components/SideBar.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const DetailsLettre = () => {
  const lettres = useSelector((state) => state.lettres.lettresData);
  const params = useParams();
  const lettreId = params.id;
  const lettre = lettres?.find((lettre) => lettre.id == lettreId);

  return (
    <div className="flex gap-5 text-slate-300">
      <div className="w-1/5 h-[500px] sticky top-[85px] bg-slate-900 rounded-md px-2">
        <SideBar />
      </div>
      <div className="w-3/5 flex p-2">
        <div className="w-[800px] h-[700px] bg-white flex flex-col gap-3 p-5    ">
          <div className="flex justify-between">
            <div>
              <p>{lettre?.nom}</p>
              <p>{lettre?.prenom}</p>
              <p className="mt-2 text-sm">{lettre?.telephone}</p>
              <p className=" text-sm">{lettre?.email}</p>
            </div>
            <div>
              <p>
                {lettre?.lieu}, le{" "}
                {lettre?.date &&
                  format(new Date(lettre.date), "PPP", {
                    locale: fr,
                  })}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-end w-full">
              <p>{lettre?.destinataire}</p>
            </div>
            <div className="mt-10">
              <h3>
                <span className="underline">objet :</span> {lettre?.objet}
              </h3>
            </div>
          </div>
          <div>
            <p className="text-justify">{lettre?.body}</p>
          </div>
        </div>
      </div>
      <div className="w-1/5 fixed top-[80px] right-0">telecherger pdf</div>
    </div>
  );
};

export default DetailsLettre;
