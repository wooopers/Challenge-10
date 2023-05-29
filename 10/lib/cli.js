const inquirer = require('inquirer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const { createDocument } = require('./document');
const fs = require('fs');

class CLI {
  constructor() {
    this.title = '';

    // Array of task objects e.g. [{ text: string, priority: bool }, ...]
    this.tasks = [];
  }

  generateLogo(color, shape, text) {
    // Implement the logic to generate the SVG content based on the user's input
    return `<svg>${color} ${shape} ${text}</svg>`;
  }

  run() {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter your name',
      },
      {
        type: 'list',
        name: 'color',
        message: 'Select a color:',
        choices: ['Red', 'Blue', 'Green'],
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Select a shape:',
        choices: ['Circle', 'Square', 'Triangle'],
      },
      {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo:',
      },
      {
        type: 'input',
        name: 'fileName',
        message: 'Enter a file name for the SVG:',
      },
    ];

    return inquirer
      .prompt(questions)
      .then((answers) => {
        const { name, color, shape, text, fileName } = answers;

        this.title = `${name}'s Tasks`;

        const svgContent = this.generateLogo(color, shape, text);

        fs.writeFile(`${fileName}.svg`, svgContent, (err) => {
          if (err) {
            console.error('Error saving SVG file:', err);
          } else {
            console.log('SVG file saved successfully!');
          }
        });

        return this.addTask();
      })
      .then(() => {
        // sort by priority so that priority tasks come before non-priority tasks
        this.tasks.sort((a, b) =>
          a.priority === b.priority ? 0 : a.priority && !b.priority ? -1 : 1
        );
        return writeFile(
          join(__dirname, '..', 'output', 'tasks.html'),
          createDocument(this.title, this.tasks)
        );
      })
      .then(() => console.log('Created tasks.html'))
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }

  addTask() {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Enter task',
        },
        {
          type: 'confirm',
          name: 'priority',
          message: 'Is this a priority task?',
        },
        {
          type: 'confirm',
          name: 'confirmAddTask',
          message: 'Would you like to add another task?',
        },
      ])
      .then(({ text, priority, confirmAddTask }) => {
        this.tasks.push({ text, priority });
        if (confirmAddTask) {
          return this.addTask();
        }
      });
  }
}

module.exports = CLI;