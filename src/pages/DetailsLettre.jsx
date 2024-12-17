import React from "react";
import SideBar from "../components/SideBar.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontSize: "1.4rem",
    paddingTop: 40,
    padding: 25,
  },
  infosPersonelle: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gauche: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  distinataire: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  objet: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    fontWeight: "heavy",
  },
  body: {
    margin: 10,
    padding: 10,
    lineHeight: "20px",
  },
});

export const LettrePdf = ({ lettre }) => {
  return (
    <Document>
      <Page size="A4" orientation="horizontal" style={styles.page}>
        <View style={styles.infosPersonelle}>
          <View style={styles.gauche}>
            <Text>{lettre?.nom}</Text>
            <Text>{lettre?.prenom}</Text>
            <Text>{lettre?.telephone}</Text>
            <Text>{lettre?.email}</Text>
          </View>
          <View>
            <Text>
              {lettre?.lieu}, le{" "}
              {lettre?.date &&
                format(new Date(lettre.date), "PPP", {
                  locale: fr,
                })}
            </Text>
          </View>
        </View>
        <View style={styles.distinataire}>
          <Text>{lettre?.destinataire}</Text>
        </View>
        <View style={styles.objet}>
          <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Object :
          </Text>
          <Text>{lettre?.objet}</Text>
        </View>
        <View style={styles.body}>
          <Text>{lettre?.body}</Text>
        </View>
      </Page>
    </Document>
  );
};

const DetailsLettre = () => {
  const lettres = useSelector((state) => state.lettres.lettresData);
  const { isloading, isError } = useSelector((state) => state.lettres);
  const params = useParams();
  const lettreId = params.id;
  const lettre = lettres?.find((lettre) => lettre.id == lettreId);

  return (
    <div className="flex gap-5 text-slate-300">
      <div className="w-1/5 h-[500px] sticky top-[85px] bg-slate-900 rounded-md px-2">
        <SideBar />
      </div>

      {isloading ? (
        <div>
          <p>Patientez un instant !</p>
        </div>
      ) : (
        <div className="w-3/5 flex p-2">
          <div className="w-[800px] h-[700px] bg-white flex flex-col gap-3 p-5  text-gray-600  ">
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
      )}
      <div className="w-1/5 fixed top-[80px] right-0">
        <PDFDownloadLink
          document={<LettrePdf lettre={lettre} />}
          fileName={`${(lettre?.nom + "_" + lettre?.prenom)
            .normalize("NFD") // Normalise en séparant les caractères de base et les diacritiques
            .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
            .replace(/[^a-zA-Z0-9_-]/g, "")}.pdf`} // Supprime les caractères spéciaux sauf l'underscore
        >
          <p className="text-pink-500 font-bold"> Téléchargez le pdf</p>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default DetailsLettre;
