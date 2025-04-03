import { makeSlide } from "../hooks";
import { s } from "../nodes";
import { Network, rewardNode } from "../Network";
import { tex } from "../Katex";
import { appear, useSlide } from "../slides";

type State = {
  basic?: boolean;
  showProb?: boolean;
  ECDef?: "just" | "extended";
  highlights?: string[];
  showECL?: boolean;
  showECLres?: boolean;
  showECS?: boolean;
  showECSres?: boolean;
  showDiv?: boolean;
  showGt?: boolean;
  compG?: (
    | "ECG"
    | "ECH"
    | "sup"
    | "inf"
    | "eqSum"
    | "eq1"
    | "infH"
    | "infL"
    | "eq?"
    | "eq12"
    | "history"
  )[];
  compL?: ("eq?" | "eqSum" | "eq1")[];
  showP?: boolean;
  showS?: number;
};

const sequence: State[] = [
  { basic: true },
  { showProb: true },
  { ECDef: "extended" },
  { ECDef: "just" },
  { highlights: [s(1)] },
  { compG: ["ECG"] },
  { compG: ["ECG", "sup"] },
  { compG: ["ECG", "sup", "eqSum"] },
  { compG: ["ECG", "sup", "eqSum", "eq1"] },
  // { compG: ["ECG", "sup", "eqSum", "eq1", "inf"] },
  { highlights: [] },
  // { basic: false, compG: ["ECG", "sup", "inf", "eq?"] },
  { basic: false, compG: ["ECG", "sup", "eq?"] },
  { compG: ["ECG", "sup", "inf", "eq?"] },
  { compG: ["ECH", "sup", "infH", "eq?", "history"] },
  { ECDef: "extended" },
  { compL: ["eq?"] },
  { compL: ["eqSum"] },
  { compL: ["eqSum", "eq1"] },
  { ECDef: "just" },
  { showP: true },
  { showS: 1 },
  { showS: 2 },
  { showS: 3 },
  { showS: 4 },
  { compG: ["ECH", "sup", "infH", "eq12", "history"] },
  { showGt: true },
  {
    showS: void 0,
    showP: void 0,
    showProb: void 0,
    ECDef: void 0,
    compL: ["eq1"],
  },
];

const s2 = String.raw`{\color{${rewardNode.color}}{s_2}}`;

const p = (a: string) => String.raw`2^{-2^{-${a}}}`;

