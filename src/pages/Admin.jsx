import React, { useState, useEffect } from "react";
import "../styles/Admin.css";

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    availableQuantity: "",
  });
  const [products, setProducts] = useState([]);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://example.com/api/products");
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
    const { id, name, price, category, description, availableQuantity } = newProduct;
    if (!id || !name || !price || !category || !description || !availableQuantity) {
      return "All fields are required!";
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      return "Price must be a positive number!";
    }
    if (isNaN(availableQuantity) || parseInt(availableQuantity) <= 0) {
      return "Available quantity must be a positive integer!";
    }
    return null;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const validationError = validateProduct();
    if (validationError) {
      setAddError(validationError);
      return;
    }

    try {
      setAddError(null);
      setAddSuccess(null);

      setProducts((prevProducts) => [...prevProducts, newProduct]);

      setAddSuccess("Product added successfully!");
      setNewProduct({
        id: "",
        name: "",
        price: "",
        category: "",
        description: "",
        availableQuantity: "",
      });
    } catch (error) {
      setAddError(error.message || "Failed to add product");
    }
  };

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      <section className="add-product-section">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Available Quantity</th> 
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="ID"
                    value={newProduct.id}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, id: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  />
                </td>
                <td>
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Available Quantity"
                    value={newProduct.availableQuantity}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        availableQuantity: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button type="submit">Add Product</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {addError && <p className="error-message">{addError}</p>}
        {addSuccess && <p className="success-message">{addSuccess}</p>}
      </section>

      <section className="manage-products-section">
        <h2>Manage Products</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Available Quantity</th> 
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7">No products available</td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.availableQuantity}</td> 
                  <td>
                    <button>Delete</button>
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

