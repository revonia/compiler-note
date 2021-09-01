import { Char, EP, FA, FAEdge, FAState, FAStateMap } from "./FA";

function ep_closure(states: FAState[]) {
  const passed = new Set<FAState>();

  const WorkList = new Set<FAState>(states);

  while (WorkList.size > 0) {
    const state: FAState = WorkList.values().next().value;
    WorkList.delete(state);
    if (passed.has(state)) {
      continue;
    }
    passed.add(state);
    for (const edge of state.edges) {
      if (edge.char === EP) {
        WorkList.add(edge.nextState);
      }
    }
  }

  return Array.from(passed);
}

function Delta(q: FAState[], c: Char) {
  const result = new Set<FAState>();
  for (const state of q) {
    for (const edge of state.edges) {
      if (edge.char === c) {
        result.add(edge.nextState);
      }
    }
  }
  return Array.from(result);
}

export function Subset(
  nfa: FA,
  prefix = "s",
  withOriginStateName = false
): [FA, FAStateMap] {
  const states: FAState[] = [];
  const edges = new Set<FAEdge>();

  const map: FAStateMap = new Map();

  let i = 0;
  let keyMap = new Map<string, FAState>();

  function state(list: FAState[]) {
    let isAccept = false;
    const includes = [];
    for (const s of list) {
      if (s.isAccept) {
        isAccept = true;
      }
      includes.push(s.name);
    }

    includes.sort();
    const key = includes.join(",");

    if (keyMap.has(key)) {
      return keyMap.get(key);
    }

    let index = i++;
    const newState = new FAState(index, isAccept);
    if (withOriginStateName) {
      newState.name = `${prefix}${index}:${key}`;
    } else {
      newState.name = `${prefix}${index}`;
    }

    for (const s of list) {
      map.set(s, newState);
    }

    keyMap.set(key, newState);
    states.push(newState);
    return newState;
  }

  const q0 = ep_closure([nfa.start]);

  const start = state(q0);
  const Q = new Set(q0);

  function belongToQ(list: FAState[]) {
    for (const s of list) {
      if (!Q.has(s)) {
        return false;
      }
    }
    return true;
  }

  const WorkList = [q0];
  const T = new Map();
  T.set(q0, start);

  while (WorkList.length > 0) {
    const q = WorkList.shift();
    const s = T.get(q);

    for (const c of nfa.chars) {
      const t = ep_closure(Delta(q, c));
      if (t.length) {
        const newState = state(t);
        T.set(t, newState);
        edges.add(s.link(c, newState));
        if (!belongToQ(t)) {
          t.map((s) => Q.add(s));
          WorkList.push(t);
        }
      }
    }
  }

  return [
    {
      chars: nfa.chars,
      states,
      edges: Array.from(edges),
      start,
      accepts: states.filter((s) => s.isAccept),
    },
    map,
  ];
}
