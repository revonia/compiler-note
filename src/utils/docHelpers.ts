import { before } from "mocha";

export function withDoc() {
  let docOutput: string[];

  function write(text: string) {
    docOutput.push(text);
  }

  function writeMermaid(mermaid: string) {
    write("```mermaid\n" + mermaid + "\n```\n\n");
  }

  before(function () {
    docOutput = [];
    this.docOutput = docOutput;
    write(`# ${this.currentTest.parent.title}\n\n`);
  });

  beforeEach(function () {
    write(`## ${this.currentTest.title}\n\n`);
  });

  return {
    write,
    writeMermaid,
  };
}
