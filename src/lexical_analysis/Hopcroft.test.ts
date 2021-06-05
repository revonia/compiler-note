import { and, any, or } from "./RE";
import { FA2mermaid } from "./FA";
import { RE2FA } from "./Thompson";
import { Subset } from "./Subset";
import { assert } from "chai";
import { withDoc } from "../utils/docHelpers";
import { Hopcroft } from "./Hopcroft";

describe("Hopcroft", () => {
  const { writeMermaid } = withDoc();

  const testRE = or(and("f", and("e", "e")), and("f", and("i", "e")));

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
s0 --f--> s1
s1 --e--> s2
s1 --i--> s3
s2 --e--> s4
s3 --e--> s5
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
s0 --f--> s1
s1 --e--> s2
s1 --i--> s2
s2 --e--> s3
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
s0 --a--> s1
s1 --b--> s1
s1 --c--> s1
`
    );
  });
});
