import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaFire } from "react-icons/fa";
import logo from "../images/logoHorizontal.png"; // Import de l'image

const genres = {
  Fiction: [
    "Horreur",
    "Romance",
    "Réaliste",
    "Thriller",
    "Mystère",
    "Science-fiction",
    "Fantaisie",
    "Aventure",
    "Drame",
  ],
  "Non-fiction": [
    "Santé et bien-être",
    "Musique",
    "Recettes",
    "Technologie",
    "Philosophie",
    "Histoire",
    "Arts",
    "Science",
    "Psychologie",
    "Sports",
    "Essai",
    "Autobiographie",
    "Sociologie",
    "Environnement",
    "Développement personnel",
  ],
  "Jeune adulte": [
    "Coming of age",
    "Poésie",
    "Littérature LGBTQ+",
    "Littérature africaine",
    "Littérature asiatique",
    "Littérature latino-américaine",
    "Littérature européenne",
    "Littérature autochtone",
  ],
  Classique: [
    "Nouvelle",
    "Littérature française",
    "Classique",
    "Mythologie",
    "Contes de fées",
  ],
  Spécial: [
    "Voyage dans le temps",
    "Cyberpunk",
    "Steampunk",
    "Western",
    "Gothique",
    "Utopie/Dystopie",
    "Chick-lit",
  ],
  Biographie: ["Politique", "Scientifique", "Sportive", "Artistique"],
  Poésie: ["Épique", "Lyrique", "Satirique", "Narrative"],
  Théâtre: ["Comédie", "Tragédie", "Drame historique", "Théâtre de l'absurde"],
};

// Liste de couleurs associées
const colorMap = {
  Horreur: "bg-custom-blue",
  Romance: "bg-custom-orange",
  Réaliste: "bg-custom-yellow",
  Thriller: "bg-custom-green",
  Mystère: "bg-custom-green2",
  "Science-fiction": "bg-custom-turquoise",
  Fantaisie: "bg-custom-darker-orange",
  Aventure: "bg-light-blue",
  Drame: "bg-light-yellow",
  "Santé et bien-être": "bg-light-pink",
  Musique: "bg-soft-pink",
  Recettes: "bg-lavender",
  Technologie: "bg-blue-light",
  Philosophie: "bg-custom-dark-blue",
  Histoire: "bg-violet",
  Arts: "bg-dark-green",
  Science: "bg-orange",
  Psychologie: "bg-lu-color",
  Sports: "bg-aLire-color",
  Essai: "bg-custom-blue",
  Autobiographie: "bg-custom-orange",
  Sociologie: "bg-custom-yellow",
  Environnement: "bg-custom-green",
  "Développement personnel": "bg-custom-green2",
  "Coming of age": "bg-custom-turquoise",
  Poésie: "bg-custom-darker-orange",
  "Littérature LGBTQ+": "bg-light-blue",
  "Littérature africaine": "bg-light-yellow",
  "Littérature asiatique": "bg-light-pink",
  "Littérature latino-américaine": "bg-soft-pink",
  "Littérature européenne": "bg-lavender",
  "Littérature autochtone": "bg-blue-light",
  Nouvelle: "bg-custom-dark-blue",
  "Littérature française": "bg-violet",
  Classique: "bg-dark-green",
  Mythologie: "bg-orange",
  "Contes de fées": "bg-lu-color",
  "Voyage dans le temps": "bg-aLire-color",
  Cyberpunk: "bg-custom-blue",
  Steampunk: "bg-custom-orange",
  Western: "bg-custom-yellow",
  Gothique: "bg-custom-green",
  "Utopie/Dystopie": "bg-custom-green2",
  "Chick-lit": "bg-custom-turquoise",
  Politique: "bg-custom-darker-orange",
  Scientifique: "bg-light-blue",
  Sportive: "bg-light-yellow",
  Artistique: "bg-light-pink",
  Épique: "bg-soft-pink",
  Lyrique: "bg-lavender",
  Satirique: "bg-blue-light",
  Narrative: "bg-custom-dark-blue",
  Comédie: "bg-violet",
  Tragédie: "bg-dark-green",
  "Drame historique": "bg-orange",
  "Théâtre de l'absurde": "bg-lu-color",
};

const Questionnaire = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [expandedGenres, setExpandedGenres] = useState({});
  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;

  const handleSelectGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleToggleExpand = (genre) => {
    setExpandedGenres((prev) => ({
      ...prev,
      [genre]: !prev[genre],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) {
      alert("Veuillez sélectionner au moins un genre avant de soumettre.");
      return;
    }
    await signup(
      { email, password, bookPreferences: selectedGenres },
      navigate
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-6"
      style={{
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64", // Couleur de fond
      }}
    >
      <img src={logo} alt="Logo" className="mb-4 object-none" />
      <h3 className="text-xl font-bold text-white mb-4 text-center font-platypi">
        Dites-nous en plus sur vos goûts...
      </h3>
      <h4
        className="text-lg font-bold mb-6 text-center font-nunito"
        style={{ color: "#F3CD4A" }}
      >
        Quels genres de livres aimez-vous ?
      </h4>
      <div className="flex flex-wrap gap-4 justify-start mb-6">
        {" "}
        {/* Alignement à gauche */}
        {Object.entries(genres).map(([genre, subGenres], index) => (
          <div key={index} className="w-full">
            <h4 className="text-xl text-white mb-2 text-left font-nunito">
              {genre}
            </h4>
            <div className="flex flex-wrap gap-3 justify-start mb-4">
              {" "}
              {/* Réduction de l'espace entre les boutons */}
              {(expandedGenres[genre] ? subGenres : subGenres.slice(0, 3)).map(
                (subGenre, subIndex) => (
                  <button
                    key={subIndex}
                    className={`px-3 py-1.5 rounded-full border font-bold text-white font-nunito transition-transform transform ${
                      selectedGenres.includes(subGenre)
                        ? `${colorMap[subGenre]} border-none scale-105` // Suppression de border-white quand sélectionné
                        : "bg-transparent border-white text-white hover:scale-105"
                    }`}
                    onClick={() => handleSelectGenre(subGenre)}
                  >
                    {subGenre}
                  </button>
                )
              )}
              {subGenres.length > 3 && (
                <button
                  className="px-3 py-1.5 rounded-full border font-bold font-nunito bg-gray-700 border-gray-500 text-white hover:bg-gray-600 hover:scale-105"
                  onClick={() => handleToggleExpand(genre)}
                >
                  {expandedGenres[genre] ? "Voir moins" : "Voir plus"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={`w-full max-w-xs flex justify-start items-center py-1.5 px-3 border border-transparent rounded-full shadow-lg text-base font-medium text-white bg-custom-orange hover:bg-custom-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-orange transition-transform transform ${
          loading ? "cursor-not-allowed" : "hover:scale-105"
        }`}
        disabled={loading}
      >
        {loading ? (
          "Inscription en cours..."
        ) : (
          <>
            <FaFire className="mr-1" />
            Découvrir mes recommandations
          </>
        )}
      </button>
    </div>
  );
};

export default Questionnaire;
