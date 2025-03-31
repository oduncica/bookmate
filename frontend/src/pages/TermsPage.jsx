import React from "react";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "200%",
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4 font-platypi">Conditions Générales</h1>
        <p className="text-gray-700 font-nunito mb-4">
          Bienvenue sur notre plateforme. En utilisant nos services, vous acceptez les termes et conditions suivants.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Acceptation des conditions</h2>
        <p className="text-gray-700 font-nunito mb-4">
          En accédant à ce site, vous acceptez d'être lié par ces conditions générales, toutes les lois et règlements applicables.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Modifications des services</h2>
        <p className="text-gray-700 font-nunito mb-4">
          Nous nous réservons le droit de modifier ou de suspendre notre service à tout moment sans préavis.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Utilisation des données</h2>
        <p className="text-gray-700 font-nunito mb-4">
          Vos informations personnelles seront utilisées conformément à notre politique de confidentialité.
        </p>
      </div>
      
      {/* Lien Retour */}
      <div className="mt-4 w-full max-w-2xl flex justify-start">
        <Link to="/profile" className="text-blue-600 underline font-nunito">Retour</Link>
      </div>
    </div>
  );
};

export default TermsPage;