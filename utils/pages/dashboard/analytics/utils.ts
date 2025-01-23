export function getColor(count: number) {
  if (count === 0) {
    return "transparent" // No data
  } else if (count <= 333) {
    return "#bbf7d0" // Light vibrant green
  } else if (count <= 666) {
    return "#86efac" // Medium-light green
  } else if (count <= 1000) {
    return "#4ade80" // Bright green
  } else if (count <= 2000) {
    return "#22c55e" // Moderate green
  } else if (count <= 3000) {
    return "#16a34a" // Dark green
  } else if (count <= 4000) {
    return "#15803d" // Deeper dark green
  } else if (count <= 5000) {
    return "#166534" // Very dark green
  } else if (count <= 6000) {
    return "#14532d" // Darker green
  } else if (count <= 7000) {
    return "#0f3b1f" // Almost black green
  } else if (count <= 8000) {
    return "#0d2917" // Very dark green-black
  } else if (count <= 10000) {
    return "#0b1f13" // Nearly black
  } else {
    return "#0a1910" // For values above 10k
  }
}
