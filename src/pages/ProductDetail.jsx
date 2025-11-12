import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setMainImage(`${import.meta.env.VITE_HOST}${res.data.image}`);
        setLoading(false);
      } catch (err) {
        console.error("Productni olishda xato:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  if (loading) return <p className="text-center mt-5">Yuklanmoqda...</p>;
  if (!product)
    return <p className="text-center mt-5 text-danger">Product topilmadi</p>;

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        {/* ====== Product Image ====== */}
        {/* ===== Product Images Section ===== */}
            <div className="col-md-6 d-flex flex-column align-items-center">
            {/* Asosiy rasm */}
            <div className="border rounded shadow-sm p-2 mb-3" style={{ width: "100%", maxWidth: "500px" }}>
                <img
                src={`${import.meta.env.VITE_HOST}${product.image[0]}`}
                alt={product.name}
                className="img-fluid main-image"
                style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "500px" }}
                />
            </div>

            {/* Qo‘shimcha rasmlar */}
            <div className="d-flex gap-3 justify-content-center flex-wrap">
                {product.image.map((img, index) => (
                <img
                    key={index}
                    src={`${import.meta.env.VITE_HOST}${img}`}
                    alt={`${product.name} ${index + 2}`}
                    className="rounded shadow-sm extra-img"
                    style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    }}
                    onClick={(e) => {
                    // thumbnail bosilganda asosiy rasmni almashtiradi
                    e.target.closest(".col-md-6").querySelector(".main-image").src = `${import.meta.env.VITE_HOST}${img}`;
                    }}
                />
                ))}
            </div>
            </div>


        {/* ====== Product Info ====== */}
        <div className="col-md-6">
          <h2 className="fw-bold text-success text-uppercase">{product.name}</h2>
          <p className="text-muted mb-1">
            <strong>Kategoriya:</strong> {product.Category?.name}
          </p>
          <p className="text-muted mb-1">
            <strong>Dizayn:</strong> {product.Design?.name}
          </p>
          <p className="text-muted mb-1">
            <strong>Kod:</strong> {product.code}
          </p>
          <p className="text-muted mb-3">
            {product.description || "Bu product haqida ma'lumot mavjud emas."}
          </p>

          <h4 className="fw-semibold text-success mb-4">
            Narxi: {product.price} UZS / m²
          </h4>

          {/* ====== Sizes Checkboxes ====== */}
          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <label className="fw-semibold mb-2 d-block">
                Mavjud o‘lchamlar:
              </label>
              <div className="d-flex flex-column">
                {product.sizes.map((size, i) => (
                  <label
                    key={i}
                    className="d-flex align-items-center mb-2"
                    style={{ cursor: "pointer" }}
                  >
                    {size}
                  </label>
                ))}
              </div>
            </div>
          )}

          <Link
            to={`/order/${product.id}`}
            className="btn btn-success px-4 py-2 text-uppercase fw-semibold"
            disabled={selectedSizes.length === 0}
          >
            Buyurtma berish
          </Link>
        </div>
      </div>

      {/* ====== Minimal Style ====== */}
      <style jsx>{`
        img {
          transition: transform 0.3s ease;
        }
        img:hover {
          transform: scale(1.02);
        }
        .form-check-input {
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
