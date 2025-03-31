import React, { useEffect, useState } from "react";
import { useSuggestionsStore } from "../store/useSuggestionsStore";
import TinderBookCard from "../components/TinderBookCard";

const HomePage = () => {
  const { suggestions, fetchSuggestions, likeBook, dislikeBook, readBook } =
    useSuggestionsStore();
  const [stack, setStack] = useState([]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  useEffect(() => {
    setStack(suggestions);
  }, [suggestions]);

  const handleSwipe = async (bookId, direction) => {
    if (direction === "right") {
      await likeBook(bookId);
    } else if (direction === "left") {
      await dislikeBook(bookId);
    }
    setStack((prevStack) => prevStack.slice(1)); // Supprimer la carte du stack après un swipe
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
        paddingBottom: "80px", // Ajoute un padding-bottom pour éviter que la navbar cache le contenu
      }}
    >
      <div className="relative w-full max-w-sm h-[650px]">
        {stack.length > 0 ? (
          stack.map((book, index) => (
            <TinderBookCard
              key={book.id}
              book={book}
              onSwipe={handleSwipe}
              onLike={(bookId) => handleSwipe(bookId, "right")}
              onDislike={(bookId) => handleSwipe(bookId, "left")}
              onRead={async (bookId) => {
                await readBook(bookId);
                handleSwipe(bookId, "read");
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: stack.length - index, // Empile les cartes correctement
                width: "100%",
                height: "100%",
              }}
            />
          ))
        ) : (
          <p className="text-center text-xl text-white">
            Aucune suggestion de livre disponible.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
