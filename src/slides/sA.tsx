import { makeSlide } from "../hooks";
import { s, s0, toSubscript } from "../nodes";
import { Network, rewardNode } from "../Network";
import { appear, useSlide } from "../slides";
import { tex } from "../Katex";

const Anode = (i: number, j: number, label = s(i, j), end = i == j) => ({
  x: j * 100,
  y: i * 75 + 100,
  id: s(i, j),
  label,
  ...(end ? rewardNode : {}),
});
const Anodes = (i: number) =>
  Array.from({ length: i + 1 }, (_, k) => Anode(k, i));
const Aedges = (i: number) => [
  {
    from: s0,
    to: s(0, i),
    arrows: "to",
    label: `α${toSubscript(i)}`,
  },
  ...Array.from({ length: i }, (_, k) => ({
    from: s(k, i),
    to: s(k + 1, i),
    arrows: "to",
    color: "lightgray",
  })),
  {
    from: s(i, i),
    to: s(i, i),
    arrows: "to",
    color: "lightgray",
  },
];

type State = {
  highlights?: string[];
  infsup?: ("show" | "eq?" | "eqInf")[];
  supinf?: ("show" | "eq?" | "eq0")[];
  pickS1?: boolean;
  pickN1?: boolean;
  pickS2?: boolean;
  pickN2?: boolean;
  showLt?: boolean;
};

const sequence: State[] = [
  {},
  { infsup: ["show"] },
  { infsup: ["show", "eq?"] },
  // { highlights: [s0] },
  { pickS1: true, highlights: [s(0, 4)] },
  { pickN1: true },
  { highlights: [s(0, 4), s(1, 4), s(2, 4), s(3, 4), s(4, 4)] },
  { infsup: ["show", "eqInf"] },
  { pickS1: false, pickN1: false },
  { highlights: [], supinf: ["show"] },
  {
    pickN2: true,
    highlights: [
      s(0),
      // 0's
      s(0, 0),
      // 1's
      s(0, 1),
      s(1, 1),
      // 2's
      s(0, 2),
      s(1, 2),
      s(2, 2),
      // 3's
      s(0, 3),
      s(1, 3),
      s(2, 3),
      // 4's
      s(0, 4),
      s(1, 4),
      s(2, 4),
      // 5's
      s(0, 5),
      s(1, 5),
      s(2, 5),
      // i's
      s(0, 7),
    ],
  },
  {
    pickS2: true,
    highlights: [
      // s(0),
      // 4's
      s(0, 4),
      s(1, 4),
      s(2, 4),
    ],
  },
  { supinf: ["show", "eq0"] },
  { showLt: true, highlights: [], pickS1: false, pickN2: false },
];

export const sA = makeSlide(sequence.length, () => {
  const { step } = useSlide();

  const state = sequence.slice(0, step + 1).reduce((acc, s) => ({
    ...acc,
    ...s,
  }));

  return (
    <div>
      <appear.div className="text-4xl flex justify-center gap-32">
        <appear.div show={!!state.supinf}>
          {tex`\displaystyle \iSup_{n \mem \N} \iInf_{\McS \mem \MfS} \EC{n}{\McS}`}
          <appear.span
            show={state.supinf?.includes("eq0")}
          >{tex`~=~ 0`}</appear.span>
        </appear.div>
        <appear.span show={state.showLt}>{tex`<`}</appear.span>
        <appear.div show={!!state.infsup}>
          {tex`\displaystyle \iInf_{\McS \mem \MfS} \iSup_{n \mem \N} \EC{n}{\McS}(s_0)`}
          <appear.span
            show={state.infsup?.includes("eq?")}
          >{tex`~=~ ?`}</appear.span>
          <appear.span
            show={state.infsup?.includes("eqInf")}
          >{tex`~=~ \infty`}</appear.span>
        </appear.div>
      </appear.div>
      <appear.div className="h-[40vw] w-[70vw]">
        <Network
          highlighted={state.highlights}
          nodes={[
            {
              x: 0,
              y: 0,
              id: s0,
              label: s0,
            },
            ...Anodes(0),
            ...Anodes(1),
            ...Anodes(2),
            ...Anodes(3),
            ...Anodes(4),
            ...Anodes(5),
            {
              ...Anode(0, 6, "..."),
              borderWidth: 0,
              color: "transparent",
              font: { color: "gray" },
            },
            Anode(0, 7, s(0, "i")),
            { ...Anode(6, 7, s("i", "i"), true) },
            {
              ...Anode(0, 8, "..."),
              borderWidth: 0,
              color: "transparent",
              font: { color: "gray" },
            },
          ]}
          edges={[
            ...Aedges(0),
            ...Aedges(1),
            ...Aedges(2),
            ...Aedges(3),
            ...Aedges(4),
            ...Aedges(5),
            {
              from: s0,
              to: s(0, 6),
              arrows: "to",
              label: "...",
              color: "transparent",
            },
            { from: s0, to: s(0, 7), arrows: "to", label: "αᵢ" },
            {
              from: s(0, 7),
              to: s(6, 7),
              dashes: [4, 10],
              arrows: "to",
            },
            {
              from: s(6, 7),
              to: s(6, 7),
              arrows: "to",
              color: "lightgray",
            },
          ]}
        />
      </appear.div>
      <appear.div
        show={state.pickS1}
        className="flex justify-center text-3xl gap-4 mt-5"
      >
        <appear.span>pick {tex`\McS(s_0) = \alpha_4`}</appear.span>
        <appear.span show={state.pickN1}>and then {tex`n = 5`}</appear.span>
      </appear.div>
      <appear.div
        show={state.pickN2}
        className="flex justify-center text-3xl gap-4 mt-5"
      >
        <appear.span>pick {tex`n = 4`}</appear.span>
        <appear.span show={state.pickS2}>
          and then {tex`\McS(s_0) = \alpha_4`}
        </appear.span>
      </appear.div>
    </div>
  );
});
