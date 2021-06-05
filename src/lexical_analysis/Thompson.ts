import { and, any, or, RE } from "./RE";
import { Char, EP, FA, FAEdge, FAState } from "./FA";

export function RE2FA(input: RE): FA {
  let i = 0;
  const chars: Char[] = [];
  const states: FAState[] = [];
  const edges = new Set<FAEdge>();

  function state(isAccept = false) {
    const n = new FAState(i++, isAccept);
    states.push(n);
    return n;
  }

  function buildFA(re: RE): [FAState, FAState] {
    if (typeof re === "string") {
      chars.push(re);
      const a = state();
      const b = state(true);
      edges.add(a.link(re, b));
      return [a, b];
    } else {
      switch (re.op) {
        case and: {
          const [a1, ax] = buildFA(re.l);
          const [b1, bx] = buildFA(re.r);
          ax.isAccept = false;
          edges.add(ax.link(EP, b1));
          return [a1, bx];
        }
        case or: {
          const start = state();
          const end = state(true);
          const [a1, ax] = buildFA(re.l);
          const [b1, bx] = buildFA(re.r);
          edges.add(start.link(EP, a1));
          ax.isAccept = false;
          edges.add(ax.link(EP, end));
          edges.add(start.link(EP, b1));
          bx.isAccept = false;
          edges.add(bx.link(EP, end));
          return [start, end];
        }
        case any: {
          const [a1, ax] = buildFA(re.l);
          const start = state();
          const end = state(true);
          ax.isAccept = false;
          edges.add(start.link(EP, a1));
          edges.add(start.link(EP, end));
          edges.add(ax.link(EP, a1));
          edges.add(ax.link(EP, end));
          return [start, end];
        }
      }
    }
  }

  const [start] = buildFA(input);

  return {
    chars,
    states,
    edges: Array.from(edges),
    start,
  };
}
