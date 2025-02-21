import { FaFire, FaRegComments, FaThumbsUp, FaHeart, FaHandsClapping } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa"; 
import { MdTrendingUp } from "react-icons/md";

export default function Sidebar({ posts }) {
  const popularPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 6);

  const reactions = [
    { id: 1, postId: 1, icon: <FaSmile className="text-yellow-400 text-2xl" />, count: 120 },
    { id: 2, postId: 2, icon: <FaThumbsUp className="text-blue-500 text-2xl" />, count: 95 },
    { id: 3, postId: 3, icon: <FaHeart className="text-red-500 text-2xl" />, count: 150 },
    { id: 4, postId: 4, icon: <FaFire className="text-orange-500 text-2xl" />, count: 85 },
    { id: 5, postId: 5, icon: <FaHandsClapping className="text-green-500 text-2xl" />, count: 60 }
  ];

  const comments = [
    { id: 1, postId: 1, user: "Alice", comment: "Great post!", time: "2 hours ago" },
    { id: 2, postId: 2, user: "Bob", comment: "Very informative.", time: "1 day ago" },
    { id: 3, postId: 3, user: "Charlie", comment: "Thanks for sharing!", time: "3 days ago" },
    { id: 4, postId: 4, user: "Diana", comment: "Helpful tips.", time: "4 days ago" },
    { id: 5, postId: 5, user: "Eve", comment: "Loved it!", time: "5 days ago" }
  ];

  return (
    <aside className="w-full lg:w-1/4 space-y-8 p-4 lg:p-0">
    
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 flex items-center space-x-2">
          <MdTrendingUp className="text-yellow-400 text-3xl" /> <span>Popular Posts</span>
        </h2>
        <ul>
          {popularPosts.map((post) => (
            <li key={post.id} className="mb-4 border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.views} views</p>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center space-x-2">
          <FaFire className="text-orange-500 text-3xl" /> <span>People Reactions</span>
        </h2>
        <ul>
          {reactions.map((reaction) => (
            <li key={reaction.id} className="mb-4 flex items-center space-x-3 text-lg font-medium text-gray-800">
              <span>{reaction.icon}</span>
              <span>{reaction.count}</span>
              <span className="text-gray-600">reactions</span>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center space-x-2">
          <FaRegComments className="text-blue-500 text-3xl" /> <span>Comments on Posts</span>
        </h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-4">
              <p className="text-gray-800 font-semibold">{comment.user}</p>
              <p className="text-gray-600 text-sm">{comment.comment}</p>
              <span className="text-gray-400 text-xs">{comment.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
