"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBlog } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
    
        <div className="flex items-center space-x-2">
          <FaBlog className="text-2xl text-yellow-400" />
          <h1 className="text-xl font-bold">Foodie Frenzy</h1>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-400 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition duration-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-400 transition duration-300">
            Contact Us
          </Link>
        </div>

        
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

    
      <div className={isOpen ? "md:hidden flex flex-col bg-indigo-800 py-4 space-y-3 items-center" : "hidden"}>
        <Link href="/" className="hover:text-yellow-400 transition duration-300" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link href="/about" className="hover:text-yellow-400 transition duration-300" onClick={() => setIsOpen(false)}>
          About
        </Link>
        <Link href="/contact" className="hover:text-yellow-400 transition duration-300" onClick={() => setIsOpen(false)}>
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
