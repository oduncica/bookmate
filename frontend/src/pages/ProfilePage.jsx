import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faGavel,
  faLock,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaFire } from "react-icons/fa";

const ProfilePage = () => {
  const { authUser, logout, updateProfile } = useAuthStore();
  const [email, setEmail] = useState("");
  const [bookPreferences, setBookPreferences] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPreferencesField, setShowPreferencesField] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setEmail(authUser.email);
      setBookPreferences(authUser.bookPreferences);
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des erreurs
    if (!bookPreferences) {
      setError("Le champ des préférences de lecture est obligatoire");
      return;
    }
    if (showPasswordFields && newPassword && !oldPassword) {
      setError(
        "Veuillez saisir l'ancien mot de passe pour changer le mot de passe"
      );
      return;
    }

    setLoading(true);

    // Transformation de bookPreferences en tableau
    const preferencesArray = bookPreferences
      .split(",")
      .map((pref) => pref.trim())
      .filter((pref) => pref.length > 0);

    try {
      // Envoi des données sous forme de tableau
      await updateProfile({
        newBookPreferences: preferencesArray, // Assurez-vous d'envoyer un tableau
        oldPassword,
        newPassword,
      });

      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };
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

      {/* Email utilisateur */}
      <div className="w-full text-center mb-4">
        <p className="text-xl text-white font-platypi">{email}</p>
      </div>

      {/* Section Mes recommandations */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          <FaFire className="text-white mr-2 text-lg" />
          <p className="text-xl font-bold text-white font-platypi">
            Mes recommandations
          </p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

        {/* Modifier les préférences */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-white font-nunito">
            Mes genres de livres préférés
          </p>
          {/* <button
            onClick={() => setShowPreferencesField(!showPreferencesField)}
            className="text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button> */}
          <Link
            to={{
              pathname: "/questionnaire",
            }}
            state={{ selectedGenres: bookPreferences, isProfileUpdate: true }} // Indique que c'est une mise à jour
            className="text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>

        {/* {showPreferencesField && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Préférences de lecture
            </label>
            <input
              type="text"
              value={bookPreferences}
              onChange={(e) => setBookPreferences(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              placeholder="Ex: Science-fiction, Fantasy, Thriller"
            />
          </div>
        )} */}

        {/* Mes livres ignorés */}
        <div className="flex justify-between items-center">
          <p className="text-lg text-white font-nunito">Mes livres ignorés</p>
          <Link to="/ignored-books" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>
      </div>

      {/* Section Légal */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={faGavel}
            size="lg"
            className="text-white mr-2"
          />
          <p className="text-xl font-bold text-white font-platypi">Légal</p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-white font-nunito">Conditions générales</p>
          <Link to="/terms" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-lg text-white font-nunito">
            Politique de confidentialité
          </p>
          <Link to="/privacy" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>
      </div>

      {/* Section Compte */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={faLock}
            size="lg"
            className="text-white mr-2"
          />
          <p className="text-xl font-bold text-white font-platypi">Compte</p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

        {/* Changer de mot de passe */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-white font-nunito">
            Changer de mot de passe
          </p>
          {/* <button
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button> */}

          <Link to="/passwordreset" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>

        {showPasswordFields && (
          <>
            <input
              type="password"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm mb-2"
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </>
        )}
      </div>

      {/* Bouton de déconnexion */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="lg"
            className="text-white mr-2"
          />
          <button
            onClick={logout}
            className="text-white text-lg font-nunito hover:text-gray-300"
          >
            Me déconnecter
          </button>
        </div>
      </div>

      {/* Formulaire de mise à jour */}
      {(showPasswordFields || showPreferencesField) && (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
