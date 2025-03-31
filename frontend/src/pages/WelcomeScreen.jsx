import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const WelcomeScreen = () => {
  const [currentForm, setCurrentForm] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 overflow-auto"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64",
      }}
    >
      {/* Logo horizontal affiché en mode connexion/inscription en haut à gauche */}
      {currentForm && (
        <img
          src="/logoHorizontal.png"
          alt="Bookmate Horizontal Logo"
          className="absolute top-4 left-4 w-32"
        />
      )}

      {/* Afficher l'image et le texte seulement si aucun formulaire n'est ouvert */}
      {!currentForm && (
        <>
          <img
            src="/home_screen_logo.png"
            alt="Bookmate Logo"
            className="mt-[-50px] mb-6 w-48"
          />
          <div className="w-full max-w-md text-center">
            <h3 className="text-2xl font-extrabold text-white mb-8 font-platypi">
              {"Swipe vers ton prochain coup de cœur littéraire"}
            </h3>
            <h4 className="text-white mb-8">
              {
                "Plus besoin de chercher, laisse Bookmate guider tes lectures. Découvre nos recommandations, rien que pour toi."
              }
            </h4>
          </div>
        </>
      )}

      {/* Affichage conditionnel du formulaire */}
      <div className="mt-5">
        {currentForm === "login" && (
          <>
            <h3 className="text-2xl font-platypi text-white text-center mb-4">Se connecter</h3>
            <LoginForm />
          </>
        )}
        {currentForm === "signup" && (
          <>
            <h3 className="text-2xl font-platypi text-white text-center mb-4">Créer votre compte</h3>
            <SignUpForm />
          </>
        )}

        {/* Boutons pour afficher les formulaires */}
        {!currentForm && (
          <div className="flex justify-around space-x-4">
            <button
              onClick={() => setCurrentForm("login")}
              className="px-4 py-2 bg-custom-orange text-white rounded hover:bg-custom-orange transition-colors duration-300"
            >
              Connexion
            </button>
            <button
              onClick={() => setCurrentForm("signup")}
              className="px-4 py-2 bg-white text-black rounded hover:bg-custom-orange transition-colors duration-300"
            >
              Créer un compte
            </button>
          </div>
        )}

        {/* Bouton Retour pour fermer le formulaire */}
        {currentForm && (
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentForm(null)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors duration-300"
            >
              Retour
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
