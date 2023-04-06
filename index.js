import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import { keccak256 } from "ethereumjs-util";
import * as bip39 from "bip39";

// Define the questions to ask
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
    mask: "*", // Muestra '*' en lugar de los caracteres ingresados
  },
  {
    type: "password",
    name: "pin",
    message: "Insert PIN",
    mask: "*", // Muestra '*' en lugar de los caracteres ingresados
  },
];

export function generatePrivateKeyFromInput(input) {
  const hash = keccak256(Buffer.from(input.toLowerCase()));
  return hash.toString("hex");
}

export function privateKeyToMnemonic(privateKey) {
  const entropy = Buffer.from(privateKey, "hex");
  const mnemonic = bip39.entropyToMnemonic(entropy);
  return mnemonic;
}

export function generateValues(username, password, pin) {
  username = username.toLowerCase();
  password = password.toLowerCase();
  pin = pin.toLowerCase();
  const input = `${username}${password}${pin}`;
  const privateKey = generatePrivateKeyFromInput(input);
  const mnemonic = privateKeyToMnemonic(privateKey);
  return { privateKey: `0x${privateKey}`, mnemonic };
}

function run() {
  console.clear();
  console.log(chalk.yellow.bold("Welcome to the CLI app!"));

  // Ask the questions
  inquirer.prompt(questions).then((answers) => {
    console.log(chalk.green.bold("Thank you for your input!"));

    // Generate private key and mnemonic
    const { privateKey, mnemonic } = generateValues(
      answers.username,
      answers.password,
      answers.pin
    );

    // Display the private key and mnemonic to the user
    console.log(chalk.cyan.bold("Your private key:"));
    console.log(chalk.cyan(privateKey));
    console.log(chalk.cyan.bold("Your mnemonic:"));
    console.log(chalk.cyan(mnemonic));

    // Ask the user if they want to continue
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
        // If the user wants to continue, run the app again
        if (continueAnswer.continue) {
          run();
        }
      });
  });
}

try {
  if (import.meta.url === `file://${process.argv[1]}`) {
    run();
  }
} catch (error) {
  console.error(error);
}
