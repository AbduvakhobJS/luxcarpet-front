import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="blog-page bg-light">
      {/* ===== HERO ===== */}
      <section
        className="text-center text-light d-flex align-items-center justify-content-center"
        style={{
          background: "url('/images/blog-bg.jpg') center/cover no-repeat",
          height: "400px",
          position: "relative",
        }}
      >
        <div
          className="overlay position-absolute w-100 h-100"
          style={{ background: "rgba(0,0,0,0.55)", top: 0, left: 0 }}
        ></div>
        <div className="position-relative">
          <h1 className="fw-bold text-uppercase" style={{ letterSpacing: "3px" }}>
            Blog va Yangiliklar
          </h1>
          <p className="mt-3 text-light fs-5">So‘nggi yangiliklar va foydali maslahatlar</p>
        </div>
      </section>

      {/* ===== BLOG LIST ===== */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center text-success mb-5 text-uppercase">
            So‘nggi Postlar
          </h2>
          <div className="row g-4">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="col-md-4">
                  <motion.div
                    className="card shadow-sm border-0 h-100 blog-card d-flex flex-column justify-content-center align-items-center text-center p-3"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedBlog(blog)}
                  >
                    <img
                      src={`${import.meta.env.VITE_HOST}${blog.image}`}
                      className="card-img-top mb-3"
                      alt={blog.title}
                    />
                    <h5 className="fw-bold text-success text-uppercase">{blog.title}</h5>
                    <p className="text-muted small">
                      {blog.content.length > 100
                        ? blog.content.substring(0, 100) + "..."
                        : blog.content}
                    </p>
                    <motion.button
                      className="btn btn-success mt-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Batafsil
                    </motion.button>
                  </motion.div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">Blog postlar yuklanmoqda...</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="modal show d-block"
            tabIndex="-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              className="modal-dialog modal-xl modal-dialog-centered"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content shadow-lg p-4 text-center">
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3"
                  onClick={() => setSelectedBlog(null)}
                ></button>
                <img
                  src={`${import.meta.env.VITE_HOST}${selectedBlog.image}`}
                  alt={selectedBlog.title}
                  className="img-fluid mb-4"
                  style={{ maxHeight: "60vh", objectFit: "contain", borderRadius: "8px" }}
                />
                <h2 className="fw-bold text-success mb-3 text-uppercase">
                  {selectedBlog.title}
                </h2>
                <p className="fs-5 text-secondary mx-auto" style={{ maxWidth: "800px" }}>
                  {selectedBlog.content}
                </p>
                <motion.button
                  className="btn btn-outline-success mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBlog(null)}
                >
                  Yopish
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .blog-card {
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 12px;
          background: #ffffff;
        }

        .card-img-top {
          height: 220px;
          width: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .card-img-top {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
}
