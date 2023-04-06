// This module generates a private key and mnemonic from user input.
// The user is prompted for a username, password, and PIN.
// The private key is generated using the keccak256 hash function,
// and the mnemonic is derived from the private key using BIP39.

import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import { keccak256 } from "ethereumjs-util";
import * as bip39 from "bip39";

// Define the questions for the user input prompt.
const questions = [
  {
    type: "input",
    name: "username",
    message: "Insert your username",
  },
  {
    type: "password",
    name: "password",
    message: "Insert password",
    mask: "*",
  },
  {
    type: "password",
    name: "pin",
    message: "Insert PIN",
    mask: "*",
  },
];

// Generate the private key from the user input.
export function generatePrivateKeyFromInput(input) {
  const hash = keccak256(Buffer.from(input.toLowerCase()));
  return hash.toString("hex");
}

// Convert the private key to a mnemonic using BIP39.
export function privateKeyToMnemonic(privateKey) {
  const entropy = Buffer.from(privateKey, "hex");
  const mnemonic = bip39.entropyToMnemonic(entropy);
  return mnemonic;
}

// Generate the private key and mnemonic based on the user's input.
export function generateValues(username, password, pin) {
  username = username.toLowerCase();
  password = password.toLowerCase();
  pin = pin.toLowerCase();
  const input = `${username}${password}${pin}`;
  const privateKey = generatePrivateKeyFromInput(input);
  const mnemonic = privateKeyToMnemonic(privateKey);
  return { privateKey: `0x${privateKey}`, mnemonic };
}

// Main function to prompt user input, generate values, and display them.
function run() {
  console.clear();
  console.log(chalk.yellow.bold("Welcome to YourVault CLI version!"));

  inquirer.prompt(questions).then((answers) => {
    console.log(chalk.green.bold("Thank you for your input!"));

    const { privateKey, mnemonic } = generateValues(
      answers.username,
      answers.password,
      answers.pin
    );

    console.log(chalk.cyan.bold("Your private key:"));
    console.log(chalk.cyan(privateKey));
    console.log(chalk.cyan.bold("Your mnemonic:"));
    console.log(chalk.cyan(mnemonic));

    inquirer
      .prompt([
        {
          type: "confirm",
          name: "continue",
          message: "Do you want to continue?",
          default: true,
        },
      ])
      .then((continueAnswer) => {
        if (continueAnswer.continue) {
          run();
        }
      });
  });
}

// Run the main function if this script is executed directly.
try {
  if (import.meta.url === `file://${process.argv[1]}`) {
    run();
  }
} catch (error) {
  console.error(error);
}
