/** Contour simplifié de l'Afrique et de Madagascar, en [longitude, latitude]. */
const MAINLAND: [number, number][] = [
  [-5.9, 35.8], [-1.9, 35.1], [3.0, 36.8], [10.2, 37.2], [11.1, 33.3], [15.2, 32.3], [19.0, 30.3],
  [20.1, 32.1], [25.0, 31.6], [29.9, 31.2], [32.3, 31.3], [32.6, 29.9], [33.6, 27.2], [35.5, 23.9],
  [37.2, 21.0], [38.6, 18.0], [39.7, 15.6], [43.3, 12.6], [45.0, 10.4], [51.2, 11.8], [51.0, 10.4],
  [49.5, 6.8], [47.8, 4.3], [45.3, 2.0], [42.5, -0.6], [40.0, -3.3], [39.3, -6.8], [40.5, -10.5],
  [40.6, -14.5], [36.9, -17.9], [35.3, -21.5], [35.5, -23.9], [32.6, -25.9], [32.9, -28.7],
  [31.0, -29.9], [27.9, -33.0], [25.6, -33.9], [22.1, -34.2], [20.0, -34.8], [18.4, -34.3],
  [18.1, -32.0], [16.5, -28.6], [15.2, -26.6], [14.5, -22.9], [13.4, -20.0], [11.8, -17.2],
  [12.3, -13.5], [13.4, -12.6], [13.2, -8.8], [12.3, -6.1], [11.8, -4.8], [9.3, -1.0], [9.4, 0.4],
  [9.7, 4.0], [8.5, 4.6], [6.0, 4.3], [3.4, 6.4], [1.2, 6.1], [-1.9, 4.8], [-4.0, 5.2], [-7.5, 4.4],
  [-10.8, 6.3], [-13.2, 8.5], [-15.0, 10.8], [-16.6, 12.4], [-17.5, 14.7], [-16.5, 19.4],
  [-17.0, 21.0], [-14.9, 24.3], [-12.9, 27.9], [-9.6, 30.4], [-9.2, 32.3], [-6.8, 34.0],
];

const MADAGASCAR: [number, number][] = [
  [49.3, -12.0], [50.4, -15.5], [49.5, -17.8], [48.3, -21.5], [47.1, -24.9], [45.2, -25.6],
  [43.8, -23.5], [44.0, -20.0], [44.4, -16.2], [46.3, -15.7], [48.0, -13.5],
];

export const BOUNDS = { west: -19, east: 53, north: 38, south: -36 };
export const ABIDJAN: [number, number] = [-4.03, 5.32];

function inside(polygon: [number, number][], lon: number, lat: number): boolean {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) result = !result;
  }
  return result;
}

/** Points de la carte, normalisés entre 0 et 1 (x vers l'est, y vers le sud). */
export function africaPoints(step = 1.55): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const width = BOUNDS.east - BOUNDS.west;
  const height = BOUNDS.north - BOUNDS.south;
  for (let lat = BOUNDS.north; lat >= BOUNDS.south; lat -= step) {
    for (let lon = BOUNDS.west; lon <= BOUNDS.east; lon += step) {
      if (inside(MAINLAND, lon, lat) || inside(MADAGASCAR, lon, lat)) {
        points.push({ x: (lon - BOUNDS.west) / width, y: (BOUNDS.north - lat) / height });
      }
    }
  }
  return points;
}

export function project([lon, lat]: [number, number]) {
  return {
    x: (lon - BOUNDS.west) / (BOUNDS.east - BOUNDS.west),
    y: (BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south),
  };
}
