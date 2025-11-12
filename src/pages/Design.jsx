import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Design() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        // 🔹 Kategoriya nomini olish
        const catRes = await api.get(`/categories/${categoryId}`);
        setCategoryName(catRes.data.name);

        // 🔹 Shu kategoriyaga tegishli dizaynlarni olish
        const res = await api.get(`/filter/designs/${categoryId}`);

        if (res.data.type === "no_design") {
          // ❗ Agar Gazon yoki dizayn talab qilmaydigan kategoriya bo‘lsa
          navigate(`/products?categoryId=${categoryId}`);
          return;
        }

        if (res.data.type === "design_list") {
          setDesigns(res.data.designs);
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ Dizaynlarni olishda xato:", err);
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [categoryId, navigate]);

  // 🔹 Dizayn bosilganda shu dizayn bo‘yicha productlar sahifasiga o‘tamiz
  const handleDesignClick = (designId) => {
    navigate(`/products?categoryId=${categoryId}&designId=${designId}`);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5 text-success text-uppercase">
        {categoryName} dizaynlar
      </h2>

      {loading ? (
        <p className="text-center text-muted">Designlar yuklanmoqda...</p>
      ) : designs.length === 0 ? (
        <p className="text-center text-muted">
          Bu kategoriyada designlar mavjud emas
        </p>
      ) : (
        <div className="row g-4">
          {designs.map((design) => (
            <div key={design.id} className="col-md-4 col-sm-6">
              <div
                className="card h-100 border-0 shadow-sm design-card"
                onClick={() => handleDesignClick(design.id)}
                style={{ cursor: "pointer", borderRadius: "0.75rem" }}
              >
                {design.image && (
                  <img
                    src={`${import.meta.env.VITE_HOST}${design.image}`}
                    className="card-img-top"
                    alt={design.name}
                    style={{
                      height: 380,
                      objectFit: "cover",
                      borderTopLeftRadius: "0.75rem",
                      borderTopRightRadius: "0.75rem",
                    }}
                  />
                )}
                <div className="card-body text-center bg-white border-top">
                  <h5 className="fw-semibold text-uppercase">{design.name}</h5>
                  <button
                    className="btn btn-outline-success mt-3 fw-semibold text-uppercase"
                    onClick={() => handleDesignClick(design.id)}
                  >
                    Tanlash
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== STYLE ===== */}
      <style jsx>{`
        .design-card img {
          transition: transform 0.3s ease;
        }
        .design-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
