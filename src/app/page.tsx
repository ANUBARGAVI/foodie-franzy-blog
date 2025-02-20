
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isNewPost, setIsNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", image: "", content: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleDelete = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    alert("Post deleted successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleCreateOrUpdatePost = () => {
    if (!newPost.title || !newPost.excerpt || !newPost.image || !newPost.content) {
      alert("Please fill in all fields!");
      return;
    }

    if (editingPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id ? { ...newPost, id: editingPost.id } : post
        )
      );
      alert("Post updated successfully!");
      setEditingPost(null);
    } else {
      const newBlogPost = { ...newPost, id: Date.now() };
      setPosts((prevPosts) => [newBlogPost, ...prevPosts]);
      alert("New post created successfully!");
    }

    setNewPost({ title: "", excerpt: "", image: "", content: "" });
    setIsNewPost(false);
  };

  const handleEdit = (post) => {
    setNewPost(post);
    setEditingPost(post);
    setIsNewPost(true);
  };

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl text-center font-extrabold mb-6 text-indigo-600">
        Welcome to the Blog
      </h1>

      <div className="text-center mb-6">
        <button
          onClick={() => {
            setIsNewPost(true);
            setEditingPost(null);
            setNewPost({ title: "", excerpt: "", image: "", content: "" });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {editingPost ? "Edit Post" : "Create New Post"}
        </button>
      </div>

      {isNewPost && (
        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              {editingPost ? "Edit Post" : "Create Post"}
            </h2>
            <label className="block mb-2">
              Title:
              <input type="text" name="title" value={newPost.title} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </label>
            <label className="block mb-2">
              Excerpt:
              <input type="text" name="excerpt" value={newPost.excerpt} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </label>
            <label className="block mb-2">
              Image URL:
              <input type="text" name="image" value={newPost.image} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </label>
            <label className="block mb-2">
              Content:
              <textarea name="content" value={newPost.content} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </label>
            <div className="flex justify-between mt-4">
              <button onClick={handleCreateOrUpdatePost} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                {editingPost ? "Update" : "Submit"}
              </button>
              <button onClick={() => setIsNewPost(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md relative"
            >
              {post.image && <Image src={post.image} alt={post.title} width={600} height={400} className="rounded-md w-full h-40 object-cover" />}
              <h2 className="text-xl font-bold mt-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
              <button onClick={() => setSelectedPost(post)} className="text-indigo-600 font-semibold mt-2 inline-block">
                Read More
              </button>
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(post)}>
                  <FiEdit className="w-5 h-5 text-gray-600 hover:text-indigo-600 cursor-pointer" />
                </button>
                <button onClick={() => handleDelete(post.id)}>
                  <FiTrash2 className="w-5 h-5 text-gray-600 hover:text-red-600 cursor-pointer" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <Sidebar posts={posts} />
      </div>

      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <Image src={selectedPost.image} alt={selectedPost.title} width={600} height={400} className="rounded-md w-full" />
            <h2 className="text-2xl font-bold mt-2 text-indigo-600">{selectedPost.title}</h2>
            <p className="text-gray-600 mt-2">{selectedPost.excerpt}</p>
            <p className="text-gray-600 mt-2">{selectedPost.content}</p>
            <button onClick={() => setSelectedPost(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
