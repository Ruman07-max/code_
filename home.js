document.addEventListener("DOMContentLoaded", () => {
  
  const hamburger = document.getElementById('hamburger');
  const sideMenu = document.getElementById('side-menu');
  const closeBtn = document.getElementById('close-btn');
  const navLinks = document.querySelectorAll('.menu-links a');

  
  const toggleMenu = (open) => {
    if (sideMenu) {
      sideMenu.style.right = open ? '0' : '-100%';
      sideMenu.setAttribute('aria-hidden', String(!open));
    }
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', String(open));
    }
    document.body.style.overflow = open ? 'hidden' : '';
  };

  
  if (hamburger) hamburger.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  
  document.addEventListener('click', (e) => {
    if (sideMenu && hamburger && 
        !sideMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      toggleMenu(false);
    }
  });

  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      if (this.getAttribute("href") === "#") return;
      
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "40px",
      duration: 800,
      delay: 150,
      reset: false,
      easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });


    const animations = {
      ".hero-content h1": { delay: 200 },
      ".hero-content p": { delay: 350 },
      ".test-btn": { delay: 500 },
      ".flash-cards": { interval: 300 },
      ".flash-cards-opp": { interval: 300 },
      ".service__header": {},
      ".service__subheader": { delay: 200 },
      ".service__card": { interval: 200 },
      ".portfolio__header": {},
      ".portfolio__description": { delay: 200 },
      ".portfolio__card": { interval: 250 },
      ".test__content h2": {},
      ".test__content p": { delay: 200 },
      ".test__features li": { interval: 200 },
      ".test__image": { origin: "right", delay: 400 },
      ".contact__content": {},
      ".contact__form": { delay: 300 }
    };

    Object.entries(animations).forEach(([selector, config]) => {
      sr.reveal(selector, config);
    });
  }

  
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 100;
      
      navbar.style.background = isScrolled 
        ? "rgba(2, 7, 61, 0.9)" 
        : "rgba(2, 7, 61, 0.28)";
      navbar.style.backdropFilter = "blur(12px)";
      navbar.style.boxShadow = isScrolled 
        ? "0 8px 30px rgba(0, 0, 0, 0.3)" 
        : "none";
    });
  }

  
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  if (sections.length && navItems.length) {
    window.addEventListener("scroll", () => {
      let current = "";
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
          item.classList.add("active");
        }
      });
    });
  }

  
  const contactForm = document.querySelector(".contact__form form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Form data:", Object.fromEntries(formData));
        alert("Thank you for your message! We'll get back to you soon.");
        contactForm.reset();
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error sending your message. Please try again.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
  
  const video = document.getElementById("background-video");
  if (video) {
    video.playbackRate = 0.7;
  }
});