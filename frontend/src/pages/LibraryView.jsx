import React, { useEffect, useState } from "react";
import { FaBook, FaCheck } from "react-icons/fa";
import useLibraryStore from "../store/useLibraryStore";
import BookCard from "../components/BookCard";
import logo from "../images/logoNoText.png"; 

const LibraryView = () => {
  const {
    toReadBooks,
    readBooks,
    fetchToReadBooks,
    fetchReadBooks,
    deleteToReadBook,
    deleteReadBook,
  } = useLibraryStore();

  const [activeTab, setActiveTab] = useState("toRead");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchToReadBooks();
    fetchReadBooks();
  }, [fetchToReadBooks, fetchReadBooks]);

  const handleDelete = async (bookId, category) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce livre?"
    );
    if (confirmDelete) {
      if (category === "toRead") {
        await deleteToReadBook(bookId);
      } else if (category === "read") {
        await deleteReadBook(bookId);
      }
    }
  };

  const filteredBooks = (books) => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const booksToDisplay =
    activeTab === "toRead"
      ? filteredBooks(toReadBooks)
      : filteredBooks(readBooks);

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{
        background: "url('/bg_image.png') center / 200% no-repeat, #3A3A64",
        minHeight: '170vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-white font-platypi">
        Ma Bibliothèque
      </h1>
      <div className="mb-8 flex justify-center items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 mr-2"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="tabs mb-8 flex justify-start">
        <button
          className={`tab ${
            activeTab === "toRead" ? "bg-aLire-color" : ""
          } flex items-center px-4 py-2 mx-2 rounded-lg border border-gray-300 text-white`}
          onClick={() => setActiveTab("toRead")}
        >
          <FaBook className="mr-2 text-white" />À lire
        </button>
        <button
          className={`tab ${
            activeTab === "read" ? "bg-lu-color" : ""
          } flex items-center px-4 py-2 mx-2 rounded-lg border border-gray-300 text-white`}
          onClick={() => setActiveTab("read")}
        >
          <FaCheck className="mr-2 text-white" />
          Lu
        </button>
      </div>
      <div className="book-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {booksToDisplay.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={() => handleDelete(book._id, activeTab)}
            isLibraryView={true}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryView;
