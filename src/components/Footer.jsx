import React from "react";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="text-light pt-5"
      style={{
        backgroundColor: "#ffffffff",
        borderTop: "4px solid #00b478",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* ===== LOGO & ABOUT ===== */}
          <div className="col-md-4 mb-4">
            <h3
              className="fw-bold text-uppercase"
              style={{ color: "#00b478", letterSpacing: "2px" }}
            >
              GILAMLAR.UZ
            </h3>
            <p className="mt-3 text-muted small">
              Sifatli gilamlar, zamonaviy dizaynlar va ishonchli xizmat.
              Biz bilan uylaringiz yanada chiroyli!
            </p>
          </div>

          {/* ===== LINKS ===== */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#00b478" }}>
              Sahifalar
            </h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">🏠 Bosh sahifa</a></li>
              <li><a href="/about" className="footer-link">👥 Biz haqimizda</a></li>
              <li><a href="/blog" className="footer-link">📰 Blog</a></li>
              <li><a href="/contact" className="footer-link">📞 Aloqa</a></li>
            </ul>
          </div>

          {/* ===== SOCIAL ===== */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-uppercase mb-3" style={{ color: "#00b478" }}>
              Biz bilan bog‘laning
            </h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a
                href="https://instagram.com/luxcarpet.uz"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://t.me/Lux_Carpet_Uz"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center py-3">
          <small className="text-muted">
            © {new Date().getFullYear()} Gilamlar.uz — Barcha huquqlar himoyalangan.
          </small>
        </div>
      </div>

      {/* ===== STYLE ===== */}
      <style jsx>{`
        .footer-link {
          color: #bbb;
          text-decoration: none;
          transition: 0.3s;
        }
        .footer-link:hover {
          color: #00b478;
        }

        .social-icon {
          color: #00b478;
          font-size: 1.5rem;
          transition: 0.3s;
        }
        .social-icon:hover {
          color: white;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          footer {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
