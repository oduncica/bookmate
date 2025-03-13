import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  const { newBookPreferences } = req.body;

  try {
    // Vérifier si newBookPreferences est fourni et est un tableau
    if (!newBookPreferences || !Array.isArray(newBookPreferences)) {
      return res.status(400).json({
        success: false,
        message: "You must provide an array of book preferences",
      });
    }

    // Nettoyer chaque préférence (enlever les espaces autour des éléments)
    const cleanedPreferences = newBookPreferences
      .map((pref) => pref.trim())
      .filter((pref) => pref.length > 0);

    // Si aucune préférence n'est fournie après nettoyage
    if (cleanedPreferences.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one valid book preference must be provided",
      });
    }

    // Trouver l'utilisateur
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Mettre à jour les préférences de livres
    user.bookPreferences = cleanedPreferences;
    await user.save();

    // Retourner la réponse avec succès
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error in update profile: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
