const fs = require("fs")
const path = require("path")

const BUDGET = {
  main: 400, // kB
  css: 300, // kB
}

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath)
  return stats.size / 1024
}

function checkBudget() {
  const distPath = path.join(__dirname, "..", "dist", "assets")
  
  if (!fs.existsSync(distPath)) {
    console.error("❌ Dist folder not found. Run npm run build first.")
    process.exit(1)
  }

  const files = fs.readdirSync(distPath)
  let hasFailure = false

  files.forEach((file) => {
    const filePath = path.join(distPath, file)
    const sizeKB = getFileSizeInKB(filePath)
    const sizeMB = (sizeKB / 1024).toFixed(2)

    if (file.includes("index") && file.endsWith(".js")) {
      if (sizeKB > BUDGET.main) {
        console.error(`❌ Main bundle too large: ${sizeMB}MB (budget: ${BUDGET.main}KB)`)
        hasFailure = true
      } else {
        console.log(`✅ Main bundle: ${sizeMB}MB`)
      }
    }

    if (file.endsWith(".css")) {
      if (sizeKB > BUDGET.css) {
        console.error(`❌ CSS bundle too large: ${sizeKB}KB (budget: ${BUDGET.css}KB)`)
        hasFailure = true
      } else {
        console.log(`✅ CSS bundle: ${sizeKB}KB`)
      }
    }
  })

  if (hasFailure) {
    console.error("❌ Bundle size budget exceeded!")
    process.exit(1)
  } else {
    console.log("✅ All bundles within budget!")
  }
}

checkBudget()
