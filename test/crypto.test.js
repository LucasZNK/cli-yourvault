import { expect } from "chai";
import {
  generateValues,
  generatePrivateKeyFromInput,
  privateKeyToMnemonic,
} from "../index.js";
import { copyToClipboard } from "../index.js";
import sinon from "sinon";
import clipboardy from "clipboardy";

describe("generateValues function", () => {
  it("should generate the same private key and mnemonic for the same input", () => {
    const input = {
      username: "user1",
      password: "Pass1",
      pin: "1234",
    };

    const result1 = generateValues(input.username, input.password, input.pin);
    const result2 = generateValues(input.username, input.password, input.pin);

    expect(result1).to.deep.equal(result2);
  });

  it("should generate different private keys and mnemonics for different inputs", () => {
    const input1 = {
      username: "user1",
      password: "Pass1",
      pin: "1234",
    };

    const input2 = {
      username: "user2",
      password: "Pass2",
      pin: "5678",
    };

    const result1 = generateValues(
      input1.username,
      input1.password,
      input1.pin
    );
    const result2 = generateValues(
      input2.username,
      input2.password,
      input2.pin
    );

    expect(result1).not.to.deep.equal(result2);
  });

  it("should be case-insensitive for username, password, and pin", () => {
    const input1 = {
      username: "User1",
      password: "Pass1",
      pin: "1234",
    };

    const input2 = {
      username: "user1",
      password: "pass1",
      pin: "1234",
    };

    const result1 = generateValues(
      input1.username,
      input1.password,
      input1.pin
    );
    const result2 = generateValues(
      input2.username,
      input2.password,
      input2.pin
    );

    expect(result1).to.deep.equal(result2);
  });

  it("should work with special characters", () => {
    const input1 = {
      username: "user#1",
      password: "pass$1",
      pin: "@1234",
    };

    const input2 = {
      username: "user#2",
      password: "pass$2",
      pin: "@5678",
    };

    const result1 = generateValues(
      input1.username,
      input1.password,
      input1.pin
    );
    const result2 = generateValues(
      input2.username,
      input2.password,
      input2.pin
    );

    expect(result1).not.to.deep.equal(result2);
  });

  it("should work with empty strings", () => {
    const input = {
      username: "",
      password: "",
      pin: "",
    };

    const result = generateValues(input.username, input.password, input.pin);

    expect(result.privateKey).to.not.equal("");
    expect(result.mnemonic).to.not.equal("");
  });

  it("should work with Unicode characters", () => {
    const input1 = {
      username: "😃🏠",
      password: "🔑1",
      pin: "1🐶34",
    };
    const input2 = {
      username: "😺🏠",
      password: "🔑2",
      pin: "5🐱78",
    };

    const result1 = generateValues(
      input1.username,
      input1.password,
      input1.pin
    );
    const result2 = generateValues(
      input2.username,
      input2.password,
      input2.pin
    );

    expect(result1).not.to.deep.equal(result2);
  });

  it("should generate private key and mnemonic with sufficient length", () => {
    const input = {
      username: "user1",
      password: "pass1",
      pin: "1234",
    };

    const result = generateValues(input.username, input.password, input.pin);

    expect(result.privateKey.length).to.be.greaterThanOrEqual(64);
    expect(result.mnemonic.split(" ").length).to.be.greaterThanOrEqual(12);
  });

  it("should not return the same mnemonic for different inputs", () => {
    const input1 = {
      username: "user1",
      password: "Pass1",
      pin: "1234",
    };
    const input2 = {
      username: "user2",
      password: "Pass2",
      pin: "5678",
    };
    const result1 = generateValues(
      input1.username,
      input1.password,
      input1.pin
    );
    const result2 = generateValues(
      input2.username,
      input2.password,
      input2.pin
    );

    it("should not return the same private key for different inputs", () => {
      const input1 = {
        username: "user1",
        password: "Pass1",
        pin: "1234",
      };
      const input2 = {
        username: "user2",
        password: "Pass2",
        pin: "5678",
      };
      const result1 = generateValues(
        input1.username,
        input1.password,
        input1.pin
      );
      const result2 = generateValues(
        input2.username,
        input2.password,
        input2.pin
      );

      expect(result1.privateKey).not.to.deep.equal(result2.privateKey);
    });

    it("should handle input strings with leading/trailing white spaces", () => {
      const input1 = {
        username: "user1",
        password: "Pass1",
        pin: "1234",
      };
      const input2 = {
        username: " user1",
        password: " Pass1 ",
        pin: " 1234 ",
      };
      const result1 = generateValues(
        input1.username,
        input1.password,
        input1.pin
      );
      const result2 = generateValues(
        input2.username,
        input2.password,
        input2.pin
      );

      expect(result1).to.deep.equal(result2);
    });

    expect(result1.mnemonic).not.to.deep.equal(result2.mnemonic);
  });

  it("should handle input strings with leading/trailing white spaces for empty inputs", () => {
    const input = {
      username: "   ",
      password: "",
      pin: "  ",
    };
    const result = generateValues(input.username, input.password, input.pin);

    expect(result.privateKey.length).to.be.greaterThanOrEqual(64);
    expect(result.mnemonic.split(" ").length).to.be.greaterThanOrEqual(12);
  });

  it("should handle input strings with new lines", () => {
    const input1 = {
      username: "user1\n",
      password: "Pass1",
      pin: "1234",
    };
    const input2 = {
      username: "user1",
      password: "\nPass1",
      pin: "1234",
    };
    const result1 = generateValues(
      input1.username,
      input1.password,
      input1.pin
    );
    const result2 = generateValues(
      input2.username,
      input2.password,
      input2.pin
    );

    expect(result1).to.deep.equal(result2);
  });

  it("should return a valid private key", () => {
    const input = "testinput";
    const expectedOutput =
      "f01eeedc8e66ed43ab286d0665cdbeb73ba03afe9a2b445edf6a363aac18007d";
    const actualOutput = generatePrivateKeyFromInput(input);
    expect(actualOutput).to.equal(expectedOutput);
  });

  it("should'nt return the key for testinput", () => {
    const input = "testinput123123";
    const expectedOutput =
      "f01eeedc8e66ed43ab286d0665cdbeb73ba03afe9a2b445edf6a363aac18007d";
    const actualOutput = generatePrivateKeyFromInput(input);
    expect(actualOutput).not.to.be.equal(expectedOutput);
  });

  it("should return a valid mnemonic phrase", () => {
    const privateKey =
      "48b29f1e81fb3e356ae3f745f23aeb906d6cf52b6fb986b6fa70b9f86b679785";
    const expectedOutput =
      "emerge neutral sibling advance recycle boy process leave echo mushroom road camp strategy kind pumpkin warm mammal result order initial mammal record fun roof";
    const actualOutput = privateKeyToMnemonic(privateKey);
    expect(actualOutput).to.equal(expectedOutput);
  });
});

