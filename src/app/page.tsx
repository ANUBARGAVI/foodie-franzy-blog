

"use client";
import { useEffect, useState } from "react";
import { FiX, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [postForm, setPostForm] = useState({ title: "", excerpt: "", content: "", image: "", views: 0 });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false); 
  const [postToDelete, setPostToDelete] = useState(null); 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data.reverse());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const openModal = (type, post = null) => {
    setIsModalOpen(true);
    setModalType(type);
    setSelectedPost(post);

    if (type === "edit" && post) {
      setPostForm({ title: post.title, excerpt: post.excerpt, content: post.content, image: post.image, views: post.views });
    } else {
      setPostForm({ title: "", excerpt: "", content: "", image: "", views: 0 });
    }
  };

  const handleInputChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalType === "edit") {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${selectedPost._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postForm),
        });

        if (res.ok) {
          const updatedPost = await res.json();
          setPosts(posts.map((p) => (p._id === selectedPost._id ? updatedPost : p)));
          closeModal();
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postForm),
        });

        if (res.ok) {
          const newPost = await res.json();
          setPosts([newPost, ...posts]);
          closeModal();
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const confirmDeletePost = (post) => {
    setPostToDelete(post);
    setDeleteConfirmModal(true);
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      try {
        await fetch(`http://localhost:5000/api/posts/${postToDelete._id}`, { method: "DELETE" });
        setPosts(posts.filter((post) => post._id !== postToDelete._id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
    setDeleteConfirmModal(false);
    setPostToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setSelectedPost(null);
  };

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      
      <div className="bg-indigo-600 text-white py-16 px-6 text-center rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Foodie Frenzy Blog</h1>
        <p className="text-lg mb-6">Share your favorite food experiences with the world!</p>
        <button onClick={() => openModal("create")} className="bg-yellow-500 text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-600">
          Create a New Post
        </button>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded-lg shadow-md relative">
            <img src={post.image || "/default.jpg"} alt={post.title} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-xl font-bold mt-2">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            <button onClick={() => openModal("read", post)} className="mt-2 text-indigo-600 underline">Read More</button>
            <div className="absolute top-2 right-2 flex gap-2">
  <FiEdit2 onClick={() => openModal("edit", post)} className="cursor-pointer text-blue-500 hover:text-blue-700" />
  <FiTrash2 onClick={() => confirmDeletePost(post)} className="cursor-pointer text-blue-500 hover:text-blue-700" />
</div>

          </div>
        ))}
      </div>

    
      {isModalOpen && (modalType === "create" || modalType === "edit") && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-2xl font-bold mb-4">{modalType === "edit" ? "Edit Post" : "Create a New Post"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={postForm.title} onChange={handleInputChange} placeholder="Title" className="w-full p-2 border rounded-md" />
              <input type="text" name="excerpt" value={postForm.excerpt} onChange={handleInputChange} placeholder="Excerpt" className="w-full p-2 border rounded-md" />
              <textarea name="content" value={postForm.content} onChange={handleInputChange} placeholder="Content" className="w-full p-2 border rounded-md"></textarea>
              <input type="text" name="image" value={postForm.image} onChange={handleInputChange} placeholder="Image URL" className="w-full p-2 border rounded-md" />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">{modalType === "edit" ? "Update" : "Create"}</button>
            </form>
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"><FiX size={20} /></button>
          </div>
        </div>
      )}

      
      {deleteConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg max-w-sm w-full relative text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={handleDeletePost} className="bg-white text-blue-600 px-4 py-2 rounded-md font-bold">Yes</button>
              <button onClick={() => setDeleteConfirmModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">No</button>
            </div>
          </div>
        </div>
      )}
        
{isModalOpen && modalType === "read" && selectedPost && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
      <button onClick={closeModal} className="absolute top-2 right-2 text-blue-600 hover:text-blue-800">
        <FiX size={24} />
      </button>
      <img src={selectedPost.image || "/default.jpg"} alt={selectedPost.title} className="w-full h-60 object-cover rounded-md" />
      <h2 className="text-2xl font-bold mt-4 text-gray-900">{selectedPost.title}</h2>
      <p className="text-gray-500 mt-2 italic">{selectedPost.excerpt}</p>
      <p className="text-gray-700 mt-4">{selectedPost.content}</p>
    </div>
  </div>

      )}
    </main>
  );
}
