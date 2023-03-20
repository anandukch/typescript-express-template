#!/usr/bin/env node
import Prompt from "./prompt.js";

const questions =[
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
    type:"list",
    name:"projectType",
    message:"What type of project is this?",
    choices:["mongodb", "mysql"]
  }
]

const prompt = new Prompt(questions);
prompt.init();
