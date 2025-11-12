import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories/${id}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Mahsulotlarni olishda xato:", err));
  }, [id]);

  return (
    <div className="container py-4">
      <h4 className="mb-3">Mahsulotlar</h4>
      <div className="row">
        {products.length === 0 ? (
          <p className="text-muted">Mahsulotlar topilmadi.</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="col-md-3 mb-4">
              <Link to={`/product/${p.id}`} className="text-decoration-none text-dark">
                <div className="card shadow-sm">
                  <img
                    src={`${import.meta.env.VITE_HOST}/uploads/products/${p.image}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="fw-bold">{p.name}</h6>
                    <p className="text-muted small">{p.price} so‘m</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
