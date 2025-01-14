import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./AdminPage.css";

const AdminPage = () => {
  // جلب المنتجات والقسائم من API باستخدام hook مخصص
  const { data: products = [], loading: productsLoading, error: productsError, refetch: refetchProducts } = useFetch("https://api.example.com/products");
  const { data: coupons = [], loading: couponsLoading, error: couponsError, refetch: refetchCoupons } = useFetch("https://api.example.com/coupons");

  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "" });
  const [addError, setAddError] = useState(null);

  // دالة لإضافة منتج جديد
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setAddError(null);
      const response = await fetch("https://api.example.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      setNewProduct({ name: "", price: "", category: "" });
      refetchProducts(); // إعادة جلب المنتجات بعد إضافة منتج جديد
    } catch (error) {
      setAddError(error.message);
    }
  };

  // دالة لإضافة قسيمة جديدة
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      setAddError(null);
      const response = await fetch("https://api.example.com/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCoupon),
      });

      if (!response.ok) throw new Error("Failed to add coupon");

      setNewCoupon({ code: "", discount: "" });
      refetchCoupons(); // إعادة جلب القسائم بعد إضافة قسيمة جديدة
    } catch (error) {
      setAddError(error.message);
    }
  };

  // دالة لحذف منتج
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://api.example.com/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      refetchProducts(); // إعادة جلب البيانات بعد حذف منتج
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // دالة لحذف قسيمة
  const handleDeleteCoupon = async (id) => {
    try {
      const response = await fetch(`https://api.example.com/coupons/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete coupon");

      refetchCoupons(); // إعادة جلب البيانات بعد حذف قسيمة
    } catch (error) {
      console.error("Delete coupon error:", error);
    }
  };

  // إذا كانت البيانات في حالة تحميل أو كان هناك خطأ
  if (productsLoading || couponsLoading) return <p>Loading...</p>;
  if (productsError || couponsError) return <p>Error: {productsError || couponsError}</p>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* قسم إضافة منتج جديد */}
      <section className="add-product-section">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <button type="submit">Add Product</button>
        </form>
        {addError && <p className="error-message">{addError}</p>}
      </section>

      {/* قسم إضافة قسيمة جديدة */}
      <section className="add-coupon-section">
        <h2>Add New Coupon</h2>
        <form onSubmit={handleAddCoupon}>
          <input
            type="text"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            value={newCoupon.discount}
            onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
          />
          <button type="submit">Add Coupon</button>
        </form>
        {addError && <p className="error-message">{addError}</p>}
      </section>

      {/* قسم إدارة المنتجات */}
      <section className="manage-products-section">
        <h2>Manage Products</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5">No products available</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* قسم إدارة القسائم */}
      <section className="manage-coupons-section">
        <h2>Manage Coupons</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan="3">No coupons available</td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td>
                    <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
