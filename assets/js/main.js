document.addEventListener("DOMContentLoaded", () => {
  // Quote form submission
  const quoteForm = document.getElementById("quote-form")
  const quoteResult = document.getElementById("quote-result")

  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      // We'll let FormSubmit handle the form submission
      // This is just for any additional JS functionality
    })
  }

  // Calculator form submission
  const calculatorForm = document.getElementById("calculator-form")
  const calculatorResult = document.getElementById("calculator-result")
  const priceRange = document.getElementById("price-range")

  if (calculatorForm) {
    calculatorForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const homeSize = Number.parseInt(document.getElementById("home-size").value)
      const material = document.getElementById("siding-material").value
      const stories = Number.parseInt(document.getElementById("stories").value)
      const quality = document.getElementById("quality").value

      // Calculate price range
      let pricePerSqFt = {
        min: 0,
        max: 0,
      }

      // Base price by material
      switch (material) {
        case "vinyl":
          pricePerSqFt = { min: 3, max: 7 }
          break
        case "fiber-cement":
          pricePerSqFt = { min: 5, max: 11 }
          break
        case "wood":
          pricePerSqFt = { min: 6, max: 12 }
          break
        case "engineered-wood":
          pricePerSqFt = { min: 4, max: 9 }
          break
        case "metal":
          pricePerSqFt = { min: 4, max: 10 }
          break
        default:
          pricePerSqFt = { min: 4, max: 10 }
      }

      // Adjust for quality
      if (quality === "economy") {
        pricePerSqFt.min *= 0.8
        pricePerSqFt.max *= 0.8
      } else if (quality === "premium") {
        pricePerSqFt.min *= 1.3
        pricePerSqFt.max *= 1.3
      }

      // Adjust for stories
      if (stories === 2) {
        pricePerSqFt.min *= 1.1
        pricePerSqFt.max *= 1.1
      } else if (stories >= 3) {
        pricePerSqFt.min *= 1.2
        pricePerSqFt.max *= 1.2
      }

      // Calculate total price range
      const minPrice = Math.round(homeSize * pricePerSqFt.min)
      const maxPrice = Math.round(homeSize * pricePerSqFt.max)

      // Update result
      priceRange.textContent = "$" + minPrice.toLocaleString() + " - $" + maxPrice.toLocaleString()
      calculatorResult.style.display = "block"
    })
  }
})

