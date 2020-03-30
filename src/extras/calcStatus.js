export default function({ g, y, r }) {
  if (g > 0 || y > 0 || r > 0) {
    let avg = (g * 0.01 + y * 0.505 + r * 0.995) / (g + y + r);
    let status = "g";
    if (avg > 0.66) {
      status = "r";
    } else if (avg > 0.33) {
      status = "y";
    } else {
      status = "g";
    }
    return { status, amounts: { g, r, y } };
  }
  return { status: null, amounts: { g, r, y } };
}
