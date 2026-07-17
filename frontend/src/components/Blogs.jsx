import React, { useEffect, useState, useCallback } from 'react'
import Blog from './Blog'
import { api_base_url } from '../helper'

const Blogs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const getBlogs = useCallback(() => {
    setLoading(true);
    fetch(api_base_url + "/getBlogs", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("token") })
    }).then((res) => res.json()).then((data) => {
      setLoading(false);
      if (data.success) {
        setData(data.blogs);
        if (data.userId) {
          setUserId(data.userId.toString());
          localStorage.setItem("userId", data.userId.toString());
        }
      } else {
        alert(data.msg);
      }
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <>
      <div style={{ padding: '48px 100px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Latest</p>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>All Blogs</h2>
          </div>
          <a href="/uploadBlog" className="btnNormal" style={{ textDecoration: 'none', fontSize: '13px' }}>+ New Blog</a>
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>Loading blogs...</p>
          </div>
        )}

        {!loading && (
          <div className="blogsCon">
            {data && data.length > 0
              ? data.map((item) => (
                  <Blog key={item._id} data={item} onDelete={getBlogs} userId={userId} />
                ))
              : <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', gridColumn: '1 / -1', padding: '40px 0', textAlign: 'center' }}>No blogs found. Be the first to write one!</p>
            }
          </div>
        )}
      </div>
    </>
  )
}

export default Blogs