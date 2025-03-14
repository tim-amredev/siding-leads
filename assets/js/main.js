document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")

  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener("click", () => {
      navList.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
  }

  // FAQ accordion (simplified)
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      if (question) {
        question.addEventListener("click", () => {
          item.classList.toggle("active")
        })
      }
    })
  }

  // Materials slider
  const materialsSlider = document.querySelector(".materials-slider")
  if (materialsSlider && typeof Swiper !== "undefined") {
    const swiperMaterials = new Swiper(materialsSlider, {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    })
  }

  // Testimonials slider
  const testimonialsSlider = document.querySelector(".testimonials-slider")
  if (testimonialsSlider && typeof Swiper !== "undefined") {
    const swiperTestimonials = new Swiper(testimonialsSlider, {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 5000,
      },
    })
  }

  // Gallery filters
  const filterButtons = document.querySelectorAll(".filter-button")
  const projectCards = document.querySelectorAll(".project-card")

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter")

        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked button
        this.classList.add("active")

        // Filter projects
        projectCards.forEach((card) => {
          if (filter === "all") {
            card.style.display = "block"
          } else {
            if (card.getAttribute("data-category").includes(filter)) {
              card.style.display = "block"
            } else {
              card.style.display = "none"
            }
          }
        })
      })
    })
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  if (anchorLinks.length > 0) {
    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href")

        if (href !== "#") {
          e.preventDefault()
          const targetElement = document.querySelector(href)

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: "smooth",
            })
          }
        }
      })
    })
  }
})

