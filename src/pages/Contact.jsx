import React from "react";

export default function Contact() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2
          className="fw-bold text-center text-success mb-5 text-uppercase"
          style={{ letterSpacing: "2px" }}
        >
          Biz bilan bog‘laning
        </h2>

        <div className="row g-5 align-items-stretch">
          {/* === Chap: Kontakt ma'lumotlar === */}
          <div className="col-md-5">
            <div
              className="p-4 h-100 shadow-sm border-0"
              style={{ borderRadius: "0" }}
            >
              <h5 className="fw-bold text-uppercase mb-3 text-dark">
                Manzil
              </h5>
              <p className="text-muted mb-4">
                Toshkent shahri, Chilonzor tumani, Beruniy ko‘chasi, 12-uy
              </p>

              <h5 className="fw-bold text-uppercase mb-3 text-dark">
                Telefon
              </h5>
              <p className="text-muted mb-4">+998 90 123 45 67</p>

              <h5 className="fw-bold text-uppercase mb-3 text-dark">
                Email
              </h5>
              <p className="text-muted">info@gilamstore.uz</p>

              <div className="mt-4">
                <h6 className="fw-bold text-uppercase text-success mb-3">
                  Ish vaqti
                </h6>
                <p className="text-muted mb-1">Dushanba — Shanba: 9:00 — 20:00</p>
                <p className="text-muted">Yakshanba: yopiq</p>
              </div>
            </div>
          </div>

          {/* === O'ng: Aloqa formasi === */}
          <div className="col-md-7">
            <div
              className="p-4 shadow-sm border-0 bg-white h-100"
              style={{ borderRadius: "0" }}
            >
              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Ism Familiya</label>
                  <input
                    type="text"
                    className="form-control border-dark-subtle"
                    style={{ borderRadius: "0" }}
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Telefon raqam</label>
                  <input
                    type="tel"
                    className="form-control border-dark-subtle"
                    style={{ borderRadius: "0" }}
                    placeholder="+998 ..."
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Xabar</label>
                  <textarea
                    rows="4"
                    className="form-control border-dark-subtle"
                    style={{ borderRadius: "0", resize: "none" }}
                    placeholder="Xabaringizni yozing..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 text-uppercase fw-semibold"
                  style={{ borderRadius: "0" }}
                >
                  Yuborish
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* === MAP === */}
        <div className="mt-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.792915703569!2d69.20121859999999!3d41.3785837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d00225f582f%3A0xf61feefbb6a88e8c!2sLux%20Carpet%20Premium!5e0!3m2!1sru!2s!4v1761030874846!5m2!1sru!2s"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            style={{
              border: "0",
              filter: "grayscale(60%)",
            }}
          ></iframe>
        </div>
      </div>
      {/* === STYLE === */}
      <style jsx>{`
        form input:focus,
        form textarea:focus {
          border-color: #00b87c !important;
          box-shadow: 0 0 10px rgba(0, 184, 124, 0.2);
        }

        .btn-success:hover {
          background-color: #00d48f !important;
        }

        @media (max-width: 768px) {
          iframe {
            height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
