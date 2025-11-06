#!/usr/bin/env node
import help from "./commands/help";
import newCommand from "./commands/new";
import { AVAILABLE_COMMANDS } from "./consts";

const args = process.argv.slice(2);
const command = args[0];
if (command === undefined) {
	console.error("No command specified. Available commands are:");
	console.error(AVAILABLE_COMMANDS);
	process.exit(1);
}

const commandArgs = args.slice(1);
const commands = {
	help,
	new: () => newCommand(commandArgs),
};

if (command in commands) {
	commands[command as keyof typeof commands]();
	process.exit(0);
}
console.error("Unknown command. Available commands are:");
console.error(AVAILABLE_COMMANDS);
process.exit(1);
