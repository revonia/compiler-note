import { and, any, or } from "./RE";
import { FA2mermaid } from "./FA";
import { RE2FA } from "./Thompson";
import { Subset } from "./Subset";
import { assert } from "chai";
import { withDoc } from "../utils/docHelpers";
import { Hopcroft } from "./Hopcroft";

describe("Hopcroft", () => {
  const { writeMermaid, whiteHead } = withDoc();

  const testRE = or(and("fee"), and("fie"));

  it("`fee|fie` to DFA", function () {
    const NFA = RE2FA(testRE);
    const DFA = Subset(NFA);
    const mermaid = FA2mermaid(DFA);
    writeMermaid(mermaid);

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
s3((s3))
s4((s4)):::isAccept
s5((s5)):::isAccept

0 --> s0
s0 -- f --> s1
s1 -- e --> s2
s1 -- i --> s3
s2 -- e --> s4
s3 -- e --> s5
`
    );
  });

  it("`fee|fie` to minimal DFA", () => {
    const NFA = RE2FA(testRE);
    const DFA = Subset(NFA);
    const mDFA = Hopcroft(DFA, "d", true);

    const mermaid = FA2mermaid(mDFA);
    writeMermaid(mermaid);

    assert.equal(
      mermaid,
      `
graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((d0:s0))
s1((d1:s1))
s2((d2:s2,s3))
s3((d3:s4,s5)):::isAccept

0 --> s0
s0 -- f --> s1
s1 -- e --> s2
s1 -- i --> s2
s2 -- e --> s3
`
    );
  });

  it("`a(b|c)*` to minimal DFA", () => {
    const testRE = and("a", any(or("b", "c")));
    const NFA = RE2FA(testRE);
    const DFA = Subset(NFA);
    const mDFA = Hopcroft(DFA, "d", true);

    const mermaid = FA2mermaid(mDFA);
    writeMermaid(mermaid);

    assert.equal(
      mermaid,
      `
graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((d0:s0))
s1((d1:s1,s2,s3)):::isAccept

0 --> s0
s0 -- a --> s1
s1 -- b --> s1
s1 -- c --> s1
`
    );
  });

  it("`who|what|where` to minimal DFA", () => {
    const testRE = or(or(and("who"), and("what")), and("where"));
    const NFA = RE2FA(testRE);
    whiteHead("to NFA");
    writeMermaid(FA2mermaid(NFA));

    const DFA = Subset(NFA);
    whiteHead("to DFA");
    writeMermaid(FA2mermaid(DFA));

    const mDFA = Hopcroft(DFA);
    whiteHead("to minimal DFA");
    const mermaid = FA2mermaid(mDFA);
    writeMermaid(mermaid);

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
s3((s3))
s4((s4))
s5((s5))
s6((s6)):::isAccept

0 --> s0
s0 -- w --> s1
s1 -- h --> s2
s2 -- o --> s6
s2 -- a --> s3
s2 -- e --> s5
s3 -- t --> s6
s5 -- r --> s4
s4 -- e --> s6
`
    );
  });

  it("`there|here` to minimal DFA", () => {
    const testRE = or(and("there"), and("here"));
    const NFA = RE2FA(testRE);
    const DFA = Subset(NFA);
    const mDFA = Hopcroft(DFA);

    const mermaid = FA2mermaid(mDFA);
    writeMermaid(mermaid);

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
s3((s3))
s4((s4))
s5((s5)):::isAccept

0 --> s0
s0 -- t --> s1
s0 -- h --> s2
s1 -- h --> s2
s2 -- e --> s4
s4 -- r --> s3
s3 -- e --> s5
`
    );
  });
});
