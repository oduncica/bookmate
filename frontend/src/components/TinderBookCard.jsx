import React, { useState } from "react";
import { FaTimes, FaBookOpen, FaBookmark } from "react-icons/fa";

const TinderBookCard = ({ book, onLike, onDislike, onRead }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = book.volumeInfo.description || "Résumé non disponible";
  const truncatedDescription =
    description.length > 200 ? description.substring(0, 200) + "..." : description;

  return (
    <div className="w-[400px] min-h-[500px] max-h-[95vh] rounded-lg overflow-hidden shadow-lg m-1 bg-white text-black flex flex-col font-[Nunito]">
      {book.volumeInfo.imageLinks ? (
        <img
          className="w-full h-[40vh] object-cover object-top"
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      ) : (
        <div className="w-full h-[35vh] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-xs">Image non disponible</span>
        </div>
      )}

      <div className="px-2 py-1 flex-1">
        <div className="font-bold text-lg mb-1 line-clamp-2 font-[Platypi] text-[#543787]">
          {book.volumeInfo.title}
        </div>
        <p className="text-gray-700 text-sm">
          {Array.isArray(book.volumeInfo.authors)
            ? book.volumeInfo.authors.join(", ")
            : "Auteur inconnu"}
        </p>
      </div>

      <div className="px-2 pb-2 flex flex-wrap">
        {Array.isArray(book.volumeInfo.categories) &&
          book.volumeInfo.categories.map((category) => {
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            return (
              <span
                key={category}
                style={{ backgroundColor: randomColor, color: "#FFFFFF" }}
                className="inline-block rounded-full px-2 py-1 text-xs font-semibold mr-1 mb-1"
              >
                #{category}
              </span>
            );
          })}
      </div>

      <div className="px-2 py-1 flex-1">
        <p className="text-gray-700 text-sm line-clamp-4">
          {showFullDescription ? description : truncatedDescription}
        </p>
        {description.length > 200 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:underline text-xs"
          >
            {showFullDescription ? "Lire moins" : "Lire la suite"}
          </button>
        )}
      </div>

      <div className="px-2 py-2 flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => onDislike(book.id)}
            className="bg-[#EE753E] text-white font-bold p-4 rounded-full flex items-center justify-center text-3xl"
            title="Pas intéressé"
          >
            <FaTimes />
          </button>
          <span className="text-xs mt-1">Ignorer</span>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => onRead(book.id)}
            className="bg-[#67AAB3] text-white font-bold p-4 rounded-full flex items-center justify-center text-3xl"
            title="Lu"
          >
            <FaBookOpen />
          </button>
          <span className="text-xs mt-1">Déjà Lu</span>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => onLike(book.id)}
            className="bg-[#4D9F38] text-white font-bold p-4 rounded-full flex items-center justify-center text-3xl"
            title="À lire"
          >
            <FaBookmark />
          </button>
          <span className="text-xs mt-1">Sauvegarder</span>
        </div>
      </div>
    </div>
  );
};

export default TinderBookCard;
