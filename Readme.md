# CLI YourVault

CLI YourVault is a command line interface tool that helps users generate a private key and mnemonic for Ethereum wallets based on their username, password, and PIN. It is a lightweight, easy-to-use application that utilizes the ethereumjs-util, bip39, and other useful libraries.



https://user-images.githubusercontent.com/57494138/230502040-3fb1b7d5-b576-408a-9c0c-c969e7499a42.mp4



## Motivation:
The goal of creating this CLI application is to allow users to generate deterministic private keys and mnemonic phrases using a combination of their username, password, and a PIN. This offers a secure and easy-to-remember way to store and access their private keys across different blockchain networks such as Ethereum, Matic, Binance Smart Chain, and others, without the need to physically or digitally store them.

Being deterministic, the process of generating private keys and mnemonic phrases will always produce the same output, as long as the same input values are used. This allows users to consistently access their funds, without needing to remember a complex private key or store a private key in an insecure location.

With this CLI application, users can easily and securely access their funds, knowing that they will always have access to their private keys and mnemonic phrases, as long as they remember their username, password, and PIN.

It's important to note that this application is not a wallet itself, but rather a tool to generate private keys. For example, if you generate your private key using this CLI application based on the data you entered and then go on a trip, you can download the application again and enter the same data to generate the same private key to import and use wherever you need it.

However, it's crucial to keep in mind that anyone who obtains your username, password, and PIN will also have access to the same private key. Therefore, it's recommended to be careful with this information and keep it secure at all times. This application only generates private keys and does not store them, so it's the responsibility of the user to keep their information safe.

## How to use the CLI app
To use the CLI application, simply enter the username of your choice, along with a password and a pin. This combination will create a unique and irreproducible key that will always be the same when you enter the same three values. This means that you won't have to worry about carrying a key with multiple words on a paper or digital document. Instead, you can store your generated private keys in a safe place and not move them from there. But with the advantage that if you ever need the funds that are there, or for example your house catches fire, you can regenerate these keys as long as you remember your username, password, and the original pin you used.

It's important to note that you can install the CLI application on any device of your choice. As long as you enter the same three values (username, password, and pin), you will get the same private key to access your wallet. This means you can install the application on multiple devices without worrying about losing access to your funds, as long as you remember your combination of username, password, and pin.

For example:

username: mywallet
password: moon
pin: 1234

This combination will create a unique key that you only need to remember.

To use the CLI app, run the script from your terminal, and follow the prompts. Provide your chosen username, password, and PIN when prompted. The app will generate your private key and mnemonic, which you can then use to access your funds on various blockchain networks.

## Features

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

`npm run generate-key`

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
