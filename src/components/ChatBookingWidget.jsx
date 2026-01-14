import React, { useState } from "react";
import "./ChatBookingWidget.css";

export default function ChatBookingWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="cbw-button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        Chat / Book
      </button>

      {/* Slide-in panel */}
      <aside
        className={`cbw-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-hidden={!open}
      >
        <div className="cbw-panel-inner">
          <header className="cbw-panel-header">
            <h3>Chat & Book a Service</h3>
            <button className="cbw-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </header>

          {/* Replace src with your booking page URL or iframe */}
          <div className="cbw-panel-body">
            <iframe
              title="Booking"
              src="https://maritimehvac.info/bookingservice"
              frameBorder="0"
              className="cbw-iframe"
            />
            <p className="cbw-note">
              If the booking form doesn't load, click the button again to reopen.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
