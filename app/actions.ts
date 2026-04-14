'use server'

import fs from 'fs'
import path from 'path'

export async function getProjectImages() {
  const projectsDir = path.join(process.cwd(), 'public', 'projects')
  
  try {
    const files = fs.readdirSync(projectsDir)
    // Filter for common image extensions
    const images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    
    return images.map((file, i) => {
      // Format title from filename (e.g., "1-modern-villa.jpg" -> "Modern Villa")
      const nameWithoutExt = file.replace(/\.[^/.]+$/, "")
      const title = nameWithoutExt
        .replace(/^[0-9]+[-_]/, "") // Removes leading numbers if you order them (e.g. "1-")
        .replace(/[-_]/g, " ") // Replaces dashes and underscores with spaces
        .replace(/\b\w/g, l => l.toUpperCase()) // Capitalizes the first letter of each word

      // Dynamic Bento Box layout calculation
      const pos = i % 5
      let className = "md:col-span-1 md:row-span-1"
      if (pos === 0) className = "md:col-span-2 md:row-span-2"
      else if (pos === 4) className = "md:col-span-2 md:row-span-1"

      return {
        id: i,
        title: title || `Project ${i + 1}`,
        category: "ARCHITECTURE",
        src: `/projects/${file}`,
        className
      }
    })
  } catch (error) {
    console.error("Error reading projects directory:", error)
    return []
  }
}