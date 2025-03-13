import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaFire, FaBook, FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const location = useLocation();

  const getIconColor = (path) => {
    return location.pathname === path ? "#EE753E" : "#3A3A64";
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF] p-4 flex justify-between items-center z-50">
      <Link
        to="/home"
        className="text-black hover:text-gray-700 flex flex-col items-center"
      >
        <FaFire className="mb-1" style={{ color: getIconColor("/home") }} />
        Match
      </Link>
      <Link
        to="/library"
        className="text-black hover:text-gray-700 flex flex-col items-center"
      >
        <FaBook className="mb-1" style={{ color: getIconColor("/library") }} />
        Biblio
      </Link>
      <Link
        to="/search"
        className="text-black hover:text-gray-700 flex flex-col items-center"
      >
        <FaSearch className="mb-1" style={{ color: getIconColor("/search") }} />
        Recherche
      </Link>
      <Link
        to="/profile"
        className="text-black hover:text-gray-700 flex flex-col items-center"
      >
        <FaUser className="mb-1" style={{ color: getIconColor("/profile") }} />
        Profil
      </Link>
    </nav>
  );
};

export default Navbar;
