const { async: glob } = require("fast-glob");
const path = require("path");
const fs = require("fs");

const identity = (x) => x;
const copy = async (src, dest, { cwd, rename = identity, parents = true } = {}) => {
  const source = typeof src === "string" ? [src] : src;

  if (source.length === 0 || !dest) {
    throw new TypeError("`src` and `dest` are required");
  }

  const sourceFiles = await glob(source, {
    cwd,
    dot: true,
    absolute: false,
    stats: false,
  });

  const destRelativeToCwd = cwd ? path.resolve(cwd, dest) : dest;

  return Promise.all(
    sourceFiles.map(async (p) => {
      const dirname = path.dirname(p);
      const basename = rename(path.basename(p));

      const from = cwd ? path.resolve(cwd, p) : p;
      const to = parents
        ? path.join(destRelativeToCwd, dirname, basename)
        : path.join(destRelativeToCwd, basename);

      // Ensure the destination directory exists
      await fs.promises.mkdir(path.dirname(to), { recursive: true });

      return fs.promises.copyFile(from, to);
    })
  );
};

module.exports = {
  copy,
};
