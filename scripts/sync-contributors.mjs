import { readFile, writeFile } from "node:fs/promises";

const projectsFile = new URL("../src/data/projects.ts", import.meta.url);
const output = new URL("../src/data/contributors.json", import.meta.url);
const source = await readFile(projectsFile, "utf8");
const repositories = [
  ...source.matchAll(/href: "https:\/\/github\.com\/([^\"]+)"/g),
].map((match) => match[1]);
const snapshot = JSON.parse(await readFile(output, "utf8"));
let failed = false;
for (const repo of repositories) {
  try {
    const contributors = [];
    for (let page = 1; ; page++) {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/contributors?per_page=100&page=${page}`,
        {
          headers: { Accept: "application/vnd.github+json" },
          signal: AbortSignal.timeout(10000),
        },
      );
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const users = await response.json();
      if (!Array.isArray(users)) throw new Error("Invalid GitHub response");
      for (const user of users.filter((user) => user.type === "User")) {
        contributors.push({
          login: user.login,
          avatar: user.avatar_url,
          href: user.html_url,
        });
      }
      if (users.length < 100) break;
    }
    contributors.sort(
      (a, b) =>
        Number(b.login.toLowerCase() === "bappoz") -
        Number(a.login.toLowerCase() === "bappoz"),
    );
    snapshot[repo] = contributors;
    console.log(`${repo}: ${contributors.length} contributors`);
  } catch (error) {
    // Preserve verified data on rate limits, removed repos or temporary failures.
    console.error(`${repo}: ${error.message}; keeping the previous snapshot.`);
    failed = true;
  }
}
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
if (failed) process.exitCode = 1;
