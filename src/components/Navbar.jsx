import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🔥 qo‘shildi
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar() {
  const navigate = useNavigate(); // 🔥 yo‘naltirish uchun
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  // 🔍 Qidiruv uchun state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🟢 Kategoriyalarni olish
  useEffect(() => {
    let mounted = true;
    const fetchCats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        if (!res.ok) throw new Error("Server javob bermadi");
        const data = await res.json();
        if (mounted) setCategories(data);
      } catch (err) {
        console.error("Kategoriya olishda xatolik:", err);
        if (mounted) setCategories([]);
      } finally {
        if (mounted) setLoadingCats(false);
      }
    };
    fetchCats();
    return () => (mounted = false);
  }, []);

  // 🔍 Jonli qidiruv
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        try {
          setSearchLoading(true);
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/products/search?q=${encodeURIComponent(searchTerm)}`
          );
          if (!res.ok) throw new Error("Qidiruvda xatolik");
          const data = await res.json();

          const normalized = data.map((item) => ({
            id: item.id,
            name:
              item.name ||
              item.product_name ||
              item.title ||
              item.collection_name ||
              "Noma'lum mahsulot",
            image: Array.isArray(item.image)
              ? item.image[0].replace("/uploads/products/", "")
              : item.image || "no-image.png",
          }));

          const uniqueById = normalized.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
          );

          const sorted = uniqueById.sort((a, b) =>
            a.name.localeCompare(b.name, "en", { sensitivity: "base" })
          );

          const filtered = sorted.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setSearchResults(filtered);
          setShowDropdown(true);
        } catch (err) {
          console.error("Qidiruv xatolik:", err);
          setSearchResults([]);
          setShowDropdown(false);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // 🟢 Natija tanlanganda
  const handleSelect = (product) => {
    navigate(`/products/${product.id}`);
    setSearchTerm("");
    setShowDropdown(false);
  };

  // 🟢 Enter yoki 🔍 bosilganda
  const handleSearchSubmit = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    // 🔥 Maxsus kalit so‘zlar uchun to‘g‘ridan sahifaga o‘tkazish
    if (term.includes("gilam")) {
      navigate("/category/gilam");
    } else if (term.includes("kovra")) {
      navigate("/category/kovra");
    } else if (term.includes("hi-tech") || term.includes("hitech")) {
      navigate("/design/hi-tech");
    } else {
      // Umumiy qidiruv natija sahifasi
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }

    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          {/* LOGO */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/images/luxcarpet.png"
              alt="GILAMLAR.UZ Logo"
              style={{ width: 100, height: 70, objectFit: "contain", marginRight: 10 }}
            />
          </a>

          {/* TOGGLER */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span style={{ fontSize: 20, fontWeight: 700 }}>≡</span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link px-3" to={"/"}>Bosh sahifa</Link>
              </li>

              {/* KATEGORIYALAR */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle px-3"
                  href="#"
                  id="categoriesDropdown"
                  data-bs-toggle="dropdown"
                >
                  Katalog
                </a>
                <ul className="dropdown-menu" style={{ minWidth: 220 }}>
                  {loadingCats ? (
                    <li className="dropdown-item text-muted">Yuklanmoqda...</li>
                  ) : categories.length === 0 ? (
                    <li className="dropdown-item text-muted">Kategoriya mavjud emas</li>
                  ) : (
                    categories.map((c) => (
                      <li key={c.id}>
                        <Link className="dropdown-item" to={`/design/${c.id}`}>
                          {c.name}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link px-3" to={"/blog"}>Blog</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link px-3" to={"/about"}>Biz haqimizda</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link px-3" to={"/contact"}>Kontakt</Link>
              </li>

              {/* 🔍 QIDIRUV */}
              <li className="nav-item ms-2 position-relative">
                <div className="d-flex position-relative">
                  <input
                    className="form-control form-control-sm"
                    type="search"
                    placeholder="Mahsulot qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                    style={{ borderRadius: 0, width: 220 }}
                    onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    type="button"
                    style={{ borderRadius: 0 }}
                    onClick={handleSearchSubmit} // 🔥 shu joy o‘zgardi
                  >
                    🔍
                  </button>

                  {/* Dropdown natijalar */}
                  {showDropdown && (
                    <ul
                      className="list-group position-absolute bg-white shadow"
                      style={{
                        top: "100%",
                        left: 0,
                        width: "100%",
                        zIndex: 1000,
                        borderRadius: 0,
                        maxHeight: 250,
                        overflowY: "auto",
                      }}
                    >
                      {searchLoading ? (
                        <li className="list-group-item text-muted">Yuklanmoqda...</li>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((p) => (
                          <li
                            key={p.id}
                            className="list-group-item d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelect(p)}
                          >
                            <img
                              src={`${import.meta.env.VITE_HOST}/uploads/products/${p.image}`}
                              alt={p.name}
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                                marginRight: 8,
                                borderRadius: 4,
                              }}
                            />
                            {p.name}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">
                          Hech narsa topilmadi
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        :root { --accent: #00c08a; }
        .navbar { box-shadow: 0 6px 18px rgba(11,18,32,0.04); }
        .navbar .nav-link { color: #0b1220; }
        .navbar .nav-link:hover { color: var(--accent); }
        .dropdown-item:hover { background: rgba(0,192,138,0.08); color: var(--accent); }
      `}</style>
    </>
  );
}
