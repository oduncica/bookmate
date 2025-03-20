import React, { useEffect, useState } from "react";
import { useSuggestionsStore } from "../store/useSuggestionsStore";
import TinderBookCard from "../components/TinderBookCard";
import { useSwipeable } from "react-swipeable";

const HomePage = () => {
  const { suggestions, fetchSuggestions, likeBook, dislikeBook, readBook } =
    useSuggestionsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleSwipe = async (direction) => {
  if (suggestions[currentIndex]) {
    if (direction === "right") {
      await likeBook(suggestions[currentIndex].id);
    } else if (direction === "left") {
      await dislikeBook(suggestions[currentIndex].id);
    }

    setCurrentIndex((prevIndex) => prevIndex + 1); // ✅ Forcer l'affichage du livre suivant
  }
};

  
  
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  const handleLike = async (bookId) => {
    await likeBook(bookId);
  };
  
  const handleDislike = async (bookId) => {
    await dislikeBook(bookId);
  };
  

  const handleRead = async (bookId) => {
    await readBook(bookId);
    setCurrentIndex((prevIndex) =>
      prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64", // Violet background
      }}
    >
      <div
        {...handlers} // Attacher les handlers ici pour capter les swipes
        className="flex justify-center items-center w-full h-full"
      >
      {Array.isArray(suggestions) && suggestions.length > 0 && currentIndex < suggestions.length ? (
  <TinderBookCard
    book={suggestions[currentIndex]}
    onLike={handleLike}
    onDislike={handleDislike}
    onRead={handleRead}
    onSwipe={handleSwipe}
  />
) : (
  <p className="text-center text-xl text-white">Aucune suggestion de livre disponible.</p>
)}

      </div>
    </div>
  );
};

export default HomePage;
