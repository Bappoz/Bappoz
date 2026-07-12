export type IconKey =
  | "github"
  | "linkedin"
  | "youtube"
  | "leetcode"
  | "instagram"
  | "email";

export interface Social {
  key: IconKey;
  label: string;
  href: string;
  handle: string;
}

// NOTE: LeetCode and Instagram default to the "bappoz" handle used elsewhere.
// Swap these if your usernames differ.
export const socials: Social[] = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/Bappoz",
    handle: "@Bappoz",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucas-andrade-zanetti/",
    handle: "lucas-andrade-zanetti",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@bappoz",
    handle: "@bappoz",
  },
  {
    key: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/bappoz/",
    handle: "@bappoz",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/bappoz/",
    handle: "@bappoz",
  },
  {
    key: "email",
    label: "Email",
    href: "mailto:landradezanetti@gmail.com",
    handle: "landradezanetti@gmail.com",
  },
];
