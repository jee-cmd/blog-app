import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import JoditEditor from 'jodit-react';
import { api_base_url } from '../helper';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const editor = useRef(null);
  const [content, setContent] = useState('');

  // Load existing blog data
  useEffect(() => {
    fetch(api_base_url + "/getBlog", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, token: localStorage.getItem("token") })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        // Ownership check — redirect if not the author
        const loggedInUserId = localStorage.getItem("userId") || (data.userId ? data.userId.toString() : null);
        if (loggedInUserId && data.blog.user && loggedInUserId.toString() !== data.blog.user.toString()) {
          alert("You are not authorized to edit this blog.");
          navigate(`/blog/${blogId}`);
          return;
        }
        setTitle(data.blog.title || "");
        setDesc(data.blog.desc || "");
        setContent(data.blog.content || "");
        setExistingImage(data.blog.image || "");
      } else {
        setError(data.msg);
      }
      setLoading(false);
    }).catch(() => {
      setError("Failed to load blog.");
      setLoading(false);
    });
  }, [blogId]);

  const submitForm = (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    let formData = new FormData();
    formData.append("blogId", blogId);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("token", localStorage.getItem("token"));
    if (image) formData.append("image", image);

    fetch(api_base_url + "/updateBlog", {
      mode: "cors",
      method: "POST",
      body: formData,
    }).then((res) => res.json()).then(data => {
      setSaving(false);
      if (data.success) {
        setSuccess("Blog updated successfully!");
        setTimeout(() => navigate(`/blog/${blogId}`), 1200);
      } else {
        setError(data.msg);
      }
    }).catch(() => {
      setSaving(false);
      setError("An error occurred. Please try again.");
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>Loading blog...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 100px 72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>Edit Blog</h1>
          <button
            type="button"
            onClick={() => navigate(`/blog/${blogId}`)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              padding: '6px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            ← Back
          </button>
        </div>

        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Title</label>
            <div className="inputBox">
              <input
                id="edit-title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Blog title"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Description</label>
            <div className="inputBox">
              <textarea
                id="edit-desc"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                placeholder="Short description"
                style={{ minHeight: '80px' }}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Content</label>
            <JoditEditor
              ref={editor}
              className='text-black mt-1'
              value={content}
              tabIndex={1}
              onChange={newContent => setContent(newContent)}
            />
          </div>

          {/* Cover image */}
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cover Image</label>
            {existingImage && !image && (
              <div style={{ marginBottom: '8px' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', marginBottom: '6px' }}>Current image:</p>
                <img
                  src={`http://localhost:3000/uploads/${existingImage}`}
                  alt="current"
                  style={{ height: '120px', borderRadius: '4px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}
            <input
              id="edit-image"
              type="file"
              accept="image/*"
              style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && <p style={{ fontSize: '12px', color: '#4ade80', marginTop: '6px' }}>New image selected: {image.name}</p>}
            {!image && existingImage && <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', marginTop: '6px' }}>Leave empty to keep current image.</p>}
          </div>

          {/* Feedback */}
          {error && <p style={{ color: '#f87171', fontSize: '13px' }}>{error}</p>}
          {success && <p style={{ color: '#4ade80', fontSize: '13px' }}>{success}</p>}

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              id="save-blog-btn"
              type="submit"
              disabled={saving}
              className="btnNormal"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/blog/${blogId}`)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                padding: '8px 18px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
