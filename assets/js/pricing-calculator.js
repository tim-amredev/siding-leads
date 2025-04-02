document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("siding-calculator")
  const estimateResults = document.getElementById("estimate-results")

  if (calculatorForm && estimateResults) {
    // Initially hide the results
    estimateResults.style.display = "none"

    calculatorForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const homeSize = Number.parseFloat(document.getElementById("home-size").value)
      const sidingMaterial = document.getElementById("siding-material").value
      const stories = Number.parseInt(document.getElementById("stories").value)
      const complexity = document.getElementById("complexity")
        ? document.getElementById("complexity").value
        : "moderate"
      const removeExisting = document.querySelector('input[name="remove-existing"]:checked').value
      const addInsulation = document.querySelector('input[name="insulation"]:checked').value
      const quality = document.getElementById("quality") ? document.getElementById("quality").value : "standard"
      const zipCode = document.getElementById("zip-code").value

      // Calculate estimates based on inputs
      const estimates = calculateSidingEstimate(
        homeSize,
        sidingMaterial,
        stories,
        complexity,
        removeExisting,
        addInsulation,
        quality,
        zipCode,
      )

      // Update the DOM with calculated values
      document.getElementById("low-estimate").textContent = "$" + estimates.lowEstimate.toLocaleString()
      document.getElementById("high-estimate").textContent = "$" + estimates.highEstimate.toLocaleString()
      document.getElementById("material-cost").textContent = "$" + estimates.materialCost.toLocaleString()
      document.getElementById("labor-cost").textContent = "$" + estimates.laborCost.toLocaleString()
      document.getElementById("sqft-cost").textContent = "$" + estimates.costPerSqFt

      // Show the results
      estimateResults.style.display = "block"

      // Scroll to results
      estimateResults.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }
})

function calculateSidingEstimate(
  homeSize,
  material,
  stories,
  complexity = "moderate",
  removeExisting = "yes",
  addInsulation = "no",
  quality = "standard",
  zipCode,
) {
  // Base material costs per square foot
  const materialCosts = {
    vinyl: {
      economy: { low: 3, high: 5 },
      standard: { low: 5, high: 8 },
      premium: { low: 8, high: 12 },
    },
    "fiber-cement": {
      economy: { low: 5, high: 7 },
      standard: { low: 7, high: 10 },
      premium: { low: 10, high: 13 },
    },
    wood: {
      economy: { low: 6, high: 8 },
      standard: { low: 8, high: 12 },
      premium: { low: 12, high: 15 },
    },
    "engineered-wood": {
      economy: { low: 4, high: 6 },
      standard: { low: 6, high: 8 },
      premium: { low: 8, high: 9 },
    },
    metal: {
      economy: { low: 4, high: 7 },
      standard: { low: 7, high: 10 },
      premium: { low: 10, high: 14 },
    },
    "stone-veneer": {
      economy: { low: 10, high: 20 },
      standard: { low: 20, high: 35 },
      premium: { low: 35, high: 50 },
    },
  }

  // Get the selected material cost range
  const selectedMaterial = materialCosts[material] || {
    economy: { low: 4, high: 7 },
    standard: { low: 7, high: 12 },
    premium: { low: 12, high: 20 },
  }

  const selectedQuality = selectedMaterial[quality] || selectedMaterial["standard"]

  // Calculate material costs
  const lowMaterialCost = homeSize * selectedQuality.low
  const highMaterialCost = homeSize * selectedQuality.high

  // Base labor costs per square foot
  const laborCostPerSqFt = { low: 2, high: 5 }

  // Adjust labor costs based on complexity
  if (complexity === "moderate") {
    laborCostPerSqFt.low *= 1.2
    laborCostPerSqFt.high *= 1.2
  } else if (complexity === "complex") {
    laborCostPerSqFt.low *= 1.5
    laborCostPerSqFt.high *= 1.5
  }

  // Adjust labor costs based on stories
  if (stories === 2) {
    laborCostPerSqFt.low *= 1.2
    laborCostPerSqFt.high *= 1.2
  } else if (stories >= 3) {
    laborCostPerSqFt.low *= 1.4
    laborCostPerSqFt.high *= 1.4
  }

  // Calculate labor costs
  const lowLaborCost = homeSize * laborCostPerSqFt.low
  const highLaborCost = homeSize * laborCostPerSqFt.high

  // Additional costs
  let additionalCosts = 0

  // Add cost for removing existing siding
  if (removeExisting === "yes") {
    additionalCosts += homeSize * 1.5 // $1.50 per sq ft for removal
  } else if (removeExisting === "partial") {
    additionalCosts += homeSize * 0.75 // $0.75 per sq ft for partial removal
  }

  // Add cost for insulation
  if (addInsulation === "yes") {
    additionalCosts += homeSize * 2 // $2.00 per sq ft for insulation
  }

  // Regional adjustment based on zip code
  // This is a simplified example - in a real application, you would have a database of regional cost factors
  let regionalFactor = 1.0
  const firstDigit = Number.parseInt(zipCode.charAt(0))

  // Simple regional adjustment based on first digit of zip code
  if (firstDigit >= 0 && firstDigit <= 9) {
    const regionalFactors = [1.1, 0.9, 0.95, 1.0, 1.05, 0.9, 0.85, 1.15, 1.2, 1.1]
    regionalFactor = regionalFactors[firstDigit]
  }

  // Calculate total estimates
  const lowEstimate = Math.round((lowMaterialCost + lowLaborCost + additionalCosts) * regionalFactor)
  const highEstimate = Math.round((highMaterialCost + highLaborCost + additionalCosts) * regionalFactor)

  // Calculate average material and labor costs for display
  const avgMaterialCost = Math.round(((lowMaterialCost + highMaterialCost) / 2) * regionalFactor)
  const avgLaborCost = Math.round(
    ((lowLaborCost + highLaborCost) / 2) * regionalFactor + additionalCosts * regionalFactor,
  )

  // Calculate cost per square foot
  const avgCostPerSqFt = ((lowEstimate + highEstimate) / (2 * homeSize)).toFixed(2)

  return {
    lowEstimate: lowEstimate,
    highEstimate: highEstimate,
    materialCost: avgMaterialCost,
    laborCost: avgLaborCost,
    costPerSqFt: avgCostPerSqFt,
  }
}

