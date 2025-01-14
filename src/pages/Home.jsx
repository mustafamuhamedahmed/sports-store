import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Welcome to SportsShop</h1>
      <p>Explore the best sports products here!</p>

      <section className="about-intro">
        <h2>Our Story</h2>
        <p>
          SportsShop was founded with a simple mission in mind: to provide sports enthusiasts with top-quality products
          at affordable prices. From professional athletes to weekend warriors, we cater to everyone who is passionate
          about sports. Whether you're looking for the latest gear or timeless essentials, we've got you covered!
        </p>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          We aim to be the go-to store for athletes and fitness enthusiasts around the world. Our vision is to inspire
          people to lead healthier, more active lives by providing them with the best sports equipment and apparel.
        </p>
      </section>

      <section className="values">
        <h2>Our Core Values</h2>
        <ul>
          <li>Quality - We provide only the highest quality products.</li>
          <li>Customer Satisfaction - Your satisfaction is our top priority.</li>
          <li>Integrity - We always act with honesty and transparency.</li>
          <li>Innovation - We strive to bring the latest and most innovative products to our customers.</li>
        </ul>
      </section>

      <section className="products">
        <h2>Our Products</h2>
        <p>
          From athletic footwear to gym equipment, we offer a wide range of products designed to help you perform at
          your best. Whether you're into running, football, basketball, or any other sport, SportsShop has the gear you need.
        </p>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <p>Our team consists of sports enthusiasts who are dedicated to helping you achieve your fitness goals.</p>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <p>Mustafa Mohammed - Founder</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <p>Hussein - Marketing Lead</p>
          </div>
        </div>
      </section>

      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:contact@sportsshop.com">contact@sportsshop.com</a></p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Sports Street, Fitness City, Country</p>
      </section>
    </div>
  );
};

export default Home;
