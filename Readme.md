# CLI YourVault

CLI YourVault is a command line interface tool that helps users generate a private key and mnemonic for Ethereum wallets based on their username, password, and PIN. It is a lightweight, easy-to-use application that utilizes the ethereumjs-util, bip39, and other useful libraries.

### Features

Interactive questions to input username, password, and PIN
Generation of private key and mnemonic based on user input
Display private key and mnemonic on the console
Easy to run and modify
Getting Started
These instructions will help you set up and run CLI YourVault on your local machine.

# Prerequisites

You need to have Node.js installed on your computer

### Installation

1. Clone this repository:
2. cd cli-yourvault
3. npm install

## Usage

To run the application, use the following command:

`npm generate-key`

This will start the CLI app and prompt you for your username, password, and PIN. After entering your details, the app will display your private key and mnemonic.

### Dependencies

bip39 - A library for generating mnemonic phrases and converting them to entropy and private keys
chalk - A library for styling console output
ethereum-cryptography - A collection of Ethereum cryptography utilities
ethereumjs-util - A collection of utility functions for Ethereum
inquirer - A library for creating interactive command line interfaces
yargs - A library for parsing command line arguments
Development
To run tests, use the following command:

`npm test`

- [Lucas Zanek](https://github.com/LucasZNK)
  License
  This project is licensed under the ISC License.
