#!/usr/bin/env node
import inquirer from 'inquirer';
import path from 'path';
import { argv } from "process"
const currentDir = process.cwd();
import fse from 'fs-extra';
import { fileURLToPath } from 'url';
import fs from 'fs';
import chalk from 'chalk';
class Prompt {
  constructor() {
    this.prompt = inquirer.prompt;
  }
  questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the name of the project:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else
          return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      type: "list",
      name: "projectType",
      message: "What type of project is this?",
      choices: this.avaliableProjectTypes()
    }
  ]
  
  avaliableProjectTypes() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const template = `${__dirname}/boilerplates`;
    const files = fs.readdirSync(template);
    return files;
  }

  promptUser() {
    this.prompt(this.questions).then((answers) => {
      const projectName = answers["projectName"];
      const projectType = answers["projectType"];
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const template = `${__dirname}/boilerplates/${projectType}`;
      const projectPath = this.createFolder(template, projectName);
      const defaultIgnore = `${__dirname}/sample.txt`;
      fse.appendFile(path.join(projectPath, ".gitignore"), fse.readFileSync(defaultIgnore).toString())
      let packageJson = path.join(projectPath, "package.json");
      let packageObj = fse.readJsonSync(packageJson);
      packageObj.name = projectName;
      fs.writeFileSync(packageJson, JSON.stringify(packageObj));
      console.log(chalk.green(`${projectName} successfully created`))
      console.log(chalk.green(`cd ${projectName}`))
      console.log(chalk.green(`npm install`))
      console.log(chalk.green(`npm start`));

    })

  }
  createFolder(template, projectName) {
    fs.mkdirSync(`${currentDir}/${projectName}`);
    fse.copySync(template, projectName);
    return path.join(currentDir, projectName);
  }

  handleInput() {
    const [, , ...args] = argv
    return args
  }

  init() {
    this.promptUser()
  }
}

new Prompt().init()
