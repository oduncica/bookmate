import { useState } from "react";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Import de l'icône croix

const ForgotPassword = () => {
  const navigate = useNavigate(); // 🔹 Initialisation de navigate
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/password/forgot", { email });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 relative"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64",
      }}
    >
       {/* 🔹 Bouton de fermeture fonctionnel */}
       <button
        onClick={() => navigate(-1)} // 🔹 navigate(-1) permet de revenir à la page précédente
        className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 transition z-50"
      >
        <FaTimes />
      </button>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-custom-orange">
          Réinitialisation du mot de passe
        </h1>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {message && <p className="text-center text-green-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-orange ${
              loading
                ? "cursor-not-allowed opacity-70"
                : "hover:bg-custom-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-orange"
            }`}
            disabled={loading}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
