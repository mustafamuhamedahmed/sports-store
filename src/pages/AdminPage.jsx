import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./AdminPage.css";

const AdminPage = () => {
  // جلب المنتجات من API باستخدام hook مخصص
  const { data: products = [], loading, error, refetch } = useFetch("https://api.example.com/products");

  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });
  const [addError, setAddError] = useState(null);

  // دالة لإضافة منتج جديد
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setAddError(null); // إعادة تعيين الأخطاء السابقة
      const response = await fetch("https://api.example.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      // إعادة تعيين البيانات بعد إضافة المنتج
      setNewProduct({ name: "", price: "", category: "" });
      refetch(); // إعادة جلب المنتجات بعد إضافة منتج جديد
    } catch (error) {
      setAddError(error.message); // تخزين الخطأ إذا حدث
    }
  };

  // دالة لحذف منتج
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://api.example.com/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      refetch(); // إعادة جلب البيانات بعد حذف منتج
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // إذا كانت البيانات في حالة تحميل أو كان هناك خطأ
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // تحقق من أن البيانات ليست null أو undefined قبل استخدام map
  if (!Array.isArray(products)) {
    return <p>Products data is not available</p>;
  }

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
            {products && products.length === 0 ? (
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
    </div>
  );
};

export default AdminPage;
