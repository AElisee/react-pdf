import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link, useParams } from "react-router-dom";

const LettreCard = ({ lettre }) => {
  
  return (
    <Link
      to={`lettre/${lettre.id}`}
      className="w-full border rounded-md p-3 flex gap-4 items-center "
    >
      <p className="w-2/5 capitalize">
        {lettre?.nom} {lettre.prenom}
      </p>
      <p className="w-2/5 lowercase">{lettre?.objet}</p>
      <p className="w-1/5">
        {format(new Date(lettre.createdAt), "Pp", { locale: fr })}
      </p>
    </Link>
  );
};

export default LettreCard;
