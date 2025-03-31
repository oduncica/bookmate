import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { FaTimes, FaBookOpen, FaBookmark } from "react-icons/fa";

const TinderBookCard = ({
  book,
  onSwipe,
  onLike,
  onDislike,
  onRead,
  style,
}) => {
  const [swiped, setSwiped] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Gestion de l'affichage de la description
  const description = book.volumeInfo.description || "Résumé non disponible";
  const maxLength = 60;
  const isLongDescription = description.length > maxLength;
  const shouldShowToggleButton = isLongDescription;

  const truncatedDescription = isLongDescription
    ? description.substring(0, maxLength) + "..."
    : description;

  const [{ x, opacity, rotate }, api] = useSpring(() => ({
    x: 0,
    opacity: 1,
    rotate: 0,
  }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx] }) => {
      if (!down && Math.abs(mx) > 100) {
        setSwiped(true);
        api.start({
          x: mx > 0 ? 300 : -300,
          opacity: 0,
          rotate: mx > 0 ? 15 : -15,
          onRest: () => onSwipe(book.id, mx > 0 ? "right" : "left"),
        });
      } else {
        api.start({ x: down ? mx : 0, rotate: down ? mx / 20 : 0 });
      }
    },
  });

  if (swiped) return null;

  return (
    <animated.div
      {...bind()}
      style={{
        ...style,
        x,
        opacity,
        rotate,
        touchAction: "none",
      }}
      className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white text-black flex flex-col items-center"
    >
      {/* Image du livre */}
      {book.volumeInfo.imageLinks ? (
        <img
          className="w-full h-96 object-cover"
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      ) : (
        <div className="w-full h-100 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
      {/* Titre et auteur */}
      <div className="px-2 py-2 w-full">
        <h2
          className="font-bold text-xl mb-2 text-left"
          style={{ fontFamily: "Platypi" }}
        >
          {book.volumeInfo.title}
        </h2>
        <p className="text-gray-700 text-left text-sm">
          {Array.isArray(book.volumeInfo.authors)
            ? book.volumeInfo.authors.join(", ")
            : "Auteur inconnu"}
        </p>
        {/* Affichage des catégories */}
        {/* <div className="text-left mt-2">
          {Array.isArray(book.volumeInfo.categories) &&
            book.volumeInfo.categories.map((category) => (
              <span
                key={category}
                className="inline-block bg-gray-200 rounded-full px-1 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
              >
                #{category}
              </span>
            ))}
        </div> */}
      </div>
      {/* Description du livre */}
      <div className="px-2 pb-2 text-left w-full mb-6 overflow-y-auto max-h-60">
        <p className="text-gray-700 text-sm">
          {showFullDescription ? description : truncatedDescription}
        </p>
        {shouldShowToggleButton && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 text-sm mt-2 underline"
          >
            {showFullDescription ? "Lire moins" : "Lire la suite"}
          </button>
        )}
      </div>
      {/* Boutons d'action */}
      <div className="px-6 py- flex justify-center space-x-6 w-full bg-white sticky bottom-0">
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
