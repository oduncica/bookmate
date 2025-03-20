import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { FaTimes, FaBookOpen, FaBookmark } from "react-icons/fa";

const TinderBookCard = ({ book, onSwipe, onLike, onDislike, onRead }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [swiped, setSwiped] = useState(false);

  // Animation de position
  const [{ x, opacity, rotate }, api] = useSpring(() => ({
    x: 0,
    opacity: 1,
    rotate: 0,
  }));

  // Gestion du swipe
  const bind = useGesture({
    onDrag: ({ down, movement: [mx] }) => {
      if (!down && Math.abs(mx) > 100) {
        api.start({
          x: mx > 0 ? 300 : -300, // Swipe vers la droite ou la gauche
          opacity: 0,
          rotate: mx > 0 ? 15 : -15,
          onRest: () => onSwipe(book.id, mx > 0 ? "right" : "left"),
        });
      } else {
        api.start({ x: down ? mx : 0, rotate: down ? mx / 20 : 0 });
      }
    },
  });

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  if (swiped) return null; // Masquer la carte après le swipe

  return (
    <animated.div
      {...bind()}
      style={{ x, opacity, rotate, touchAction: "none" }}
      className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white text-black flex flex-col items-center cursor-grab"
    >
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
        <h2 className="font-bold text-xl mb-2 text-left">{book.volumeInfo.title}</h2>
        <p className="text-gray-700 text-left text-sm">
          {Array.isArray(book.volumeInfo.authors)
            ? book.volumeInfo.authors.join(", ")
            : "Auteur inconnu"}
        </p>
      </div>
      <div className="px-2 pb-2 text-left">
        <p className="text-gray-700 text-sm">
          {showFullDescription
            ? book.volumeInfo.description || "Résumé non disponible"
            : (book.volumeInfo.description || "Résumé non disponible").substring(0, 150) + "..."}
        </p>
        {book.volumeInfo.description?.length > 150 && (
          <button onClick={toggleDescription} className="text-blue-500 text-sm">
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
    </animated.div>
  );
};

export default TinderBookCard;
