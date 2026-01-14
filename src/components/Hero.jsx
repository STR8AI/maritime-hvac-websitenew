export default function Hero({ onOpenBooking }) {
  return (
    <section className="hero-clone">
      <div className="hero-clone-overlay" />

      <div className="hero-wave"></div>

      {/* white swoosh line */}
      <svg
        className="hero-clone-wave"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 C240,130 420,40 720,80 C980,120 1160,40 1440,70 L1440,0 L0,0 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="hero-clone-inner">
        <div className="hero-clone-text">
          <h1>Maritime HVAC</h1>
          <h2>Peggy's Cove comfort, delivered</h2>
          <h3>Troy and the Maritime HVAC van covering the Maritimes</h3>

          <p>
            Maritime HVAC keeps your home comfortable all year round with expert
            heating, cooling, and electrical services across the Maritimes.
            Schedule your service today and stay cozy!
          </p>

          <button className="hero-clone-btn" onClick={onOpenBooking}>
            APPLY NOW
          </button>
        </div>

        <div className="hero-clone-visuals">
          <img
            src="/assets/hero-person.png"
            className="hero-clone-person"
            alt="Maritime HVAC Owner"
          />
          <img
            src="/assets/van.png"
            className="hero-clone-van"
            alt="Maritime HVAC Van"
          />
        </div>
      </div>

      <div className="hero-clone-bottomfade" />
    </section>
  );
}