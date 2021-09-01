import { EP, FA, FAEdge, FAState } from "./FA";
import { Subset } from "./Subset";

export function reverse(fa: FA): FA {
  let i = 0;
  const states: FAState[] = [];
  const edges = new Set<FAEdge>();
  const start = new FAState(i++);
  states.push(start);

  const map = new Map<FAState, FAState>();

  for (const state of fa.states) {
    const newState = new FAState(i++);
    states.push(newState);
    map.set(state, newState);
    if (state.isAccept) {
      edges.add(start.link(EP, newState));
    }

    if (state === fa.start) {
      newState.isAccept = true;
    }
  }

  for (const edge of fa.edges) {
    const a = map.get(edge.state);
    const b = map.get(edge.nextState);
    edges.add(b.link(edge.char, a));
  }

  return {
    states,
    start,
    chars: fa.chars,
    edges: Array.from(edges),
    accepts: states.filter((s) => s.isAccept),
  };
}

export function Brzozowski(NFA: FA) {
  const rNFA = reverse(NFA);
  const [srNFA] = Subset(rNFA);
  const rsrNFA = reverse(srNFA);
  return Subset(rsrNFA)[0];
}
