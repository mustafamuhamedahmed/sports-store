import React, { useState, useEffect } from "react";
import "../styles/Admin.css"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    availableQuantity: "",
    image: null,
  });
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [addSuccess, setAddSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  const validateProduct = () => {
    const { id, name, price, category, description, availableQuantity, image } = newProduct;
    let newErrors = {};

    if (!id) newErrors.id = "ID is required!";
    if (!name) newErrors.name = "Name is required!";
    if (!price || isNaN(price) || parseFloat(price) <= 0) newErrors.price = "Price must be a positive number!";
    if (!category) newErrors.category = "Category is required!";
    if (!description) newErrors.description = "Description is required!";
    if (!availableQuantity || isNaN(availableQuantity) || parseInt(availableQuantity) <= 0) newErrors.availableQuantity = "Available quantity must be a positive integer!";
    if (!image) newErrors.image = "Image is required!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!validateProduct()) return;

    setLoading(true);
    try {
      setErrors({});
      setAddSuccess(null);

      const formData = new FormData();
      formData.append("id", newProduct.id);
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      formData.append("availableQuantity", newProduct.availableQuantity);
      formData.append("image", newProduct.image);

      const response = await fetch("http://localhost:8080/api/admin/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProducts((prevProducts) => [...prevProducts, data]);
        toast.success("Product added successfully!");
        setNewProduct({
          id: "",
          name: "",
          price: "",
          category: "",
          description: "",
          availableQuantity: "",
          image: null,
        });
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Failed to add product", error);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product, image: null });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!validateProduct()) return;

    setLoading(true);
    try {
      setErrors({});
      setAddSuccess(null);

      const formData = new FormData();
      formData.append("id", newProduct.id);
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      formData.append("availableQuantity", newProduct.availableQuantity);
      formData.append("image", newProduct.image);

      const response = await fetch(`http://localhost:8080/api/admin/products/${newProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.id === data.id ? data : product))
        );
        toast.success("Product updated successfully!");
        setNewProduct({
          id: "",
          name: "",
          price: "",
          category: "",
          description: "",
          availableQuantity: "",
          image: null,
        });
        setEditingProduct(null); 
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleImagePreview = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1>Admin Dashboard</h1>
      <section className="add-product-section">
        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Available Quantity</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {['id', 'name', 'price', 'category', 'description', 'availableQuantity'].map((field) => (
                  <td key={field}>
                    <input
                      type={field === 'price' || field === 'availableQuantity' ? 'number' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={newProduct[field]}
                      onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                    />
                    {errors[field] && <p className="error-message">{errors[field]}</p>}
                  </td>
                ))}
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagePreview}
                  />
                  {newProduct.image && (
                    <img src={URL.createObjectURL(newProduct.image)} alt="Preview" width="50" />
                  )}
                  {errors.image && <p className="error-message">{errors.image}</p>}
                </td>
                <td>
                  <button type="submit" disabled={loading}>
                    {loading ? (editingProduct ? "Updating..." : "Adding...") : (editingProduct ? "Update Product" : "Add Product")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {addSuccess && <p className="success-message">{addSuccess}</p>}
      </section>

      <section className="manage-products-section">
        <h2>Manage Products</h2>
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Available Quantity</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8">No products found</td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.availableQuantity}</td>
                  <td>
                    {product.image && <img src={product.image} alt={product.name} width="50" />}
                  </td>
                  <td>
                    <button onClick={() => handleEditProduct(product)}>Edit</button>
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
