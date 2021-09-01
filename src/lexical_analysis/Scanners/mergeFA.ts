import { Char, EP, FA, FAEdge, FAState, FAStateMap } from "../FA";

export function mergeFA(faList: FA[]): [FA, FAStateMap] {
  let i = 0;
  const states: FAState[] = [];
  const edges = new Set<FAEdge>();
  const start = new FAState(i++);
  const chars = new Set<Char>();
  states.push(start);
  const map = new Map<FAState, FAState>();

  const accept = new FAState(i++, true);

  function clone(fa: FA) {
    const accepts: FAState[] = [];
    for (const state of fa.states) {
      const newState = new FAState(i++, state.isAccept);
      if (state.isAccept) {
        accepts.push(newState);
      }
      map.set(state, newState);
    }

    for (const edge of fa.edges) {
      edges.add(map.get(edge.state).link(edge.char, map.get(edge.nextState)));
    }

    for (const char of fa.chars) {
      chars.add(char);
    }

    return {
      accepts,
      start: map.get(fa.start),
    };
  }
  for (const fa of faList) {
    const newFa = clone(fa);
    edges.add(start.link(EP, newFa.start));
    for (const acceptState of newFa.accepts) {
      acceptState.isAccept = false;
      edges.add(acceptState.link(EP, accept));
    }
  }

  return [
    {
      states,
      edges: Array.from(edges),
      start,
      chars: Array.from(chars),
      accepts: [accept],
    },
    map,
  ];
}
