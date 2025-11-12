import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/orderSuccess.css"; // animatsiya CSS

export default function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [name, setName] = useState("");
  const [surename, setSurename] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); 
  // null = yo‘q, "loading" = bajarilmoqda, "success" = bajarildi, "error" = xato

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Mahsulotni olishda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!name || !surename || !phone || !selectedSize) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      setStatus("loading"); // 🔹 bosilganda — loading holati
      const payload = { name, surename, phone, selectedSize, productId: id };
      await api.post("/orders", payload);

      setStatus("success"); // 🔹 muvaffaqiyatli
      setTimeout(() => navigate("/"), 2500); // 🔹 2.5s dan keyin bosh sahifaga
    } catch (err) {
      console.error("Buyurtma xatosi:", err);
      setStatus("error"); // 🔹 xato holat
      setTimeout(() => setStatus(null), 2500); // 🔹 2.5s dan so‘ng qayta urinish uchun holatni tozalaymiz
    }
  };

  if (loading) return <p className="text-center mt-5">Yuklanmoqda...</p>;
  if (!product) return <p className="text-center text-danger mt-5">Mahsulot topilmadi</p>;

  return (
    <div className="container py-5">
      {/* 🔹 1) Buyurtma holatini ko‘rsatuvchi overlay */}
      {status && (
        <div className="success-overlay">
          <div className="checkmark-container">
            {status === "loading" && (
              <>
                <div className="circle-loader"></div>
                <p className="text-dark fw-semibold mt-3 fs-5">
                  Buyurtma bajarilmoqda...
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="circle-loader complete">
                  <div className="checkmark draw"></div>
                </div>
                <p className="text-success fw-bold mt-3 fs-4">
                  Buyurtma bajarildi!
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="circle-loader error">
                  <div className="crossmark"></div>
                </div>
                <p className="text-danger fw-bold mt-3 fs-5">
                  Xatolik! Qaytadan urinib ko‘ring.
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {/* 🔹 Yuqoridagi bo‘lim — animatsiya qismi */}

      <div className="row g-5 align-items-start">
        <div className="col-lg-6">
          <div className="border rounded p-3">
            <img
              src={`${import.meta.env.VITE_HOST}${product.image[0]}`}
              alt={product.name}
              className="img-fluid rounded"
            />
            <h3 className="mt-3">{product.name}</h3>
            <p className="text-muted">Kod: {product.code}</p>
            <p className="fw-semibold">Narxi: {product.price} UZS / m²</p>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-4 border-0 shadow-sm">
            <h4 className="mb-3 fw-bold">Buyurtma berish</h4>

            <form onSubmit={handleOrder}>
              <div className="mb-3">
                <label className="form-label">Ism</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Familiya</label>
                <input
                  type="text"
                  className="form-control"
                  value={surename}
                  onChange={(e) => setSurename(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Telefon</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">O‘lcham tanlang</label>
                <div className="d-flex flex-column">
                  {product.sizes?.length ? (
                    product.sizes.map((s, idx) => (
                      <label key={idx} className="mb-2">
                        <input
                          type="radio"
                          name="size"
                          value={s}
                          checked={selectedSize === s}
                          onChange={() => setSelectedSize(s)}
                          className="me-2"
                        />
                        {s}
                      </label>
                    ))
                  ) : (
                    <p className="text-muted">O‘lcham mavjud emas</p>
                  )}
                </div>
              </div>

              {selectedSize && product?.price && (
                <p className="fw-semibold text-success">
                  {(() => {
                    const [w, h] = selectedSize.split("x").map(Number);
                    const widthM = w / 100;
                    const heightM = h / 100;
                    const price = Number(product.price);
                    const total = widthM * heightM * price;
                    return `Jami: ${total.toLocaleString("uz-UZ")} UZS`;
                  })()}
                </p>
              )}

              <button type="submit" className="btn btn-success w-100" disabled={status === "loading"}>
                {status === "loading" ? "Yuborilmoqda..." : "Buyurtma berish"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
