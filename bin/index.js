#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const CURR_DIR = process.cwd();
const NAME_REGEX = /^([A-Za-z\-\_\d])+$/;
const { install } = require("./install");
const { getPkgManager } = require("./get-pkg-manager");
const { getOnline } = require("./is-online");
const { installTemplate } = require("../templates/index");
let ans;
const questions = async () => {
  const QUESTIONS = [
    {
      name: "app-name",
      type: "input",
      message: "Project name:",
      validate: function (input) {
        if (NAME_REGEX.test(input)) return true;
        else
          return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      name: "project-choice",
      type: "list",
      message: "What project template would you like to generate?",
      choices: fs
        .readdirSync(path.join(__dirname, "..", "templates"), {
          withFileTypes: true,
        })
        .filter((d) => d.isDirectory())
        .map((d) => d.name),
    },
  ];

  const answers = await inquirer.prompt(QUESTIONS);
  return answers;
};
async function main() {
  try {
    const answers = await questions();
    ans = answers;

    const projectChoice = answers["project-choice"];
    const projectName = answers["app-name"];
    const pkgManage = getPkgManager();
    const isOnline = await getOnline();
    console.log(`Using ${pkgManage}.`);

    await installTemplate({
      appName: projectName,

      root: path.join(CURR_DIR, projectName),
      template: projectChoice,
    });

    // fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    // createDirectoryContents(templatePath, projectName);
    // console.log("Project setup complete!");
    process.chdir(path.join(CURR_DIR, projectName));
    console.log("\ninstalling dependencies\n");
    await install(pkgManage, isOnline);
    console.log("\nThe project is ready!\n");
    console.log(`$ cd ${projectName}`);
  } catch (error) {
    console.log(error);
  }
}
main();
