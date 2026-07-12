export interface SkillGroup {
  key: "languages" | "frameworks" | "tools" | "concepts";
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    key: "languages",
    items: ["Rust", "C", "C++", "Python", "TypeScript", "JavaScript", "Java", "SQL", "Bash"],
  },
  {
    key: "frameworks",
    items: ["React", "Node.js", "Spring", "Svelte", "Bevy", "Pandas", "Matplotlib"],
  },
  {
    key: "tools",
    items: ["Docker", "Git", "GitHub Actions", "Linux", "AWS", "DigitalOcean", "Cloudflare", "PostgreSQL", "MongoDB"],
  },
  {
    key: "concepts",
    items: ["OOP", "Agile / Scrum", "XP", "TDD", "BDD", "DDD", "Software Architecture", "ETL"],
  },
];
