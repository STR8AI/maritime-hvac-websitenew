// Optional JS for HighLevel pages
// Update footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Smooth scroll for in-page anchors (if allowed by HighLevel)
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href')?.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Panel toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const moreButtons = document.querySelectorAll('button[data-open]');
  const closeButtons = document.querySelectorAll('button[data-close]');
  const panels = document.querySelectorAll('.panel');

  moreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const panelId = button.getAttribute('data-open');
      const panel = document.getElementById(`panel-${panelId}`);
      if (panel) {
        // Hide all panels
        panels.forEach(p => p.classList.remove('active'));
        // Show the selected panel
        panel.classList.add('active');
        // Scroll to the panel
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.closest('.panel');
      if (panel) {
        panel.classList.remove('active');
      }
    });
  });
});
