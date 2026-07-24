function Hero() {
  return (
    <section className="hero" id="home">
      <div className="heroLeft">
        <p className="heroTag">🔥 New Collection 2026</p>

        <h1>
          Shop Smarter,
          <br />
          Live <span>Better.</span>
        </h1>

        <p className="heroText">
          Discover amazing products at unbeatable prices.
          Everything you need, all in one place.
        </p>

        <a href="#products">
          <button className="shopButton">
            Shop Now →
          </button>
        </a>
      </div>

      <div className="heroRight">
        <div className="heroCircle">
          🛍️
        </div>
      </div>
    </section>
  );
}

export default Hero;