#! /usr/bin/env node

const { program } = require('commander')
const list = require('./lib/list')
const which = require('./lib/which')
const remove = require('./lib/remove')
const prune = require('./lib/prune')
const install_version = require('./lib/install_version')
const ls_remote = require('./lib/list-remote')

program
  .command('ls')
  .description('List all installed versions.')
  .action(list)

program
  .command('run')
  .description('Execute downloaded Node.js <version> with [args ...]')
  .arguments('<version>', '[...args]')
  .action(() => {
    console.log('run')
  })

program
  .command('which')
  .description('Output path for downloaded node <version>')
  .argument('<version>', 'version')
  .action(which)

program
  .command('exec')
  .description('Execute command with modified PATH, so downloaded node <version> and npm first')
  .arguments('<version>', '[...args]')
  .action(() => {
    console.log('exec')
  })

program
  .command('rm')
  .description('Remove the given downloaded version(s)')
  .argument('<versions...>')
  .action((versions) => {
    remove(versions)
  })

program
  .command('prune')
  .description('Remove all downloaded versions except the installed version')
  .action(prune)

program
  .command('install')
  .description('Install Node.js <version> (downloading if necessary)')
  .argument('<version>', 'Install version')
  .action((version) => {
      install_version(version)
  })

program
  .command('ls-remote')
  .description('Install Node.js <version> (downloading if necessary)')
  .argument('<version>', 'List version')
  .action((version) => {
    ls_remote(version)
  })

program
  .arguments('<version>')
  .action(function (version) {
    install_version(version)
  })

program.parse(process.argv)