export const sC = makeSlide(sequence.length, () => {
  const { step } = useSlide();

  const state = sequence.slice(0, step + 1).reduce((acc, s) => ({
    ...acc,
    ...s,
  }));

  return (
    <appear.div className="flex justify-center flex-col items-center">
      <appear.div
        show={!!state.ECDef}
        className="flex justify-center flex-col items-center gap-5"
      >
        <appear.span className="text-3xl">
          {tex`\EC{n}{\McG} \quad=\quad \lambda s. \displaystyle \sum_{\pi \mem \PathsEq{n}(s)} \Prob_{\McG}(\pi) \cdot \Cost(\pi)`}
        </appear.span>
        <appear.div
          show={state.ECDef == "extended"}
          className="flex gap-16 text-2xl"
        >
          <appear.span>{tex`\Prob_\McG(\pi) = \displaystyle \prod_{0 \,< i \,< |\pi| - 1} \P(s_i, \McG(s_0 \dots s_i), s_{i+1})`}</appear.span>
          <appear.span>
            {tex`\Cost(\pi) = \displaystyle \sum_{0 \,\le\, i \,<\, |\pi|} \cost(\pi)`}
          </appear.span>
        </appear.div>
      </appear.div>
      <div className="text-3xl mt-20 flex gap-16 items-center">
        <appear.div className="flex flex-col items-center">
          <appear.div
            show={state.compG?.includes("history")}
            className="text-4xl tracking-wide text-McS-500"
          >
            With history
          </appear.div>
          <appear.div className="flex gap-2 items-center">
            <appear.span show={state.compG?.includes("inf")}>
              {tex`\iInf_{\McG \mem \MfG}`}
            </appear.span>
            <appear.span show={state.compG?.includes("infH")}>
              {tex`\iInf_{\McS \mem \MfS}`}
            </appear.span>
            <appear.span show={state.compG?.includes("sup")}>
              {tex`\iSup_{n \mem \N}`}{" "}
            </appear.span>
            <appear.span show={state.compG?.includes("ECG")}>
              {tex`\EC{n}{\McG}(s_1)`}
            </appear.span>
            <appear.span show={state.compG?.includes("ECH")}>
              {tex`\EC{n}{\McS}(s_1)`}
            </appear.span>
            <appear.span show={state.compG?.includes("eqSum")}>
              {tex`~=~ \displaystyle \sum_{i = 1} \dfrac{1}{2^i}`}
            </appear.span>
            <appear.span show={state.compG?.includes("eq1")}>
              {tex`= 1`}
            </appear.span>
            <appear.span show={state.compG?.includes("eq?")}>
              {tex`= ?`}
            </appear.span>
            <appear.span show={state.compG?.includes("eq12")}>
              {tex`\le \dfrac{1}{2}`}
            </appear.span>
          </appear.div>
        </appear.div>
        <appear.div show={state.showGt}>
          <div className="text-transparent select-none text-4xl">F</div>
          {tex`<`}
        </appear.div>
        <appear.div className="flex flex-col items-center">
          <appear.div
            show={!!state.compL && state.compG?.includes("history")}
            className="text-4xl tracking-wide text-McL-500"
          >
            Without history
          </appear.div>
          <appear.div className="flex gap-2 items-center" show={!!state.compL}>
            <appear.span>{tex`\iInf_{\McL \mem \MfL}`}</appear.span>
            <appear.span>{tex`\iSup_{n \mem \N}`} </appear.span>
            <appear.span>{tex`\EC{n}{\McL}(s_1)`}</appear.span>
            <appear.span show={state.compL?.includes("eqSum")}>
              {tex`~=~ \iInf_{\McL \mem \MfL} \displaystyle \sum_{i = 1} p(\McL(s_1))^i`}
            </appear.span>
            <appear.span show={state.compL?.includes("eq1")}>
              {tex`= 1`}
            </appear.span>
            <appear.span show={state.compL?.includes("eq?")}>
              {tex`= ?`}
            </appear.span>
          </appear.div>
        </appear.div>
      </div>
      <appear.div show={state.showP} className="mt-16">
        <span className="text-4xl">fix {tex`p(\alpha) = ${p("\\alpha")}`}</span>
      </appear.div>
      <appear.div
        show={typeof state.showS == "number"}
        className="mt-16 text-3xl flex gap-10"
      >
        <appear.span
          show={typeof state.showS == "number" && 0 < state.showS}
        >{tex`\McS(s_1) = 1`}</appear.span>
        <appear.span
          show={typeof state.showS == "number" && 1 < state.showS}
        >{tex`\McS(s_1s_1) = 2`}</appear.span>
        <appear.span
          show={typeof state.showS == "number" && 2 < state.showS}
        >{tex`\McS(s_1s_1s_1) = 3`}</appear.span>
        <appear.span
          show={typeof state.showS == "number" && 3 < state.showS}
        >{tex`\cdots`}</appear.span>
        <appear.span
          show={typeof state.showS == "number" && 3 < state.showS}
        >{tex`\McS(${"\\"}underbrace{s_1 \dots s_1}_{i \text{ times}}) = i`}</appear.span>
      </appear.div>

      <appear.div className="h-[20vw] w-[80vw]">
        <Network
          highlighted={state.highlights}
          nodes={[
            {
              x: 0,
              y: 0,
              id: s(1),
              label: s(1),
            },
            {
              x: 150,
              y: 0,
              id: s(2),
              label: s(2),
              ...rewardNode,
            },
            {
              x: 300,
              y: 0,
              id: s(3),
              label: s(3),
            },
          ]}
          edges={[
            ...(state.basic
              ? [
                  { from: s(1), to: s(1), label: "½", arrows: "to" },
                  { from: s(1), to: s(2), label: "½", arrows: "to" },
                ]
              : [
                  { from: s(1), to: s(1), label: "p(α)", arrows: "to" },
                  { from: s(1), to: s(2), label: "1 - p(α)", arrows: "to" },
                ]),
            { from: s(2), to: s(3), label: "1", arrows: "to" },
            { from: s(3), to: s(3), label: "1", arrows: "to" },
          ]}
        />
      </appear.div>
      <appear.div show={!state.basic} className="text-4xl">
        where {tex`\alpha \mem \N \text{ and } 0 < p(\alpha) < 1`}
      </appear.div>

      <appear.div
        className="text-3xl flex gap-10 flex-col items-center"
        show={state.showProb}
      >
        <appear.div className="flex gap-10">
          {tex`\cost(s_1) = \cost(s_3) = 0`}
          {tex`\cost(${s2}) = 1`}
        </appear.div>
        <appear.div className="flex gap-10">
          <appear.div>
            {state.basic
              ? tex`\P(s_1, \alpha, s_1) = ½`
              : tex`\P(s_1, \alpha, s_1) = p(\alpha)`}
          </appear.div>
          <appear.div>
            {state.basic
              ? tex`\P(s_1, \alpha, ${s2}) = ½`
              : tex`\P(s_1, \alpha, ${s2}) = 1-p(\alpha)`}
          </appear.div>
          <appear.div>{tex`\P(${s2}, \_, s_3) = 1`}</appear.div>
          <appear.div>{tex`\P(s_3, \_, s_3) = 1`}</appear.div>
        </appear.div>
      </appear.div>
    </appear.div>
  );
});
