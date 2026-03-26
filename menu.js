import { createInterface } from "readline";
import { exec } from "child_process";

const rl = createInterface({ input: process.stdin, output: process.stdout });

const items = [
  { key: "1", label: "Open in browser (dev server)", cmd: "start http://localhost:3000" },
  { key: "2", label: "Open in Explorer", cmd: 'explorer "W:\\code\\sketchai"' },
  { key: "3", label: "Open Covers", cmd: "start http://localhost:3401" },
  { key: "4", label: "Open Claude", cmd: "claude" },
];

console.log("\n  Skissify - Project Menu\n");
for (const item of items) {
  console.log(`  [${item.key}] ${item.label}`);
}
console.log(`  [q] Quit\n`);

rl.question("  > ", (answer) => {
  const choice = items.find((i) => i.key === answer.trim());
  if (choice) {
    exec(choice.cmd, (err) => {
      if (err) console.error(`  Error: ${err.message}`);
      rl.close();
    });
  } else {
    rl.close();
  }
});
