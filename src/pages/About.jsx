import React from "react";

export default function About() {
  return (
    <div className="about-page bg-white">
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section text-center text-light d-flex align-items-center justify-content-center"
        style={{
          background: "url('/images/about-carpet.jpg') center/cover no-repeat",
          height: "400px",
          position: "relative",
        }}
      >
        <div
          className="overlay position-absolute w-100 h-100"
          style={{ background: "rgba(0,0,0,0.55)", top: 0, left: 0 }}
        ></div>
        <div className="content position-relative">
          <h1 className="fw-bold text-uppercase" style={{ letterSpacing: "3px" }}>
            Biz Haqimizda
          </h1>
          <p className="mt-3 text-light">
            Sifat, nafislik va zamonaviylik — bizning asosiy qadriyatimiz
          </p>
        </div>
      </section>

      {/* ===== COMPANY INFO ===== */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-success text-uppercase mb-4">
            Biz Kim Miz?
          </h2>
          <p className="text-muted w-75 mx-auto mb-5">
            Biz — O‘zbekistonning yetakchi gilam do‘konlaridan birimiz. Har bir
            gilamimiz o‘zida nafislik va sifat uyg‘unligini aks ettiradi. Eron,
            Turkiya va Yevropa ishlab chiqaruvchilari bilan hamkorlikda, biz
            mijozlarimizga zamonaviy va klassik dizaynlarni taklif qilamiz.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="p-4 shadow-sm h-100 border-0"
                style={{ borderRadius: "0" }}
              >
                <h5 className="fw-bold text-dark text-uppercase mb-3">
                  Sifat Kafolati
                </h5>
                <p className="text-muted">
                  Har bir gilam sertifikatlangan va uzoq muddat xizmat qilish
                  uchun mo‘ljallangan.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-4 shadow-sm h-100 border-0"
                style={{ borderRadius: "0" }}
              >
                <h5 className="fw-bold text-dark text-uppercase mb-3">
                  Zamonaviy Dizayn
                </h5>
                <p className="text-muted">
                  Dunyo dizayn trendlariga mos yangi kolleksiyalar har oyda
                  yangilanadi.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-4 shadow-sm h-100 border-0"
                style={{ borderRadius: "0" }}
              >
                <h5 className="fw-bold text-dark text-uppercase mb-3">
                  Mijozga E’tibor
                </h5>
                <p className="text-muted">
                  Har bir mijoz uchun individual yondashuv — bizning faxrimiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-success text-uppercase mb-4">
            Bizning Jamoa
          </h2>
          <div className="row g-4">
            {[
              { img: "/images/team1.jpg", name: "Dilshod Karimov", role: "Direktor" },
              { img: "/images/team2.jpg", name: "Malika Abdullayeva", role: "Marketing rahbari" },
              { img: "/images/team3.jpg", name: "Azizbek Qodirov", role: "Dizayner" },
            ].map((member, i) => (
              <div key={i} className="col-md-4">
                <div className="card border-0 shadow-sm" style={{ borderRadius: "0" }}>
                  <img
                    src={member.img}
                    className="card-img-top"
                    alt={member.name}
                    style={{
                      height: "320px",
                      objectFit: "cover",
                      borderRadius: "0",
                    }}
                  />
                  <div className="card-body bg-white text-center border-top">
                    <h5 className="fw-bold text-uppercase mb-1">
                      {member.name}
                    </h5>
                    <p className="text-muted">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STYLE ===== */}
      <style jsx>{`
        .hero-section h1 {
          font-size: 3rem;
        }

        .shadow-sm:hover {
          box-shadow: 0 0 20px rgba(0, 184, 124, 0.25) !important;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .hero-section {
            height: 300px !important;
          }
          .hero-section h1 {
            font-size: 2rem;
          }
          .hero-section p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
