export type RE = RENode | string

export type REop = typeof and | typeof or | typeof any

export class RENode {
  constructor(
    public op: REop,
    public l: RE,
    public r?: RE
  ) {
  }
}

export function and(l: RE, r: RE) {
  return new RENode(and, l, r)
}
and.symbol = '+'

export function or(l: RE, r: RE) {
  return new RENode(or, l, r)
}
or.symbol = '|'

export function any(l: RE) {
  return new RENode(any, l)
}
any.symbol = '*'
