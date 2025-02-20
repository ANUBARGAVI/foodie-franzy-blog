import Link from "next/link";
import { FaBlog } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-indigo-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      
        <div className="flex items-center space-x-2">
          <FaBlog className="text-2xl text-yellow-400" /> 
          <h1 className="text-xl font-bold">Foodie Frenzy</h1>
        </div>

        <div className="space-x-6">
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
      </div>
    </nav>
  );
}
