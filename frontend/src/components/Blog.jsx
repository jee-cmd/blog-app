import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper'

const Blog = ({ data, onDelete, userId }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  // Check if current user owns this blog
  const isOwner = userId && data.user && userId.toString() === data.user.toString();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${data.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    fetch(api_base_url + "/deleteBlog", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId: data._id, token: localStorage.getItem("token") })
    }).then(res => res.json()).then(result => {
      if (result.success) {
        if (onDelete) onDelete();
      } else {
        alert(result.msg);
        setDeleting(false);
      }
    }).catch(() => setDeleting(false));
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/editBlog/${data._id}`);
  };

  return (
    <div
      onClick={() => navigate(`/blog/${data._id}`)}
      className={`blog ${deleting ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="blog-img-wrap">
        <img
          className='w-full h-full object-cover rounded-lg mb-2'
          src={`http://localhost:3000/uploads/${data.image}`}
          alt={data.title}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <h3 className="blog-title">{data.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.desc}</p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', marginTop: '8px' }}>{new Date(data.date).toDateString()}</p>

      {/* Action buttons — only visible to the blog owner */}
      {isOwner && (
        <div className="blog-actions" onClick={e => e.stopPropagation()}>
          <button
            id={`edit-btn-${data._id}`}
            className="blog-action-btn edit-btn"
            onClick={handleEdit}
            title="Edit blog"
          >
            ✏️ Edit
          </button>
          <button
            id={`delete-btn-${data._id}`}
            className="blog-action-btn delete-btn"
            onClick={handleDelete}
            title="Delete blog"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog