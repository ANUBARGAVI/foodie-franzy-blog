import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white text-center py-6 mt-10 rounded-lg">
      <h2 className="text-lg font-semibold">Foodie Frenzy Blog</h2>
      <p className="text-sm mt-1">Bringing you the best food experiences and recipes.</p>

      
      <div className="flex justify-center gap-6 mt-4">
        <a href="#" className="hover:text-gray-300 flex items-center gap-2">
          <FaFacebookF /> Facebook
        </a>
        <a href="#" className="hover:text-gray-300 flex items-center gap-2">
          <FaTwitter /> Twitter
        </a>
        <a href="#" className="hover:text-gray-300 flex items-center gap-2">
          <FaInstagram /> Instagram
        </a>
      </div>

      <p className="text-sm mt-4">© {new Date().getFullYear()} Foodie Frenzy Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
