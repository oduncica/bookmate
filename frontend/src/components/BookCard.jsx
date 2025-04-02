import React, { useState, useEffect } from 'react';
import { FaTimes, FaBookOpen, FaBookmark } from 'react-icons/fa';
import Modal from 'react-modal';

const colors = [
  '#8dace5', '#f0743e', '#feb737', '#aad59f', '#2A621C', '#2e6168', '#d25c28',
  '#d4e0f0', '#fde9ad', '#f6c3ae', '#f9b1b2', '#cdbcdc', '#9ab2d4', '#3A3A64',
  '#543787', '#526049', '#f29b3a', '#67AAB3', '#4D9F38'
];

const BookCard = ({ book, onAddToRead, onAddToReadBooks, onAddToDislikedBooks, onDelete, isLibraryView }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tagColor, setTagColor] = useState('');

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTagColor(randomColor);
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg m-2 bg-white text-[#3A3A64] cursor-pointer"
    onClick={openModal}>
      <div className="flex items-center">
        {book.image ? (
          <img 
            className="w-24 h-32 object-cover m-2 ml-4 cursor-pointer" 
            src={book.image} 
            alt={book.title} 
            onClick={openModal} 
          />
        ) : (
          <div 
            className="w-24 h-32 bg-gray-200 flex items-center justify-center m-2 ml-4 cursor-pointer" 
            onClick={openModal}
          >
            <span className="text-gray-500">Image non disponible</span>
          </div>
        )}

        <div className="flex-1 px-4 py-2">
          <div className="font-bold text-md mb-2" style={{ fontFamily: 'Platypi, sans-serif' }}>
            {book.title}
          </div>
          <p className="text-[#3A3A64] text-xs">
            {Array.isArray(book.authors) ? book.authors.join(', ') : 'Auteur inconnu'}
          </p>

          <div className="mt-2">
            {Array.isArray(book.categories) && book.categories.length > 0 && (
              <span 
                key={book.categories[0]} 
                className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2"
                style={{ backgroundColor: tagColor }}
              >
                #{book.categories[0]}
              </span>
            )}
          </div>

          <div className="mt-2 flex justify-start space-x-2">
          {isLibraryView ? (
  <button
    onClick={(e) => { e.stopPropagation(); onDelete(); }}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded flex items-center text-sm"
    title="Supprimer"
  >
    <FaTimes size={16} />
  </button>
) : (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); onAddToRead(); }}
                  className="text-white font-bold py-1 px-3 rounded flex items-center text-sm"
                  style={{ backgroundColor: '#4D9F38', hover: { backgroundColor: '#3A7A2B' } }}
                  title="Ajouter à 'À lire'"
                >
                  <FaBookmark size={16} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); onAddToReadBooks(); }}
                  className="text-white font-bold py-1 px-3 rounded flex items-center text-sm"
                  style={{ backgroundColor: '#67AAB3', hover: { backgroundColor: '#4F8893' } }}
                  title="Ajouter à 'Lu'"
                >
                  <FaBookOpen size={16} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); onAddToDislikedBooks(); }}
                  className="text-white font-bold py-1 px-3 rounded flex items-center text-sm"
                  style={{ backgroundColor: '#D25C28', hover: { backgroundColor: '#A04420' } }}
                  title="Ajouter à 'Pas intéressé'"
                >
                  <FaTimes size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Détails du livre"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} >
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
              className="bg-red-500 text-white font-bold py-1 px-3 rounded"
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
