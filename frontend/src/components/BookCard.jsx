import React, { useState } from 'react';
import { FaBook, FaCheck, FaTimes, FaInfoCircle, FaExternalLinkAlt } from 'react-icons/fa';
import Modal from 'react-modal';

const BookCard = ({ book, onAddToRead, onAddToReadBooks, onAddToDislikedBooks, onDelete, isLibraryView }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="relative max-w-md rounded-lg overflow-hidden shadow-lg m-2 bg-white text-[#3A3A64]">
  {/* Bouton Détails en haut à droite */}
  <button
    onClick={openModal}
    className="absolute top-2 right-2 text-[#3A3A64]"
    title="Voir les détails"
  >
    <i className="fas fa-up-right-from-square"></i>
  </button>


      <div className="flex">
        {/* Image à gauche */}
        {book.image ? (
          <img className="w-24 h-32 object-cover m-2" src={book.image} alt={book.title} />
        ) : (
          <div className="w-24 h-32 bg-gray-200 flex items-center justify-center m-2">
            <span className="text-gray-500">Image non disponible</span>
          </div>
        )}

        {/* Contenu à droite */}
        <div className="flex-1 px-4 py-2">
          <div className="font-bold text-md mb-2" style={{ fontFamily: 'Platypi, sans-serif' }}>
            {book.title}
          </div>
          <p className="text-[#3A3A64] text-xs">
            {Array.isArray(book.authors) ? book.authors.join(', ') : 'Auteur inconnu'}
          </p>

          {/* Tags */}
          <div className="mt-2">
            {Array.isArray(book.categories) && book.categories.map((category) => (
              <span key={category} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-[#3A3A64] mr-2 mb-2">
                #{category}
              </span>
            ))}
          </div>

          {/* Boutons d'action (sans Détails) */}
<div className="mt-2 flex justify-start space-x-2">
  {isLibraryView ? (
    <button
      onClick={onDelete}
      className="bg-[#D25C28] hover:bg-[#D25C28] text-white font-bold py-1 px-2 rounded flex items-center"
      title="Supprimer"
    >
      <FaTimes />
    </button>
  ) : (
    <>
      <button
        onClick={onAddToRead}
        className="bg-[#4D9F38] hover:bg-[#4D9F38] text-white font-bold py-1 px-2 rounded flex items-center"
        title="Ajouter à 'à lire'"
      >
        <img
          src="/save_icon.png"
          alt="Sauvegarder"
          className="max-w-4 max-h-4 w-auto h-auto"
        />
      </button>
      <button
        onClick={onAddToReadBooks}
        className="bg-[#67AAB3] hover:bg-[#56949B] text-white font-bold py-1 px-2 rounded flex items-center"
        title="Ajouter à 'Lu'"
      >
        <img
          src="/dejalu_icon.png"
          alt="Déjà lu"
          className="max-w-5 max-h-5 w-auto h-auto"
        />
      </button>
      <button
        onClick={onAddToDislikedBooks}
        className="bg-[#D25C28] hover:bg-[#D25C28] text-white font-bold py-1 px-2 rounded flex items-center"
        title="Ajouter à 'Pas intéressé'"
      >
        <FaTimes />
      </button>
    </>
  )}
</div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Détails du livre"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
          <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <FaTimes size={20} />
          </button>
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
          </div>
          <div className="mb-4">
            <img className="w-full h-40 object-cover mb-4" src={book.image} alt={book.title} />
            <p className="text-[#3A3A64] mb-2">
              <strong>Auteur(s) :</strong> {Array.isArray(book.authors) ? book.authors.join(', ') : 'Auteur inconnu'}
            </p>
            <div className="text-[#3A3A64] mb-2 max-h-40 overflow-y-auto">
              <strong>Description :</strong> {book.description || 'Description non disponible'}
            </div>
            <p className="text-[#3A3A64] mb-2">
              <strong>Date de publication :</strong> {book.publishedDate || 'Date non disponible'}
            </p>
            <a
              href={`https://books.google.com/books?id=${book.googleBookId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Voir sur Google Books
            </a>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookCard;
