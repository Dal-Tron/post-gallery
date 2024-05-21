import { exec } from 'child_process'

import inquirer from 'inquirer'

const commitTypes = [
  {
    name: 'build: Changes that affect the build system or external dependencies',
    value: 'build'
  },
  {
    name: "chore: Other changes that don't modify src or test files",
    value: 'chore'
  },
  {
    name: 'ci: Changes to our CI configuration files and scripts',
    value: 'ci'
  },
  { name: 'docs: Documentation only changes', value: 'docs' },
  { name: 'feat: A new feature', value: 'feat' },
  { name: 'fix: A bug fix', value: 'fix' },
  { name: 'perf: A code change that improves performance', value: 'perf' },
  {
    name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    value: 'refactor'
  },
  { name: 'revert: Reverts a previous commit', value: 'revert' },
  {
    name: 'style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    value: 'style'
  },
  {
    name: 'test: Adding missing tests or correcting existing tests',
    value: 'test'
  }
]

inquirer
  .prompt([
    {
      type: 'list',
      name: 'commitAction',
      message: 'Choose the commit action:',
      choices: ['Standard Commit', 'Amend Last Commit']
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of git commit is this?',
      choices: commitTypes,
      when: (answers) => answers.commitAction === 'Standard Commit'
    },
    {
      type: 'input',
      name: 'message',
      message: 'Enter the commit message:',
      validate: function (input) {
        if (input.length < 3) {
          return 'Commit message must be longer than 3 characters.'
        }
        return true
      },
      when: (answers) => answers.commitAction === 'Standard Commit'
    },
    {
      type: 'list',
      name: 'amendType',
      message: 'Do you want to edit the commit message?',
      choices: ['Edit', 'No Edit'],
      when: (answers) => answers.commitAction === 'Amend Last Commit'
    },
    {
      type: 'input',
      name: 'editMessage',
      message: 'Enter the new commit message:',
      when: (answers) => answers.amendType === 'Edit'
    }
  ])
  .then((answers) => {
    let commitCommand

    if (answers.commitAction === 'Amend Last Commit') {
      if (answers.amendType === 'Edit') {
        commitCommand = `git commit --amend -m "${answers.editMessage}"`
      } else {
        commitCommand = 'git commit --amend --no-edit'
      }
    } else {
      commitCommand = `git commit -m "${answers.type}: ${answers.message}"`
    }

    exec(commitCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        return
      }
      console.log(`Stdout: ${stdout}`)
    })
  })
