import axios from "axios";
import User from "../models/User.js";
import Book from "../models/Book.js";

const GOOGLE_BOOKS_API_KEY = "AIzaSyDWPZhU3bhsZDl_CgpGjaaKiXOCt4xoRJU";

export const getBookSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "toReadBooks readBooks dislikedBooks"
    );
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Utiliser les préférences de l'utilisateur et les encoder pour l'URL
    const preferences = user.bookPreferences.join("+");
    if (!preferences) {
      return res
        .status(400)
        .json({ message: "Les préférences de l'utilisateur sont vides" });
    }
    console.log("Préférences de l'utilisateur:", preferences);

    const url = `https://www.googleapis.com/books/v1/volumes?q=${preferences}&maxResults=40&key=${GOOGLE_BOOKS_API_KEY}`;
    console.log("URL de la requête:", url);

    const response = await axios.get(url);
    const books = response.data.items;

    // Filtrer les livres déjà dans les catégories "à lire", "lu" et "Pas intéressé"
    const filteredBooks = books.filter(
      (book) =>
        !user.toReadBooks.some((b) => b.googleBookId === book.id) &&
        !user.readBooks.some((b) => b.googleBookId === book.id) &&
        !user.dislikedBooks.some((b) => b.googleBookId === book.id)
    );

    res.status(200).json(filteredBooks);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des suggestions de livres:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des suggestions de livres",
      error,
    });
  }
};
export const likeBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le livre existe déjà dans la base de données
    let book = await Book.findOne({ googleBookId: bookId });
    if (!book) {
      // Ajouter le livre à la base de données
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`
      );
      const bookData = response.data;
      book = new Book({
        googleBookId: bookId,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        description: bookData.volumeInfo.description,
        image: bookData.volumeInfo.imageLinks?.thumbnail,
        publishedDate: bookData.volumeInfo.publishedDate,
        categories: bookData.volumeInfo.categories,
        userId: user._id,
      });
      await book.save();
    }

    user.toReadBooks.push(book._id);
    await user.save();

    res.status(200).json({ message: 'Livre ajouté à la catégorie "à lire"' });
  } catch (error) {
    console.error(
      'Erreur lors de l\'ajout du livre à la catégorie "à lire":',
      error
    );
    res.status(500).json({
      message: 'Erreur lors de l\'ajout du livre à la catégorie "à lire"',
      error,
    });
  }
};

export const dislikeBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le livre existe déjà dans la base de données
    let book = await Book.findOne({ googleBookId: bookId });
    if (!book) {
      // Ajouter le livre à la base de données
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`
      );
      const bookData = response.data;
      book = new Book({
        googleBookId: bookId,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        description: bookData.volumeInfo.description,
        image: bookData.volumeInfo.imageLinks?.thumbnail,
        publishedDate: bookData.volumeInfo.publishedDate,
        categories: bookData.volumeInfo.categories,
        userId: user._id,
      });
      await book.save();
    }

    user.dislikedBooks.push(book._id);
    await user.save();

    res
      .status(200)
      .json({ message: 'Livre ajouté à la catégorie "Pas intéressé"' });
  } catch (error) {
    console.error(
      'Erreur lors de l\'ajout du livre à la catégorie "Pas intéressé":',
      error
    );
    res.status(500).json({
      message:
        'Erreur lors de l\'ajout du livre à la catégorie "Pas intéressé"',
      error,
    });
  }
};

export const readBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le livre existe déjà dans la base de données
    let book = await Book.findOne({ googleBookId: bookId });
    if (!book) {
      // Ajouter le livre à la base de données
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`
      );
      const bookData = response.data;
      book = new Book({
        googleBookId: bookId,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        description: bookData.volumeInfo.description,
        image: bookData.volumeInfo.imageLinks?.thumbnail,
        publishedDate: bookData.volumeInfo.publishedDate,
        categories: bookData.volumeInfo.categories,
        userId: user._id,
      });
      await book.save();
    }

    user.readBooks.push(book._id);
    await user.save();

    res.status(200).json({ message: 'Livre ajouté à la catégorie "Lu -"' });
  } catch (error) {
    console.error(
      'Erreur lors de l\'ajout du livre à la catégorie "Lu":',
      error
    );
    res.status(500).json({
      message: 'Erreur lors de l\'ajout du livre à la catégorie "Lu"',
      error,
    });
  }
};

export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("likedBooks");
    res.status(200).json({
      success: true,
      matches: user.likedBooks,
    });
  } catch (error) {
    console.error("Error in getMatches:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