describe("copyToClipboard function", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should copy the private key to clipboard", async () => {
    const clipboardWriteStub = sinon.stub(clipboardy, "write");
    const option = "Private key";
    const privateKey =
      "0x48b29f1e81fb3e356ae3f745f23aeb906d6cf52b6fb986b6fa70b9f86b679785";
    const mnemonic =
      "emerge neutral sibling advance recycle boy process leave echo mushroom road camp strategy kind pumpkin warm mammal result order initial mammal record fun roof";

    await copyToClipboard(option, privateKey, mnemonic, clipboardy);

    expect(clipboardWriteStub.calledOnceWith(privateKey)).to.be.true;
  });

  it("should copy the mnemonic to clipboard", async () => {
    const clipboardWriteStub = sinon.stub(clipboardy, "write");
    const option = "Mnemonic";
    const privateKey =
      "0x48b29f1e81fb3e356ae3f745f23aeb906d6cf52b6fb986b6fa70b9f86b679785";
    const mnemonic =
      "emerge neutral sibling advance recycle boy process leave echo mushroom road camp strategy kind pumpkin warm mammal result order initial mammal record fun roof";

    await copyToClipboard(option, privateKey, mnemonic, clipboardy);

    expect(clipboardWriteStub.calledOnceWith(mnemonic)).to.be.true;
  });
});
