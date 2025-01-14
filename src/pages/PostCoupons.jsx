import React, { useState, useEffect } from "react";
import Button from "../components/Button";

const PostCoupons = () => {
  const [couponData, setCouponData] = useState({
    code: "",
    discount: "",
    expiryDate: "",
  });

  const [addError, setAddError] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCouponData({ ...couponData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // بدء عملية التحميل
    try {
      setAddError(null); // إعادة تعيين الخطأ
      const response = await fetch("https://api.example.com/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(couponData),
      });

      if (!response.ok) throw new Error("Failed to add coupon");

      // إعادة تعيين بيانات الكوبون بعد إضافته
      setCouponData({ code: "", discount: "", expiryDate: "" });

      // تحميل الكوبونات من جديد بعد إضافة كوبون جديد
      const updatedCoupons = await fetchCoupons();
      setCoupons(updatedCoupons);
    } catch (error) {
      setAddError(error.message); // تخزين الخطأ إذا حدث
    } finally {
      setIsLoading(false); // إيقاف حالة التحميل
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await fetch("https://api.example.com/coupons");
      if (!response.ok) throw new Error("Failed to fetch coupons");
      const data = await response.json();
      return data;
    } catch (error) {
      setAddError(error.message); // تخزين الخطأ إذا حدث
      return [];
    }
  };

  useEffect(() => {
    const loadCoupons = async () => {
      setIsLoading(true); // بدء التحميل
      const loadedCoupons = await fetchCoupons();
      setCoupons(loadedCoupons);
      setIsLoading(false); // إيقاف التحميل
    };

    loadCoupons();
  }, []);

  return (
    <div className="post-coupons">
      <h1>Post Coupons</h1>

      <section className="add-coupon-section">
        <h2>Add New Coupon</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={couponData.code}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount Percentage"
            value={couponData.discount}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
            required
          />
          <Button type="submit" label={isLoading ? "Adding..." : "Add Coupon"} disabled={isLoading} />
        </form>
        {addError && <p className="error-message">{addError}</p>}
      </section>

      <section className="coupons-list-section">
        <h2>Available Coupons</h2>
        {isLoading ? (
          <p>Loading coupons...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Expiry Date</th>
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
                    <td>{coupon.expiryDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default PostCoupons;
