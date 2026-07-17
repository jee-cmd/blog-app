import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { api_base_url } from '../helper'
import { useParams, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  let { blogId } = useParams();
  const navigate = useNavigate();

  const getBlog = () => {
    fetch(api_base_url + "/getBlog", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId: blogId, token: localStorage.getItem("token") })
    }).then(res => res.json()).then(res => {
      if (res.success) {
        setData(res.blog);
        if (res.userId) {
          setUserId(res.userId.toString());
          localStorage.setItem("userId", res.userId.toString());
        }
      } else {
        alert(res.msg);
      }
    });
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete "${data?.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    fetch(api_base_url + "/deleteBlog", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId: blogId, token: localStorage.getItem("token") })
    }).then(res => res.json()).then(result => {
      if (result.success) {
        navigate("/");
      } else {
        alert(result.msg);
        setDeleting(false);
      }
    }).catch(() => setDeleting(false));
  };

  useEffect(() => { getBlog(); }, []);

  // Check ownership
  const isOwner = userId && data?.user && userId.toString() === data.user.toString();

  return (
    <>
      <Navbar />
      <div style={{ padding: '48px 100px 72px' }}>
        {data ? (
          <>
            {/* Header row: title + action buttons (owner only) */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '700', lineHeight: 1.2, color: 'var(--text-primary)', flex: 1 }}>{data.title}</h1>
              {isOwner && (
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginTop: '4px' }}>
                  <button
                    id="edit-blog-btn"
                    onClick={() => navigate(`/editBlog/${blogId}`)}
                    className="btnNormal"
                    style={{ minWidth: 'auto', padding: '7px 16px', fontSize: '13px' }}
                  >
                    Edit
                  </button>
                  <button
                    id="delete-blog-btn"
                    onClick={handleDelete}
                    disabled={deleting}
                    style={{ minWidth: 'auto', padding: '7px 16px', fontSize: '13px', background: 'transparent', border: '1px solid var(--delete-border)', color: 'var(--delete-color)', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>

            {/* Meta */}
            <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', marginBottom: '32px' }}>Published: {new Date(data.date).toDateString()}</p>

            {/* Cover image + description */}
            <div style={{ display: 'flex', width: '100%', gap: '40px', marginBottom: '40px' }}>
              {data.image && (
                <div style={{ width: '40%', flexShrink: 0 }}>
                  <img
                    style={{ width: '100%', borderRadius: '4px', objectFit: 'cover', maxHeight: '300px', display: 'block' }}
                    src={`http://localhost:3000/uploads/${data.image}`}
                    alt={data.title}
                  />
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Description</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}>{data.desc}</p>
              </div>
            </div>

            {/* Rich content */}
            <div className="single-blog-content">
              {parse(data.content || '')}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '96px 0' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>Loading blog...</p>
          </div>
        )}
      </div>
    </>
  )
}

export default SingleBlog