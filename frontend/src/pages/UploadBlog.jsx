import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import JoditEditor from 'jodit-react';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const UploadBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("token", localStorage.getItem("token"));
    if (image) formData.append("image", image);

    fetch(api_base_url + "/uploadBlog", {
      mode: "cors",
      method: "POST",
      body: formData,
    }).then((res) => res.json()).then(data => {
      setSaving(false);
      if (data.success) {
        setSuccess("Blog published successfully!");
        setTitle("");
        setDesc("");
        setContent("");
        setImage(null);
        setTimeout(() => navigate("/"), 1200);
      } else {
        setError(data.msg);
      }
    }).catch(() => {
      setSaving(false);
      setError("An error occurred. Please try again.");
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 100px 72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>Write a Blog</h1>
          <button
            type="button"
            onClick={() => navigate("/")}
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
                id="blog-title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter blog title"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Short Description</label>
            <div className="inputBox">
              <textarea
                id="blog-desc"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                placeholder="Enter a short description"
                required
              />
            </div>
          </div>

          {/* Content editor */}
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
            <input
              id="blog-image"
              type="file"
              accept="image/*"
              style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && <p style={{ fontSize: '12px', color: '#4ade80', marginTop: '6px' }}>Selected: {image.name}</p>}
          </div>

          {/* Feedback */}
          {error && <p style={{ color: '#f87171', fontSize: '13px' }}>{error}</p>}
          {success && <p style={{ color: '#4ade80', fontSize: '13px' }}>{success}</p>}

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              id="publish-blog-btn"
              type="submit"
              disabled={saving}
              className="btnNormal"
            >
              {saving ? 'Publishing...' : 'Publish Blog'}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
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

export default UploadBlog;