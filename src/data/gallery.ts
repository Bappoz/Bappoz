// Event / talk photos.
// 1. Drop your images into  public/gallery/
// 2. List the filenames here (order = carousel order). Landscape ~4:3 works best.
// While this list is empty, numbered placeholder slots are shown.
const files: string[] = [
  "01f48153-b303-439b-978f-77366b6c029d.jpeg",
  "930a4c90-5694-4f96-a218-3d820dd88560.jpeg",
  "14d6476b-f9e4-4a4b-9e07-3adc1a178f18.jpeg",
  "ea7e30bb-6b0b-4709-b6e1-60827389d7de.jpeg",
  "07c505bc-eb7c-4509-9d26-f5ebde1ff90b.jpeg",
  "012527cc-3555-487a-b305-56add416f847.jpeg",
  "d1f3308b-c71b-43b9-8b2c-2f8018ecd0b1.jpeg",
  "9b19e8c9-a0b7-4d06-9315-80c415ee8ac5.jpeg",
  "campus-party-convite.jpeg",
  "serjao-campus-party.jpeg",
  "obrigado-MLH.jpeg",
];

// Resolve against Vite's base so it works both locally (dev) and on GitHub Pages.
export const gallery: string[] = files.map(
  (f) => `${import.meta.env.BASE_URL}gallery/${f}`,
);
