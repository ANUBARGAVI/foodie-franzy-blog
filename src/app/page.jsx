
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";


export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [postForm, setPostForm] = useState({ title: "", excerpt: "", image: "", content: "" });

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdatePost = () => {
    if (!postForm.title || !postForm.excerpt || !postForm.image || !postForm.content) {
      alert("Please fill in all fields!");
      return;
    }

    if (editingPost) {
      setPosts((prev) =>
        prev.map((post) => (post.id === editingPost.id ? { ...postForm, id: editingPost.id } : post))
      );
      setEditingPost(null);
    } else {
      const newPost = { ...postForm, id: Date.now() };
      setPosts((prev) => [newPost, ...prev]);
    }

    setPostForm({ title: "", excerpt: "", image: "", content: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <main className="p-4 bg-gray-100 min-h-screen relative">
    
      <div className="bg-indigo-600 text-white py-10 text-center rounded-lg mb-6 w-full max-w-6xl mx-auto">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
    Welcome To The Foodie Frenzy Blog
  </h1>
  <p className="mt-2 text-sm sm:text-base">
    Share your favorite food experiences and recipes!
  </p>
  <button
  onClick={() => setIsModalOpen(true)}
  className="mt-4 bg-white text-indigo-600 font-bold py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors duration-200"
>
  Create Post
</button>

</div>



<div className={`flex flex-col lg:flex-row gap-6 transition-opacity ${isModalOpen ? "opacity-50" : "opacity-100"}`}>
  <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {posts.map((post) => (
      <div
        key={post.id}
        className="bg-white p-4 rounded-lg shadow-md relative transition-all transform duration-500 hover:scale-105 hover:shadow-xl hover:translate-y-1"
      >
        <Image src={post.image} alt={post.title} width={600} height={400} className="rounded-md w-full h-40 object-cover" />
        <h2 className="text-xl font-bold mt-2">{post.title}</h2>
        <p className="text-gray-600">{post.excerpt}</p>
        <button
          onClick={() => setSelectedPost(post)}
          className="text-indigo-600 hover:text-yellow-500 mt-2 transition-colors duration-200"
        >
          Read More
        </button>

        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => {
              setEditingPost(post);
              setPostForm({ ...post });
              setIsModalOpen(true);
            }}
          >
            <FiEdit className="text-indigo-500 hover:text-yellow-500 transition-colors duration-200" />
          </button>

          <button onClick={() => setDeleteConfirm(post.id)}>
            <FiTrash2 className="text-indigo-500 hover:text-yellow-500 transition-colors duration-200" />
          </button>
        </div>
      </div>
    ))}
  </div>
  <Sidebar posts={posts} />
</div>

      
      {isModalOpen ? (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button className="absolute top-2 right-2" onClick={() => setIsModalOpen(false)}>
        <FiX />
      </button>
      <h2 className="text-xl font-bold mb-4">{editingPost ? "Edit Post" : "Create Post"}</h2>
      <input type="text" name="title" value={postForm.title} onChange={handleInputChange} placeholder="Title" className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" name="excerpt" value={postForm.excerpt} onChange={handleInputChange} placeholder="Excerpt" className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" name="image" value={postForm.image} onChange={handleInputChange} placeholder="Image URL" className="w-full p-2 border border-gray-300 rounded mb-2" />
      <textarea name="content" value={postForm.content} onChange={handleInputChange} placeholder="Content" className="w-full p-2 border border-gray-300 rounded mb-2" />
      <button onClick={handleCreateOrUpdatePost} className="w-full bg-indigo-600 text-white py-2 rounded">
        {editingPost ? "Update Post" : "Create Post"}
      </button>
    </div>
  </div>
) : null}


      
{selectedPost ? (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button className="absolute top-2 right-2" onClick={() => setSelectedPost(null)}>
        <FiX />
      </button>
      <Image src={selectedPost.image} alt={selectedPost.title} width={600} height={400} className="rounded-md w-full h-40 object-cover" />
      <h2 className="text-2xl font-bold mt-4">{selectedPost.title}</h2>
      <p className="text-gray-600 mt-2">{selectedPost.content}</p>
    </div>
  </div>
) : null}


      
{deleteConfirm ? (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete this post?</p>
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
) : null}

    </main>
  );
}



