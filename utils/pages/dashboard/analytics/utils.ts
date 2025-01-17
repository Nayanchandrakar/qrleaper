export function getColor(count: number) {
  if (count === 0) {
    return "transparent"
  } else if (count <= 333) {
    return "#ecfdf5"
  } else if (count <= 666) {
    return "#d1fae5"
  } else if (count <= 1000) {
    return "#a7f3d0"
  } else if (count <= 2000) {
    return "#6ee7b7"
  } else if (count <= 3000) {
    return "#34d399"
  } else if (count <= 4000) {
    return "#10b981"
  } else if (count <= 5000) {
    return "#059669"
  } else if (count <= 6000) {
    return "#047857"
  } else if (count <= 7000) {
    return "#065f46"
  } else if (count <= 8000) {
    return "#064e3b"
  } else if (count <= 10000) {
    return "#022c22"
  } else {
    return "#022c22"
  }
}
