#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const CURR_DIR = process.cwd();
const NAME_REGEX = /^([A-Za-z\-\_\d])+$/;
const { install } = require("./install");
const { getPkgManager } = require("./get-pkg-manager");
const { getOnline } = require("./is-online");
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
      choices: fs.readdirSync(path.join(__dirname, "..", "templates")),
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
    const templatePath = path.join(__dirname, "..", "templates", projectChoice);
    const pkgManage = getPkgManager();
    const isOnline = await getOnline();
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    createDirectoryContents(templatePath, projectName);
    console.log("Project setup complete!");
    process.chdir(`${CURR_DIR}/${projectName}`);

    console.log("installing dependencies");
    await install(pkgManage, isOnline);
    console.log("The project is ready!");
    console.log(`$ cd ${projectName}`);
    console.log("$ npm run dev");
  } catch (error) {
    console.log(error);
  }
}
main();

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      let keys = contents.match(/%(.*?)%/g);
      if (keys)
        for (const rep of keys)
          contents = replaceAll(contents, rep, ans[`${rep.slice(1, -1)}`]);
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}
function replaceAll(message, search, replacement) {
  return message.split(search).join(replacement);
}
function runCommand(command) {
  try {
  } catch (error) {
    console.log(`Failed to execute ${command}`, error);
    process.exit(-1);
  }
}
