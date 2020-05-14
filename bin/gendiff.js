#!/usr/bin/env node
import command from 'commander';

const { program } = command;
program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
