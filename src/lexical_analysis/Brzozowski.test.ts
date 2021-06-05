import { and, or, RE } from "./RE";
import { FA2mermaid } from "./FA";
import { RE2FA } from "./Thompson";
import { Subset } from "./Subset";
import { assert } from "chai";
import { withDoc } from "../utils/docHelpers";
import { reverse } from "./Brzozowski";

describe("Brzozowski 构造法", () => {
  const { writeMermaid, whiteHead } = withDoc();

  function doBrzozowski(re: RE) {
    const NFA = RE2FA(re);
    whiteHead("to NFA");
    writeMermaid(FA2mermaid(NFA));

    const rNFA = reverse(NFA);
    whiteHead("reserve(NFA)");
    writeMermaid(FA2mermaid(rNFA));

    const srNFA = Subset(rNFA);
    whiteHead("subset(reserve(NFA))");
    writeMermaid(FA2mermaid(srNFA));

    const rsrNFA = reverse(srNFA);
    whiteHead("reserve(subset(reserve(NFA)))");
    writeMermaid(FA2mermaid(rsrNFA));

    const mDFA = Subset(rsrNFA);
    whiteHead("subset(reserve(subset(reserve(NFA))))");
    const mermaid = FA2mermaid(mDFA);
    writeMermaid(mermaid);

    return {
      mDFA,
      mermaid,
    };
  }

  it("`abc|bc|ad` to minimal DFA", () => {
    const testRE = or(and("abc"), or(and("bc"), and("ad")));
    const { mermaid } = doBrzozowski(testRE);
    assert.equal(
      mermaid,
      `
graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((s0))
s1((s1))
s2((s2))
s3((s3)):::isAccept

0 --> s0
s0 -- a --> s1
s0 -- b --> s2
s1 -- b --> s2
s1 -- d --> s3
s2 -- c --> s3
`
    );
  });

  it("`fee|fie` to minimal DFA", () => {
    const testRE = or(and("fee"), and("fie"));
    const { mermaid } = doBrzozowski(testRE);
    assert.equal(
      mermaid,
      `
graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((s0))
s1((s1))
s2((s2))
s3((s3)):::isAccept

0 --> s0
s0 -- f --> s1
s1 -- e --> s2
s1 -- i --> s2
s2 -- e --> s3
`
    );
  });
});
