
import { FaBookOpen, FaBullseye } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen font-serif">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-indigo-600 flex items-center justify-center gap-2">
          <FaBookOpen /> About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed italic">
          Welcome to <span className="font-bold">Our Blog</span>, your go-to source for insightful articles, engaging stories, and fresh perspectives on various topics. 
          Whether you're here for inspiration, knowledge, or entertainment, we've got something for you!
        </p>

        <h2 className="text-3xl font-extrabold mt-8 mb-4 text-indigo-600 flex items-center justify-center gap-2">
          <FaBullseye /> Our Mission
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed italic">
          At <span className="font-bold">Our Blog</span>, we believe in sharing meaningful content that educates, inspires, and sparks conversations.
          Our goal is to create a space where readers can explore diverse topics and stay informed on the latest trends.
        </p>
      </div>
    </main>
  );
}
