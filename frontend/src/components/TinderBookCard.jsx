import React, { useState } from "react";
import { FaTimes, FaBookOpen, FaBookmark } from "react-icons/fa";

const TinderBookCard = ({ book, onLike, onDislike, onRead }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = book.volumeInfo.description || "Résumé non disponible";
  const truncatedDescription =
    description.length > 150
      ? description.substring(0, 150) + "..."
      : description;

  return (
    <div className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white text-black flex flex-col items-center">
      {book.volumeInfo.imageLinks ? (
        <img
          className="w-full h-96 object-cover"
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
      <div className="px-2 py-2 w-full">
        <h2 className="font-bold text-xl mb-2 text-left" style={{ fontFamily: "Platypi" }} >{book.volumeInfo.title}</h2>
        <p className="text-gray-700 text-left text-sm">
          {Array.isArray(book.volumeInfo.authors)
            ? book.volumeInfo.authors.join(", ")
            : "Auteur inconnu"}
        </p>
        <div className="text-left mt-2">
          {Array.isArray(book.volumeInfo.categories) &&
            book.volumeInfo.categories.map((category) => (
              <span
                key={category}
                className="inline-block bg-gray-200 rounded-full px-1 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
              >
                #{category}
              </span>
            ))}
        </div>
      </div>
      <div className="px-2 pb-2 text-left">
        <p className="text-gray-700 text-sm">
          {showFullDescription ? description : truncatedDescription}
        </p>
        {description.length > 150 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 text-sm"
          >
            {showFullDescription ? "Lire moins" : "Lire la suite"}
          </button>
        )}
      </div>
      <div className="px-6 py-4 flex justify-center space-x-6 w-full">
  <div className="flex flex-col items-center">
    <button
      onClick={() => onDislike(book.id)}
      className="bg-[#EE753E] text-white font-bold p-5 rounded-full flex items-center justify-center text-3xl"
      title="Pas intéressé"
    >
      <FaTimes />
    </button>
    <span className="text-sm mt-1">Ignorer</span>
  </div>
  <div className="flex flex-col items-center">
    <button
      onClick={() => onRead(book.id)}
      className="bg-[#67AAB3] text-white font-bold p-5 rounded-full flex items-center justify-center text-3xl"
      title="Lu"
    >
      <FaBookOpen />
    </button>
    <span className="text-sm mt-1">Déjà Lu</span>
  </div>
  <div className="flex flex-col items-center">
    <button
      onClick={() => onLike(book.id)}
      className="bg-[#4D9F38] text-white font-bold p-5 rounded-full flex items-center justify-center text-3xl"
      title="À lire"
    >
      <FaBookmark />
    </button>
    <span className="text-sm mt-1">Sauvegarder</span>
  </div>
</div>

    </div>
  );
};

export default TinderBookCard;
