// Import GSAP and ScrollMagic
import gsap from "gsap"
import ScrollMagic from "scrollmagic"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Initialize ScrollMagic Controller
const controller = new ScrollMagic.Controller()

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  }
})

// GSAP Animations
// Home section animations
gsap
  .timeline()
  .from(".name", { duration: 1, y: 50, opacity: 0, ease: "power3.out" })
  .from(".tagline", { duration: 1, y: 30, opacity: 0, ease: "power3.out" }, "-=0.5")
  .from(".home-buttons .btn", { duration: 0.8, y: 30, opacity: 0, stagger: 0.2, ease: "power3.out" }, "-=0.3")
  .from(".scroll-indicator", { duration: 1, opacity: 0, ease: "power3.out" }, "-=0.3")

// Section title animations
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  })
})

// About section animations
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  })
  .from(".about-text", { duration: 1, x: -50, opacity: 0, ease: "power3.out" })
  .from(".about-image", { duration: 1, x: 50, opacity: 0, ease: "power3.out" }, "-=0.5")

// Skills section animations
gsap.utils.toArray(".skill-card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    delay: index * 0.1,
    ease: "power3.out",
  })
})

// Projects section animations
gsap.utils.toArray(".project-card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    delay: index * 0.2,
    ease: "power3.out",
  })
})

// Contact section animations
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  })
  .from(".contact-text", { duration: 1, y: 30, opacity: 0, ease: "power3.out" })
  .from(".contact-link", { duration: 0.8, y: 30, opacity: 0, stagger: 0.2, ease: "power3.out" }, "-=0.5")

// ScrollMagic Scenes for additional effects
// Parallax effect for home section
const parallaxScene = new ScrollMagic.Scene({
  triggerElement: ".home-section",
  triggerHook: 1,
  duration: "200%",
})
  .setTween(gsap.from(".home-section::before", { y: "-50%", ease: "none" }))
  .addTo(controller)

// Skill cards hover animations
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card.querySelector(".skill-icon"), {
      duration: 0.3,
      scale: 1.1,
      rotation: 5,
      ease: "power2.out",
    })
  })

  card.addEventListener("mouseleave", () => {
    gsap.to(card.querySelector(".skill-icon"), {
      duration: 0.3,
      scale: 1,
      rotation: 0,
      ease: "power2.out",
    })
  })
})

// Project cards hover animations
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      duration: 0.3,
      scale: 1.02,
      ease: "power2.out",
    })
  })

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      duration: 0.3,
      scale: 1,
      ease: "power2.out",
    })
  })
})

// Contact links pulse animation
document.querySelectorAll(".contact-link").forEach((link) => {
  const icon = link.querySelector(".contact-icon")

  // Continuous pulse animation
  gsap.to(icon, {
    duration: 2,
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  })
})

// Text typing effect for tagline
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect after page load
window.addEventListener("load", () => {
  const tagline = document.querySelector(".tagline")
  const originalText = tagline.textContent
  setTimeout(() => {
    typeWriter(tagline, originalText, 80)
  }, 1500)
})

// Intersection Observer for additional animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".skill-card, .project-card, .contact-link").forEach((el) => {
  observer.observe(el)
})

// Add floating animation to scroll indicator
gsap.to(".scroll-arrow", {
  duration: 1.5,
  y: 10,
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
})

// Cursor trail effect (optional enhancement)
let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

// Create cursor trail elements
for (let i = 0; i < 5; i++) {
  const trail = document.createElement("div")
  trail.className = "cursor-trail"
  trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.2};
        transition: all 0.1s ease;
    `
  document.body.appendChild(trail)

  // Animate trail
  gsap.to(trail, {
    duration: 0.3 + i * 0.1,
    x: mouseX,
    y: mouseY,
    ease: "power2.out",
    repeat: -1,
  })
}

// Performance optimization: Throttle scroll events
let ticking = false

function updateScrollAnimations() {
  // Update any scroll-based animations here
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollAnimations)
    ticking = true
  }
})

console.log("Portfolio website loaded successfully! 🚀")
