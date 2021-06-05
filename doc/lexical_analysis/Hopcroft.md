# Hopcroft

## `fee|fie` to DFA

```mermaid

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

```

## `fee|fie` to minimal DFA

```mermaid

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

```

## `a(b|c)*` to minimal DFA

```mermaid

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

```

## `who|what|where` to minimal DFA

### to NFA

```mermaid

graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((s0))
s1((s1)):::isAccept
s2((s2))
s3((s3))
s4((s4))
s5((s5))
s6((s6))
s7((s7))
s8((s8))
s9((s9))
s10((s10))
s11((s11))
s12((s12))
s13((s13))
s14((s14))
s15((s15))
s16((s16))
s17((s17))
s18((s18))
s19((s19))
s20((s20))
s21((s21))
s22((s22))
s23((s23))
s24((s24))
s25((s25))
s26((s26))
s27((s27))

0 --> s0
s4 -- w --> s5
s6 -- h --> s7
s8 -- o --> s9
s7 -- ε --> s8
s5 -- ε --> s6
s10 -- w --> s11
s12 -- h --> s13
s14 -- a --> s15
s16 -- t --> s17
s15 -- ε --> s16
s13 -- ε --> s14
s11 -- ε --> s12
s2 -- ε --> s4
s9 -- ε --> s3
s2 -- ε --> s10
s17 -- ε --> s3
s18 -- w --> s19
s20 -- h --> s21
s22 -- e --> s23
s24 -- r --> s25
s26 -- e --> s27
s25 -- ε --> s26
s23 -- ε --> s24
s21 -- ε --> s22
s19 -- ε --> s20
s0 -- ε --> s2
s3 -- ε --> s1
s0 -- ε --> s18
s27 -- ε --> s1

```

### to DFA

```mermaid

graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((s0))
s1((s1))
s2((s2))
s3((s3)):::isAccept
s4((s4))
s5((s5))
s6((s6)):::isAccept
s7((s7))
s8((s8)):::isAccept

0 --> s0
s0 -- w --> s1
s1 -- h --> s2
s2 -- o --> s3
s2 -- a --> s4
s2 -- e --> s5
s4 -- t --> s6
s5 -- r --> s7
s7 -- e --> s8

```

### to minimal DFA

```mermaid

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

```

## `there|here` to minimal DFA

```mermaid

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

```

