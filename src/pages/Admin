import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./Admin.css";  

const Admin = () => {
  // جلب المنتجات من API باستخدام hook مخصص
  const { data: products = [], loading, error, refetch } = useFetch("https://api.example.com/products");

  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", description: "" }); // إضافة description
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  // دالة للتحقق من صحة البيانات المدخلة
  const validateProduct = () => {
    const { name, price, category, description } = newProduct;
    if (!name || !price || !category || !description) {  // تحقق من جميع الحقول بما في ذلك description
      return "All fields are required!";
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      return "Price must be a positive number!";
    }
    return null;
  };

  // دالة لإضافة منتج جديد
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const validationError = validateProduct();
    if (validationError) {
      setAddError(validationError);
      return;
    }
    
    try {
      setAddError(null); // إعادة تعيين الأخطاء السابقة
      setAddSuccess(null); // إعادة تعيين رسالة النجاح السابقة

      const response = await fetch("https://api.example.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      // إعادة تعيين البيانات بعد إضافة المنتج
      setNewProduct({ name: "", price: "", category: "", description: "" });
      setAddSuccess("Product added successfully!");
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
    <div className="admin">
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
          <textarea
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button type="submit">Add Product</button>
        </form>
        {addError && <p className="error-message">{addError}</p>}
        {addSuccess && <p className="success-message">{addSuccess}</p>}
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
              <th>Description</th> {/* إضافة عمود جديد للوصف */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length === 0 ? (
              <tr>
                <td colSpan="6">No products available</td> {/* تعديل الخلية لتشمل عمود الوصف */}
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td> {/* عرض الوصف */}
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

export default Admin;
