/**
 * Normalize a value between vmin and vmax
 * to tmin and tmax
 *
 * @export
 * @param {any} v value
 * @param {any} vmin min value range intial
 * @param {any} vmax max value range initial
 * @param {any} tmin max value range final
 * @param {any} tmax max value range final
 * @returns {number} normalized value
 */
export default function normalize(v, vmin, vmax, tmin, tmax) {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  const tv = tmin + (pc * dt);

  return tv;
}
