import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [recProducts, setRecProducts] = useState([]);
  const navigate = useNavigate();

  // 🟢 Tavsiya qilingan productlarni olish
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recommendations`)
      .then((res) => res.json())
      .then((data) => {
        // Har bir tavsiya ichida product bo‘ladi
        const onlyProducts = data
          .filter((r) => r.Product)
          .map((r) => r.Product);
        setRecProducts(onlyProducts);
      })
      .catch(() => console.error("Rekomendatsiyalarni yuklashda xatolik!"));
  }, []);

  // 🟢 Kategoriyalarni olish
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => console.error("Kategoriya yuklashda xatolik!"));
  }, []);


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gruplarni yaratish: desktop 3 ta, mobile 1 ta
  const groupedProducts = recProducts.reduce((acc, _, i) => {
    const groupSize = isMobile ? 1 : 3;
    if (i % groupSize === 0) acc.push(recProducts.slice(i, i + groupSize));
    return acc;
  }, []);




  return (
    <div className="home-page bg-white text-dark">
      {/* ====== HERO CAROUSEL ====== */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          {[
            { img: "/images/carpet1.jpg", title: "Zamonaviy Gilamlar", desc: "Nafislik va sifat uyg‘unligi" },
            { img: "/images/carpet2.jpg", title: "Eron Gilamlar", desc: "Nafosatni qadrlovchilar uchun" },
            { img: "/images/carpet3.jpg", title: "Yevropa Sifati", desc: "Eng yangi dizaynlar va sifat" },
          ].map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={item.img} className="d-block w-100 hero-img" alt={item.title} />
              <div className="carousel-caption text-start">
                <h1 className="fw-bold text-light">{item.title}</h1>
                <p className="fs-5">{item.desc}</p>
                <a href="/shop" className="btn btn-success text-white border-0 px-4 py-2">
                  Ko‘rish
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== ABOUT ====== */}
      <section className="py-5 text-center border-top border-bottom">
        <div className="container">
          <h2 className="fw-bold text-uppercase text-success mb-3">Biz Haqimizda</h2>
          <p className="text-muted mx-auto w-75">
            Bizning maqsad — zamonaviy, sifatli va nafis gilamlarni sizning xonadoningizga olib kirish.
            Ishonchli ishlab chiqaruvchilar bilan hamkorlikda, sizga faqat eng yaxshi mahsulotlarni taklif qilamiz.
          </p>
          <a href="/about" className="btn btn-success fw-semibold px-4 py-2 text-uppercase">
            Batafsil
          </a>
        </div>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center text-success mb-5 text-uppercase">Kategoriyalar</h2>
          <div className="row g-4">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <a href={`/design/${cat.id}`} key={cat.id} className="col-md-4">
                  <div className="card h-100 border-0 shadow-lg hover-zoom">
                    <img
                      src={`${import.meta.env.VITE_HOST}${cat.image}`}
                      className="card-img-top img-fluid"
                      alt={cat.name}
                      style={{ height: "320px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center border-top bg-white">
                      <h5 className="fw-bold text-success text-uppercase">{cat.name}</h5>
                      <a href={`/design/${cat.id}`} className="btn btn-outline-success mt-3 text-uppercase fw-semibold">
                        Tanlash
                      </a>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-center text-muted">Kategoriyalar yuklanmoqda...</p>
            )}
          </div>
        </div>
      </section>

      {/* ====== BRAND SLIDER ====== */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container text-center">
          <h3 className="fw-bold text-success text-uppercase mb-4">Biz Ishlaydigan Brendlar</h3>
          <div className="brand-slider d-flex align-items-center overflow-hidden">
            <div className="brand-track d-flex">
              {["/images/brands/merinos.png", "/images/brands/sag.png", "/images/brands/urgaz.png", "/images/brands/balcarpet.svg"].map((brand, i) => (
                <div key={i} className="px-5">
                  <img src={brand} alt="brand" className="brand-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


 <section className="py-5 border-bottom">
      <div className="container">
        <h2 className="fw-bold text-center text-success mb-5 text-uppercase">
          Tavsiya Qilingan Mahsulotlar
        </h2>

        {recProducts.length > 0 ? (
          <div
            id="recCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="4000"
          >
            {/* Indicators */}
            <div className="carousel-indicators">
              {groupedProducts.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#recCarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                  aria-current={i === 0 ? "true" : "false"}
                  aria-label={`Slide ${i + 1}`}
                ></button>
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
              {groupedProducts.map((group, idx) => (
                <div
                  key={idx}
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                >
                  <div className="row justify-content-center g-3">
                    {group.map((rec) => (
                      <div key={rec.id} className="col-10 col-sm-8 col-md-4">
                        <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                          {rec.image && (
                            <img
                              src={`${import.meta.env.VITE_HOST}${rec.image[0]}`}
                              className="card-img-top"
                              alt={rec.name}
                              style={{ height: "230px", objectFit: "cover" }}
                            />
                          )}
                          <div className="card-body text-center bg-white">
                            <h6 className="fw-semibold text-uppercase text-dark">
                              {rec.name}
                            </h6>
                            <p className="text-muted small mb-2">{rec.code}</p>
                            <p className="fw-bold text-success mb-3">
                              {rec.price} UZS/m²
                            </p>
                            <button
                              onClick={() => navigate(`/products/${rec.id}`)}
                              className="btn btn-outline-success btn-sm px-4 rounded-pill"
                            >
                              Batafsil
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#recCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#recCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        ) : (
          <p className="text-center text-muted">
            Tavsiya qilingan mahsulotlar yo‘q...
          </p>
        )}
      </div>

      {/* Carousel CSS */}
      <style jsx>{`
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background-size: 60%;
        }

        .carousel-control-prev-icon:hover,
        .carousel-control-next-icon:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .carousel-indicators [data-bs-target] {
          background-color: #28a745;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 0.5;
        }

        .carousel-indicators .active {
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .card {
          transition: all 0.4s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>

      {/* ====== FAQ ====== */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center text-success mb-4 text-uppercase">Ko‘p So‘raladigan Savollar</h2>
          <div className="accordion w-75 mx-auto" id="faqAccordion">
            {[
              { q: "Buyurtma qanday beriladi?", a: "Tanlangan gilamni saytdan buyurtma qilishingiz yoki biz bilan bog‘lanishingiz mumkin." },
              { q: "Yetkazib berish mavjudmi?", a: "Toshkent bo‘ylab bepul yetkazib beramiz." },
              { q: "To‘lov usullari qanday?", a: "Naqd, karta yoki Click/Payme orqali to‘lov qilish mumkin." },
            ].map((item, i) => (
              <div className="accordion-item border-0 border-bottom" key={i}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${i !== 0 ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${i}`}
                  >
                    {item.q}
                  </button>
                </h2>
                <div id={`faq${i}`} className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`} data-bs-parent="#faqAccordion">
                  <div className="accordion-body">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section className="py-5 text-center bg-success text-white">
        <div className="container">
          <h2 className="fw-bold text-uppercase mb-3">Savolingiz Bormi?</h2>
          <p className="mb-4">Biz bilan bog‘laning — sizga yordam berishdan mamnunmiz!</p>
          <a href="/contact" className="btn btn-light fw-semibold px-4 py-2 text-success text-uppercase">
            Bog‘lanish
          </a>
        </div>
      </section>

      {/* ====== STYLES ====== */}
      <style jsx>{`
        .hover-zoom:hover {
          transform: translateY(-8px) scale(1.02);
          transition: all 0.4s ease;
          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3) !important;
        }
        .hero-img {
          height: 550px;
          object-fit: cover;
          filter: brightness(0.8);
        }
        .carousel-caption {
          bottom: 20%;
          background: rgba(0, 0, 0, 0.45);
          padding: 25px 40px;
        }
        .brand-track {
          animation: slide 18s linear infinite;
        }
        .brand-img {
          height: 100px;
          filter: grayscale(100%);
          opacity: 0.8;
          transition: all 0.3s;
        }
        .brand-img:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.05);
        }
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
