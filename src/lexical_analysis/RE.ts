export type RE = RENode | string;

export type REop = typeof and | typeof or | typeof any;

export class RENode {
  constructor(public op: REop, public l: RE, public r?: RE) {}
}

export function and(l: RE, r?: RE) {
  if (!r) {
    if (typeof l === "string") {
      const len = l.length;
      if (len === 1) {
        return l;
      }

      let re = new RENode(and, l[len - 2], l[len - 1]);
      for (let i = len - 3; i >= 0; i--) {
        re = new RENode(and, l[i], re);
      }
      return re;
    }

    return l;
  }

  return new RENode(and, l, r);
}
and.symbol = "+";

export function or(l: RE, r: RE) {
  return new RENode(or, l, r);
}
or.symbol = "|";

export function any(l: RE) {
  return new RENode(any, l);
}
any.symbol = "*";
