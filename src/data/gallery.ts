// Event / talk photos.
// 1. Drop your images into  public/gallery/
// 2. List the filenames here (order = carousel order). Landscape ~4:3 works best.
// While this list is empty, numbered placeholder slots are shown.
const files: string[] = [
  "campus-party-convite.jpeg",
  "serjao-campus-party.jpeg",
  "obrigado-MLH.jpeg",
];

// Resolve against Vite's base so it works both locally (dev) and on GitHub Pages.
export const gallery: string[] = files.map(
  (f) => `${import.meta.env.BASE_URL}gallery/${f}`,
);
