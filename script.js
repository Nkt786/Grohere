// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
}

// Run after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Animate counters (%)
  const counters = document.querySelectorAll(".stat strong");
  counters.forEach(counter => {
    const target = +counter.textContent.replace('%', '');
    let count = 0;

    const updateCount = () => {
      const increment = Math.ceil(target / 60);
      count += increment;
      if (count < target) {
        counter.textContent = `${count}%`;
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = `${target}%`;
      }
    };
    updateCount();
  });

  // Swiper for Testimonials
  const testimonialSwiper = new Swiper('.testimonials-swiper', {
    loop: true,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // Fallback for TradingView chart
  setTimeout(() => {
    const tvIframe = document.querySelector(".tradingview-widget-container__widget iframe");
    const tvContainer = document.getElementById("tv-container");
    const fallback = document.getElementById("fallback-chart-container");

    if (!tvIframe && tvContainer && fallback) {
      tvContainer.style.display = "none";
      fallback.style.display = "block";

      const ctx = document.getElementById("niftyChart").getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "rgba(212, 175, 55, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{
            data: [17500, 17650, 17420, 17810, 17750, 17960],
            fill: true,
            backgroundColor: gradient,
            borderColor: "#d4af37",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              ticks: { color: "#aaa" },
              grid: { color: "#222" }
            },
            y: {
              ticks: { color: "#aaa" },
              grid: { color: "#222" }
            }
          }
        }
      });
    }
  }, 3000);
});

// Scroll fade-in animation (once)
window.addEventListener('scroll', () => {
  document.querySelectorAll('[data-fade]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
});

