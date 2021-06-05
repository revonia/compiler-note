const Mocha = require("mocha");
const path = require("path");
const fs = require("fs");

const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END,
} = Mocha.Runner.constants;

class DocReporter {
  constructor(runner) {
    this._indents = 0;
    const stats = runner.stats;

    const cwd = process.cwd();
    this.toWrite = [];

    runner
      .once(EVENT_RUN_BEGIN, () => {
        console.log("start");
      })
      .on(EVENT_SUITE_BEGIN, () => {
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, (suite) => {
        this.decreaseIndent();
        if (suite.file) {
          const out = suite.ctx.docOutput;
          if (out && out.length) {
            this.toWrite.push({
              file: path.join(
                cwd,
                path
                  .relative(cwd, suite.file)
                  .replace(/^src/, "doc")
                  .replace(/\.test\.ts$/, ".md")
              ),
              content: [...out],
            });
          }
        }
      })
      .on(EVENT_TEST_PASS, (test) => {
        console.log(`${this.indent()}pass: ${test.fullTitle()}`);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(
          `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
        );
      })
      .once(EVENT_RUN_END, () => {
        console.log(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
        if (!stats.failures) {
          this.writeDoc();
        }
      });
  }

  indent() {
    return Array(this._indents).join("  ");
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }

  async writeDoc() {
    console.log(`start write doc: ${this.toWrite.length}`);
    try {
      for (const { file, content } of this.toWrite) {
        console.log(`write "${file}"`);
        await fs.promises.mkdir(path.dirname(file), { recursive: true });
        await fs.promises.writeFile(file, content.join(""), {
          encoding: "utf8",
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = DocReporter;
