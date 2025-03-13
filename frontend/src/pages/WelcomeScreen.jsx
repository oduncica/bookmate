import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const WelcomeScreen = () => {
  const [currentForm, setCurrentForm] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 overflow-auto"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64",
      }}
    >
      <img
        src="/logoHorizontal.png"
        alt="Bookmate Logo"
        className="absolute top-4 left-4"
      />
      <div className="w-full max-w-md text-center">
        {/* Titre et description */}
        <h3 className="text-2xl font-extrabold text-white mb-8 font-platypi">
          {"Swipe vers ton prochain coup de cœur littéraire"}
        </h3>
        <h4 className="text-white mb-8">
          {
            "Plus besoin de chercher, laisse Bookmate guider tes lectures. Découvre nos recommandations, rien que pour toi."
          }
        </h4>

        {/* Affichage conditionnel du formulaire */}
        <div className="mt-5">
          {currentForm === "login" && <LoginForm />}
          {currentForm === "signup" && <SignUpForm />}

          {/* Boutons pour afficher les formulaires */}
          {!currentForm && (
            <div className="flex justify-around">
              <button
                onClick={() => setCurrentForm("login")}
                className="px-4 py-2 bg-custom-orange text-white rounded hover:bg-custom-orange transition-colors duration-300"
              >
                Connexion
              </button>
              <button
                onClick={() => setCurrentForm("signup")}
                className="px-4 py-2 bg-white text-black rounded hover:bg-green-700 transition-colors duration-300"
              >
                Créer un compte
              </button>
            </div>
          )}

          {/* Bouton Retour pour fermer le formulaire */}
          {currentForm && (
            <button
              onClick={() => setCurrentForm(null)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors duration-300"
            >
              Retour
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
