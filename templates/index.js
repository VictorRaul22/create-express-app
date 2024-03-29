const path = require("path");
const { copy } = require("../bin/copy");
const os = require("os");
const fs = require("fs").promises;
const installTemplate = async ({ appName, root, template }) => {
  console.log("\nInitializing project with template:", template, "\n");
  const templatePath = path.join(__dirname, template);
  const copySource = ["**"];
  await copy(copySource, root, {
    parents: true,
    cwd: templatePath,
    rename: (name) => {
      switch (name) {
        case "gitignore": {
          return `.${name}`;
        }

        default: {
          return name;
        }
      }
    },
  });
  const packageJson = template === "express-mvc" ? packageJsonMVC : packageJsonCA;
  packageJson.name = appName;
  await fs.writeFile(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
};

module.exports = {
  installTemplate,
};

/** Create a package.json for the new project and write it to disk. */
const packageJsonMVC = {
  name: "",
  version: "1.0.0",
  description: "",
  main: "index.js",
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
    dev: "tsnd  -r tsconfig-paths/register --respawn  src/index.ts",
    build: "tsc -p .",
    start: "node -r module-alias/register ./dist/index.js",
  },
  _moduleAliases: {
    "@": "dist",
  },
  keywords: ["express", "typescript", "winston", "eslint"],
  author: "",
  license: "MIT",
  devDependencies: {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.0",
    "@typescript-eslint/eslint-plugin": "^6.4.0",
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-config-standard-with-typescript": "^43.0.0",
    "eslint-plugin-import": "^2.25.2",
    "eslint-plugin-n": "^15.0.0 || ^16.0.0 ",
    "eslint-plugin-promise": "^6.0.0",
    "ts-node-dev": "^2.0.0",
    typescript: "^5.3.3",
  },
  dependencies: {
    cors: "^2.8.5",
    dotenv: "^16.3.1",
    "env-var": "^7.4.1",
    express: "^4.18.2",
    "express-validator": "^7.0.1",
    "express-winston": "^4.2.0",
    "http-status": "^1.7.3",
    "module-alias": "^2.2.3",
    mysql: "^2.18.1",
    "reflect-metadata": "^0.2.1",
    "tsconfig-paths": "^4.2.0",
    typeorm: "^0.3.19",
    winston: "^3.11.0",
    "winston-daily-rotate-file": "^4.7.1",
  },
};
const packageJsonCA = {
  name: "",
  version: "1.0.0",
  description: "",
  main: "index.js",
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
    dev: "tsnd  -r tsconfig-paths/register --respawn  src/presentation/index.ts",
    build: "tsc -p .",
    start: "node -r module-alias/register ./dist/presentation/index.js",
    prepare: "husky install",
    lint: 'eslint "**/*.{ts,tsx,js,jsx}" --fix',
    "format:check": 'prettier --check "**/*.{js,jsx,json,md,ts,tsx}" ',
    format: 'prettier --write "**/*.{js,jsx,json,md,ts,tsx}" --ignore-unknown',
  },
  "lint-staged": {
    "**/*.{ts,tsx,js,jsx}": "eslint --fix",
    "**/*.{js,jsx,json,md,ts,tsx}": "prettier --check",
  },
  keywords: [
    "typescript",
    "express",
    "clean-code",
    "inversify",
    "husky",
    "winston",
    "prettier",
    "eslint",
  ],
  author: "",
  license: "MIT",
  devDependencies: {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/morgan": "^1.9.9",
    "@types/node": "^20.11.0",
    "@typescript-eslint/eslint-plugin": "^6.4.0",
    eslint: "^8.0.1",
    "eslint-config-prettier": "^9.1.0",
    "eslint-config-standard-with-typescript": "^43.0.0",
    "eslint-plugin-import": "^2.25.2",
    "eslint-plugin-n": "^15.0.0 || ^16.0.0 ",
    "eslint-plugin-promise": "^6.0.0",
    husky: "^8.0.0",
    "lint-staged": "^15.2.0",
    prettier: "^3.2.4",
    "ts-node-dev": "^2.0.0",
    "tsconfig-paths": "^4.2.0",
    typescript: "^5.3.3",
    "@types/prettyjson": "^0.0.33",
    "@types/uuid": "^9.0.7",
  },
  dependencies: {
    morgan: "^1.10.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    cors: "^2.8.5",
    dotenv: "^16.3.1",
    "env-var": "^7.4.1",
    express: "^4.18.2",
    "http-status": "^1.7.3",
    inversify: "^6.0.2",
    "inversify-express-utils": "^6.4.6",
    "module-alias": "^2.2.3",
    mysql: "^2.18.1",
    prettyjson: "^1.2.5",
    "reflect-metadata": "^0.2.1",
    typeorm: "^0.3.19",
    uuid: "^9.0.1",
    winston: "^3.11.0",
    "winston-daily-rotate-file": "^4.7.1",
  },
  _moduleAliases: {
    "@": "dist",
  },
};
