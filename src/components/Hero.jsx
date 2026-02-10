export default function Hero({ onOpenBooking }) {
  return (
    <section className="hero">
      <svg
        className="hero-swoosh"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 C240,130 420,40 720,80 C980,120 1160,40 1440,70 L1440,0 L0,0 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1>Maritime-ready solutions for our homes, businesses and peace of mind.</h1>
          <h2>Peggy's Cove comfort, delivered</h2>

          <p>
            Maritime HVAC keeps your home comfortable all year round with expert
            heating, cooling, and electrical services across the Maritimes.
            Schedule your service today and stay cozy!
          </p>

          <button className="hero-btn" onClick={onOpenBooking}>
            APPLY NOW
          </button>
        </div>

        <div className="hero-visual">
          <img
            src="/assets/hero-person.png"
            className="hero-person"
            alt="Maritime HVAC Owner"
          />
          <img
            src="/assets/van.png"
            className="hero-van"
            alt="Maritime HVAC Van"
          />
        </div>
      </div>
    </section>
  );
}