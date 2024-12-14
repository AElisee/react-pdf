import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ajouterLettre } from "../assets/redux/lettres.slice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WebSite = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setemail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [lieu, setLieu] = useState("");
  const [objet, setObjet] = useState("");
  const [destinataire, setDestinataire] = useState("");
  const [date, setDate] = useState(new Date());
  const [body, setBody] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef("");

  const dispatch = useDispatch();

  const validtionForm = (champs) => {
    const {
      nom,
      prenom,
      email,
      telephone,
      lieu,
      objet,
      destinataire,
      date,
      body,
    } = champs;
    if (
      !nom ||
      !prenom ||
      !email ||
      !telephone ||
      !lieu ||
      !objet ||
      !destinataire ||
      !date ||
      !body
    ) {
      return {
        isValid: false,
        message: "Veuillez renseigner tous les champs !",
      };
    }

    return { isValid: true };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const champs = {
      nom,
      prenom,
      email,
      telephone,
      lieu,
      objet,
      destinataire,
      date,
      body,
    };
    const validation = validtionForm(champs);

    if (!validation.isValid) {
      setIsError(true);
      setErrorMessage(validation.message);

      toast.error(validation.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Désactiver l'erreur après 5 secondes
      setTimeout(() => {
        setIsError(false);
      }, 5000);
      return;
    }

    const newData = {
      nom,
      prenom,
      email,
      lieu,
      telephone,
      destinataire,
      objet,
      body,
      date,
      createdAt: new Date(),
    };
    dispatch(ajouterLettre(newData))
      .unwrap()
      .then(() => {
        formRef.current.reset();
        toast.success("Lettre ajoutée avec succès !", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-slate-300 w-full flex gap-3">
      <div className="w-1/3">
        <h2 className="text-2xl font-bold pb-5">
          Nous vous aidont à rédiger votre lettre
        </h2>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          optio ipsum animi distinctio aut incidunt facilis vel, nobis labore,
          deserunt excepturi? Similique enim officia adipisci repellat error?
          Doloribus, saepe? Culpa.
        </p>
      </div>
      <div className="w-2/3 px-6">
        <form
          action=""
          ref={formRef}
          className="w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex justify-between gap-3">
            <div className="w-1/2 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="nom">Votre Nom (*)</label>
                <input
                  type="text"
                  id="nom"
                  placeholder="Kouassi"
                  className="p-2 full rounded-md text-slate-900 font-semibold text-lg"
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="prenom">Votre Prénom (*)</label>
                <input
                  type="text"
                  id="prenom"
                  placeholder="Ange-Elisée"
                  className="p-2 full rounded-md  text-slate-900 font-semibold text-lg"
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Votre adresse mail (*)</label>
                <input
                  type="email"
                  id="email"
                  placeholder="exemple@gmail.com"
                  className="p-2 full rounded-md  text-slate-900 font-semibold text-lg"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>
            {/* droite */}
            <div className="flex flex-col gap-5 w-1/2">
              <div className="flex flex-col gap-1">
                <label htmlFor="telephone">Votre N° de téléphone (*)</label>
                <input
                  type="text"
                  id="telephone"
                  placeholder="0102030405"
                  className="w-full p-2 rounded-md  text-slate-900 font-semibold text-lg"
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lieu">Votre Localité (*)</label>
                <input
                  type="text"
                  id="lieu"
                  placeholder="Abidjan"
                  className="w-full p-2 rounded-md  text-slate-900 font-semibold text-lg"
                  onChange={(e) => setLieu(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="date">La date d'envoi (*)</label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 rounded-md  text-slate-900 font-semibold text-lg"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            {/* !!dorite */}
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="destinataire">Nom du destinataire (*)</label>
              <input
                type="text"
                id="destinataire"
                placeholder="Monsieur le directeur des ressource humaines"
                className="p-2 full rounded-md  text-slate-900 font-semibold text-lg"
                onChange={(e) => setDestinataire(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="objet">Objet (*)</label>
              <input
                type="text"
                id="objet"
                placeholder="Canditature au poste de manager"
                className="p-2 full rounded-md  text-slate-900 font-semibold text-lg"
                onChange={(e) => setObjet(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="body">Corps de la lettre (*)</label>
              <textarea
                name=""
                id="body"
                placeholder="Madame, Moniseur..."
                className="p-2 full rounded-md py-5  text-slate-900 font-semibold text-lg"
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-5">
              <button className="w-[250px] bg-purple-800 p-3 rounded-md font-black text-lg">
                Envoyer
              </button>
            </div>
            <div className="p-5 w-full flex justify-center">
              {/* {isError ? <p className="text-amber-500">{errorMessage}</p> : ""} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebSite;
