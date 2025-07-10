import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext/AuthCotext';

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const bgRef = useRef(null);
  const particlesRef = useRef([]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/blogs/${id}`);
      if (!res.ok) throw new Error('Failed to fetch blog');
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      Swal.fire({ icon: 'error', title: err.message });
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/comments?blogId=${id}`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      Swal.fire({ icon: 'error', title: err.message });
    }
    setCommentsLoading(false);
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  useEffect(() => {
    const particleCount = 40;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        color: `hsla(${Math.random() * 60 + 200}, 80%, 70%, ${Math.random() * 0.4 + 0.2})`
      });
    }

    particlesRef.current = particles;

    let animationFrameId;

    const animate = () => {
      const container = bgRef.current;
      if (!container) return;

      const canvas = document.createElement('div');
      canvas.className = 'particles-canvas';

      particlesRef.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > window.innerWidth) p.x = 0;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.y > window.innerHeight) p.y = 0;
        if (p.y < 0) p.y = window.innerHeight;

        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.left = `${p.x}px`;
        dot.style.top = `${p.y}px`;
        dot.style.width = `${p.size}px`;
        dot.style.height = `${p.size}px`;
        dot.style.backgroundColor = p.color;
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '0';
        dot.style.opacity = '0.8';
        dot.style.filter = 'blur(1px)';
        canvas.appendChild(dot);
      });

      const oldCanvas = container.querySelector('.particles-canvas');
      if (oldCanvas) container.removeChild(oldCanvas);
      container.appendChild(canvas);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      bgRef.current?.style.setProperty('--mouse-x', `${x}%`);
      bgRef.current?.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      Swal.fire({ icon: 'warning', title: 'Please log in to comment' });
      return;
    }
    if (!commentText.trim()) return;

    const newComment = {
      blogId: id,
      userName: user.displayName || user.email,
      userProfilePic: user.photoURL || '',
      userEmail: user.email,
      comment: commentText.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      });

      if (!res.ok) throw new Error('Failed to post comment');

      setCommentText('');
      fetchComments();
      Swal.fire({ icon: 'success', title: 'Comment added!' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: err.message });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog details...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  const isOwner = user?.email === blog.email;

  return (
    <div
      ref={bgRef}
      className="min-h-screen p-4 flex flex-col items-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(179, 136, 255, 0.2) 0%,
            rgba(157, 178, 255, 0.15) 30%,
            rgba(137, 219, 255, 0.1) 60%,
            rgba(255, 255, 255, 0.05) 100%
          ),
          linear-gradient(
            135deg,
            #f5f7fa 0%,
            #c3cfe2 100%
          )
        `,
        transition: 'background 0.3s ease-out'
      }}
    >
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-md p-6 shadow-lg space-y-8 relative z-10">
        <div>
          <h1 className="text-4xl font-bold text-blue-800 mb-3">{blog.title}</h1>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-96 object-cover rounded-md mb-4"
          />
          <p className="text-gray-700 mb-2"><strong>Category:</strong> {blog.category}</p>
          <p className="text-gray-700 mb-4">{blog.longDesc}</p>
          <p className="text-sm text-gray-500 mb-4">Written by: {blog.email}</p>
          {isOwner && (
            <button
              onClick={() => navigate(`/blogs/update/${blog._id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update Blog
            </button>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {isOwner ? (
            <p className="italic text-red-600 mb-4">You cannot comment on your own blog.</p>
          ) : (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                placeholder="Write your comment here..."
                className="w-full border border-gray-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="mt-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Submit Comment
              </button>
            </form>
          )}

          {commentsLoading ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c._id} className="flex items-start space-x-4 border-b border-gray-200 pb-4">
                  <img
                    src={c.userProfilePic || 'https://via.placeholder.com/50'}
                    alt={c.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{c.userName}</p>
                    <p className="text-gray-700">{c.comment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style>{`
        .particles-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;
