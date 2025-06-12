// Node script to set and reset name in package
import { writeFile } from "fs/promises";
import { spawn } from "child_process";

const pkg = {
  ...(await import("../package.json", { with: { type: "json" } })).default,
};

pkg.name = "@theropods/run-types-core";

console.log('Publishing with name "@theropods/run-types"');

// write to file
await writeFile("./package.json", JSON.stringify(pkg, null, 2));

try {
  await new Promise((resolve, reject) => {
    const publish = spawn("npm", ["publish", "--access", "public"], {
      stdio: "inherit",
    });

    publish.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    publish.on("error", (error) => {
      reject(error);
    });
  });

  console.log("Finished publishing");
} catch (error) {
  console.error(error);
} finally {
  console.log("Resetting name");
  // reset name
  pkg.name = "@run-types/core";
  await writeFile("./package.json", JSON.stringify(pkg, null, 2));
}
