import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const categoryId = query.get("categoryId");
  const designId = query.get("designId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/filter/products?categoryId=${categoryId}&designId=${designId}`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Productlarni olishda xato:", err);
      }
    };
    fetchProducts();
  }, [categoryId, designId]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5 text-success text-uppercase">
        Mahsulotlar
      </h2>

      {loading ? (
        <p className="text-center text-muted">Productlar yuklanmoqda...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">Bu category va design bo‘yicha productlar mavjud emas</p>
      ) : (
        <div className="row g-4">
          {products.map((prod) => (
            <div key={prod.id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 border-0 shadow-sm ">
                {prod.image && (
                  <img
                    src={`${import.meta.env.VITE_HOST}${prod.image[0]}`}
                    className="card-img-top"
                    alt={prod.name}
                   style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
                  />
                )}
                <div className="card-body text-center bg-white border-top">
                  <h5 className="fw-semibold text-uppercase">{prod.name}</h5>
                  <p className="text-muted mb-2">{prod.code}</p>
                  <p className="fw-bold text-success">{prod.price} UZS/m²</p>
                  <button onClick={() => navigate(`/products/${prod.id}`)} className="btn btn-success mt-3 ">Batafsil</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====== STYLE ====== */}
      <style jsx>{`
        .product-card img {
          transition: transform 0.3s ease;
        }
        .product-card:hover img {
          transform: scale(1.05);
        }
        .product-card button {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
