import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link, useParams } from "react-router-dom";
import { LettrePdf } from "../pages/DetailsLettre.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";

const LettreCard = ({ lettre }) => {
  return (
    <div
      //   to={`lettre/${lettre.id}`}
      className="w-full border rounded-md p-3 flex gap-4 items-center "
    >
      <p className="w-2/5 capitalize">
        {lettre?.nom} {lettre.prenom}
      </p>
      <p className="w-1/5 lowercase">{lettre?.objet}</p>
      <p className="w-1/5">
        {format(new Date(lettre.createdAt), "Pp", { locale: fr })}
      </p>
      <p className="w-1/5">
        <PDFDownloadLink
          document={<LettrePdf lettre={lettre} />}
          fileName={`${(lettre?.nom + "_" + lettre?.prenom)
            .normalize("NFD") // Normalise en séparant les caractères de base et les diacritiques
            .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
            .replace(/[^a-zA-Z0-9_-]/g, "")}.pdf`} // Supprime les caractères spéciaux sauf l'underscore
        >
          <p className="text-pink-500 font-bold"> Téléchargez le pdf</p>
        </PDFDownloadLink>
      </p>
    </div>
  );
};

export default LettreCard;
