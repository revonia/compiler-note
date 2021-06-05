export const EP = Symbol("ε");

export type Char = typeof EP | string;

export interface FA {
  states: FAState[];
  chars: Char[];
  edges: FAEdge[];
  start: FAState;
}

export class FAEdge {
  constructor(
    public state: FAState,
    public char: Char,
    public nextState: FAState
  ) {}
}

export class FAState {
  public edges: FAEdge[] = [];

  constructor(
    public i: number,
    public isAccept = false,
    public name = `s${i}`
  ) {}

  link(char: Char, nextState: FAState) {
    for (const e of this.edges) {
      if (e.char === char && nextState.i === e.nextState.i) {
        return e;
      }
    }
    const edge = new FAEdge(this, char, nextState);
    this.edges.push(edge);
    return edge;
  }

  move(char: Char) {
    for (const edge of this.edges) {
      if (edge.char === char) {
        return edge.nextState;
      }
    }
    return null;
  }
}

export function FA2mermaid(fa: FA, prefix = "s") {
  const { states, edges, start } = fa;

  const stateMap = states.map((state) => {
    return `${prefix}${state.i}((${state.name}))${
      state.isAccept ? ":::isAccept" : ""
    }`;
  });

  const edgeList = edges.map((edge) => {
    const c = edge.char === EP ? "ε" : edge.char;
    return `${prefix}${edge.state.i} -- ${c} --> ${prefix}${edge.nextState.i}`;
  });

  return `
graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
${stateMap.join("\n")}

0 --> ${prefix}${start.i}
${edgeList.join("\n")}
`;
}
