import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // 🔍 URL dan ?q= so‘zni olish
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setQuery(q);
    if (q) fetchResults(q);
  }, [location.search]);

  // 🔧 Ma’lumotlarni serverdan olish
  const fetchResults = async (q) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products/search?q=${encodeURIComponent(q)}`
      );
      if (!res.ok) throw new Error("Server javob bermadi");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Qidiruv sahifasida xato:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">
        🔍 Qidiruv natijalari: <span className="text-success">"{query}"</span>
      </h4>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Yuklanmoqda...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-muted">Hech narsa topilmadi 😕</p>
      ) : (
        <div className="row g-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="col-6 col-md-4 col-lg-3"
              onClick={() => navigate(`/products/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 border-0 shadow-sm">
              <img
              src={`${import.meta.env.VITE_HOST}${Array.isArray(p.image) ? p.image[0] : p.image}`}
              className="card-img-top"
              alt={p.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
              />

                <div className="card-body text-center">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="text-success fw-semibold mb-1">
                    {p.price?.toLocaleString()} so‘m
                  </p>
                  {p.Category && (
                    <small className="text-muted d-block mb-2">
                      {p.Category.name} • {p.Design?.name}
                    </small>
                  )}
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // kartani bosganda ikki marta navigatsiya bo‘lmasin
                      navigate(`/products/${p.id}`);
                    }}
                  >
                    Ko‘rish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .card:hover {
          transform: translateY(-4px);
          transition: 0.2s;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }
        button.btn-outline-success:hover {
          background-color: #198754;
          color: white;
        }
      `}</style>
    </div>
  );
}
