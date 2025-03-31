import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
     return (
        <div
          className="min-h-screen bg-cover bg-center flex flex-col items-center p-6"
          style={{
            backgroundImage: "url('/bg_image.png')",
            backgroundColor: "#3A3A64",
            backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64",
          }}
        >
          {/* Logo */}
          <div className="w-full flex justify-center mb-4">
            <img src="/logoHorizontal.png" alt="Logo" className="w-auto h-auto" />
          </div>
    
          {/* Contenu */}
          <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 font-platypi">Politique de confidentialité</h1>
            <p className="text-gray-700 font-nunito mb-4">
            Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de
            confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Collecte des informations</h2>
            <p className="text-gray-700 font-nunito mb-4">
            Nous collectons uniquement les informations nécessaires à l'amélioration de nos services, telles que votre
            adresse e-mail et vos préférences de lecture.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Utilisation des données</h2>
            <p className="text-gray-700 font-nunito mb-4">
            Vos données sont utilisées exclusivement pour personnaliser votre expérience et vous proposer des
            recommandations pertinentes.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Sécurité</h2>
            <p className="text-gray-700 font-nunito mb-4">
            Nous mettons en place des mesures de sécurité pour protéger vos informations contre tout accès non autorisé.
            </p>
            <p className="text-gray-700 font-nunito">
            Pour toute question, veuillez nous contacter via notre support.
            </p>
          </div>
          
          {/* Lien Retour */}
          <div className="mt-4 w-full max-w-2xl flex justify-start mb-20">
            <Link to="/profile" className="text-blue-600 underline font-nunito">Retour</Link>
          </div>
        </div>
      );
};

export default PrivacyPolicy;
