# Brzozowski 构造法

## `abc|bc|ad` to minimal DFA

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

0 --> s0
s2 -- a --> s3
s4 -- b --> s5
s6 -- c --> s7
s5 -- ε --> s6
s3 -- ε --> s4
s10 -- b --> s11
s12 -- c --> s13
s11 -- ε --> s12
s14 -- a --> s15
s16 -- d --> s17
s15 -- ε --> s16
s8 -- ε --> s10
s13 -- ε --> s9
s8 -- ε --> s14
s17 -- ε --> s9
s0 -- ε --> s2
s7 -- ε --> s1
s0 -- ε --> s8
s9 -- ε --> s1

```

### reserve(NFA)

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

0 --> s0
s0 -- ε --> s2
s4 -- a --> s3
s6 -- b --> s5
s8 -- c --> s7
s7 -- ε --> s6
s5 -- ε --> s4
s12 -- b --> s11
s14 -- c --> s13
s13 -- ε --> s12
s16 -- a --> s15
s18 -- d --> s17
s17 -- ε --> s16
s11 -- ε --> s9
s10 -- ε --> s14
s15 -- ε --> s9
s10 -- ε --> s18
s3 -- ε --> s1
s2 -- ε --> s8
s9 -- ε --> s1
s2 -- ε --> s10

```

### subset(reserve(NFA))

```mermaid

graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((s0))
s1((s1))
s2((s2))
s3((s3)):::isAccept
s4((s4)):::isAccept
s5((s5)):::isAccept

0 --> s0
s0 -- c --> s1
s0 -- d --> s2
s1 -- b --> s3
s2 -- a --> s4
s3 -- a --> s5

```

### reserve(subset(reserve(NFA)))

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

0 --> s0
s0 -- ε --> s4
s0 -- ε --> s5
s0 -- ε --> s6
s2 -- c --> s1
s3 -- d --> s1
s4 -- b --> s2
s5 -- a --> s3
s6 -- a --> s4

```

### subset(reserve(subset(reserve(NFA))))

```mermaid

graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((s0))
s1((s1))
s2((s2))
s3((s3)):::isAccept

0 --> s0
s0 -- a --> s1
s0 -- b --> s2
s1 -- b --> s2
s1 -- d --> s3
s2 -- c --> s3

```

## `fee|fie` to minimal DFA

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

0 --> s0
s2 -- f --> s3
s4 -- e --> s5
s6 -- e --> s7
s5 -- ε --> s6
s3 -- ε --> s4
s8 -- f --> s9
s10 -- i --> s11
s12 -- e --> s13
s11 -- ε --> s12
s9 -- ε --> s10
s0 -- ε --> s2
s7 -- ε --> s1
s0 -- ε --> s8
s13 -- ε --> s1

```

### reserve(NFA)

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

0 --> s0
s0 -- ε --> s2
s4 -- f --> s3
s6 -- e --> s5
s8 -- e --> s7
s7 -- ε --> s6
s5 -- ε --> s4
s10 -- f --> s9
s12 -- i --> s11
s14 -- e --> s13
s13 -- ε --> s12
s11 -- ε --> s10
s3 -- ε --> s1
s2 -- ε --> s8
s9 -- ε --> s1
s2 -- ε --> s14

```

### subset(reserve(NFA))

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
s0 -- e --> s1
s1 -- e --> s2
s1 -- i --> s3
s2 -- f --> s4
s3 -- f --> s5

```

### reserve(subset(reserve(NFA)))

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

0 --> s0
s0 -- ε --> s5
s0 -- ε --> s6
s2 -- e --> s1
s3 -- e --> s2
s4 -- i --> s2
s5 -- f --> s3
s6 -- f --> s4

```

### subset(reserve(subset(reserve(NFA))))

```mermaid

graph LR
classDef start display:none;
classDef isAccept stroke-width:4px;

0:::start
s0((s0))
s1((s1))
s2((s2))
s3((s3)):::isAccept

0 --> s0
s0 -- f --> s1
s1 -- e --> s2
s1 -- i --> s2
s2 -- e --> s3

```

