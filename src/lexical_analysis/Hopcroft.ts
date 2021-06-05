import { FA, FAEdge, FAState } from "./FA";

type Group = Set<FAState>;
type GroupMap = Map<string, Group>;

export function Hopcroft(
  dfa: FA,
  prefix = "s",
  withOriginStateName = false
): FA {
  function addGroup(map: GroupMap, states: Group) {
    const key = Array.from(states.values())
      .map((s) => s.name)
      .sort()
      .join(",");
    map.set(key, states);
  }

  let T: GroupMap = new Map();
  const nonAccept: Group = new Set();
  const accept: Group = new Set();

  for (const state of dfa.states) {
    (state.isAccept ? accept : nonAccept).add(state);
  }
  addGroup(T, nonAccept);
  addGroup(T, accept);

  let P: GroupMap = new Map();

  function isPEqualsT() {
    if (T.size === P.size) {
      for (const t of T.keys()) {
        if (!P.has(t)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  function doSplit(S: Group): Group[] {
    for (const char of dfa.chars) {
      const a: Group = new Set();
      const b: Group = new Set();
      let nextState: Group;
      for (const s of S) {
        const n = s.move(char);
        if (n) {
          let g: Group;
          for (const p of P.values()) {
            if (p.has(n)) {
              g = p;
            }
          }

          if (!g) {
            continue;
          }

          if (!nextState) {
            nextState = g;
            a.add(s);
            continue;
          }
          if (g === nextState) {
            a.add(s);
          } else {
            b.add(s);
          }
        } else {
          b.add(s);
        }
      }

      if (a.size !== S.size && b.size !== S.size && a.size > 0 && b.size > 0) {
        return [a, b];
      }
    }

    return [S];
  }

  while (!isPEqualsT()) {
    P = T;
    T = new Map();
    for (const p of P.values()) {
      const split = doSplit(p);
      for (const s of split) {
        addGroup(T, s);
      }
    }
  }

  let i = 0;
  const states: FAState[] = [];
  const edges = new Set<FAEdge>();
  const map = new Map<FAState, FAState>();
  let start: FAState;

  function state(group: Group) {
    const n = new FAState(i++);
    const names: string[] = [];

    let isAccept = false;
    for (const s of group) {
      if (s === dfa.start) {
        start = n;
      }
      if (s.isAccept) {
        isAccept = true;
      }
      map.set(s, n);
      names.push(s.name);
    }

    n.isAccept = isAccept;
    n.name = withOriginStateName
      ? `${prefix}${n.i}:${names.join()}`
      : `${prefix}${n.i}`;
    states.push(n);
    return n;
  }

  for (const group of T.values()) {
    state(group);
  }

  for (const edge of dfa.edges) {
    const newState = map.get(edge.state);
    const newNextState = map.get(edge.nextState);
    edges.add(newState.link(edge.char, newNextState));
  }

  return {
    states,
    edges: Array.from(edges),
    start,
    chars: dfa.chars,
  };
}
