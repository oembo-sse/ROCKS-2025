import colors from "tailwindcss/colors";
import { color, motion } from "framer-motion";
import { tex } from "../Katex";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { H } from "../common";

import DTU from "../assets/DTU2.png";
import React from "react";
import { Network, rewardNode } from "../Network";
import { s, s1, s2 } from "../nodes";

const variants = {
  lfpPhi: tex`\\lfp{\\Phi}`,
  lfpPsi: tex`\\lfp{\\Psi}`,
  InfSSup: tex`\iInf_{\McS \mem \MfS} ~ \iSup_{n \mem \Nat} ~ \EC{n}{\McS}`,
  SupInfS: tex`\iSup_{n \mem \Nat} ~ \iInf_{\McS \mem \MfS} ~ \EC{n}{\McS}`,
  InfLSup: tex`\iInf_{\McL \mem \MfL} ~ \iSup_{n \mem \Nat} ~ \EC{n}{\McL}`,
  SupInfL: tex`\iSup_{n \mem \Nat} ~ \iInf_{\McL \mem \MfL} ~ \EC{n}{\McL}`,
  SupSSup: tex`\iSup_{\McS \mem \MfS} ~ \iSup_{n \mem \Nat} ~ \EC{n}{\McS}`,
  SupSupS: tex`\iSup_{n \mem \Nat} ~ \iSup_{\McS \mem \MfS} ~ \EC{n}{\McS}`,
  SupLSup: tex`\iSup_{\McL \mem \MfL} ~ \iSup_{n \mem \Nat} ~ \EC{n}{\McL}`,
  SupSupL: tex`\iSup_{n \mem \Nat} ~ \iSup_{\McL \mem \MfL} ~ \EC{n}{\McL}`,
};

const lexicon = [
  { symbol: `\\McS`, description: "Deterministic scheduler with memory" },
  { symbol: `\\McL`, description: "Deterministic memoryless scheduler" },
];

const eqFin = tex`\quad=^{\tiny f}\quad`;
const exLt = tex`\quad\exists\!\!<\quad`;
// const exLt = tex`\quad<\!\!/\!\!\le\quad`;
const eq = tex`\quad=\quad`;
const le = tex`\quad\le\quad`;
const ge = tex`\quad\ge\quad`;

type Diagram = {
  lfp?: { node: React.ReactNode; key: string };
  lfpEq?: { node: React.ReactNode; key: string };
  topLeft: React.ReactNode;
  topMid: { node: React.ReactNode; key: string };
  topRight: React.ReactNode;
  midLeft: { node: React.ReactNode; key: string };
  midRight: { node: React.ReactNode; key: string };
  botLeft: React.ReactNode;
  botMid: { node: React.ReactNode; key: string };
  botRight: React.ReactNode;
  explain?: React.ReactNode;
};

const infBinf: Diagram = {
  topLeft: variants.SupInfS,
  topMid: { node: le, key: "topMid-le" },
  topRight: variants.SupInfL,
  midLeft: { node: exLt, key: "midLeft-exLt" },
  midRight: { node: exLt, key: "midRight-exLt" },
  botLeft: variants.InfSSup,
  botMid: { node: exLt, key: "botMid-exLt" },
  botRight: variants.InfLSup,
};

const finBinf: Diagram = {
  lfp: { node: variants.lfpPhi, key: "lfpPhi" },
  lfpEq: { node: eqFin, key: "lfpEq-eqFin" },
  topLeft: variants.SupInfS,
  topMid: { node: eqFin, key: "topMid-eqFin" },
  topRight: variants.SupInfL,
  midLeft: { node: eqFin, key: "midLeft-eqFin" },
  midRight: { node: eqFin, key: "midRight-eqFin" },
  botLeft: variants.InfSSup,
  botMid: { node: eqFin, key: "botMid-eqFin" },
  botRight: variants.InfLSup,
  explain: (
    <div className="text-4xl flex flex-col items-center">
      <div className="text-fg-600 text-5xl mb-4">
        Minimizing Bellman Operator:
      </div>
      {tex`\Phi(v) = \lambda s.\: \cost(s) + \iInf_{\alpha \mem \Act} \sum_{s' \mem \succs(s)} \P(s, \alpha, s') \cdot v(s')`}
    </div>
  ),
};

// example : relations
//     [⨆ n, ⨆ 𝒮 : 𝔖[M], EC c 𝒮 n] ≥ [⨆ n, ⨆ ℒ : 𝔏[M], EC c ℒ n]
//             =                                 =
//     [⨆ 𝒮 : 𝔖[M], ⨆ n, EC c 𝒮 n] ≥ [⨆ ℒ : 𝔏[M], ⨆ n, EC c ℒ n]
// := by
const infBsup: Diagram = {
  lfp: { node: variants.lfpPsi, key: "lfpPsi" },
  lfpEq: { node: eq, key: "lfpEq-eq" },
  topLeft: variants.SupSupS,
  topMid: { node: ge, key: "topMid-ge" },
  topRight: variants.SupSupL,
  midLeft: { node: eq, key: "midLeft-eq" },
  midRight: { node: eq, key: "midRight-eq" },
  botLeft: variants.SupSSup,
  botMid: { node: ge, key: "botMid-ge" },
  botRight: variants.SupLSup,
  explain: (
    <div className="text-4xl flex flex-col items-center">
      <div className="text-fg-600 text-5xl mb-4">
        Maximizing Bellman Operator:
      </div>
      {tex`\Psi(v) = \lambda s.\: \cost(s) + \iSup_{\alpha \mem \Act} \sum_{s' \mem \succs(s)} \P(s, \alpha, s') \cdot v(s')`}
    </div>
  ),
};

const RenderDiagram = ({
  diagram,
  showLfp,
}: {
  diagram: Diagram;
  showLfp: boolean;
}) => {
  return (
    <div className="grid grid-cols-[repeat(6,auto)] gap-y-5 gap-x-0 text-center">
      {showLfp && diagram.lfp && (
        <>
          <appear.div key={diagram.lfp.key} className="col-start-1 text-4xl">
            {diagram.lfp.node}
          </appear.div>
          <appear.div key={diagram.lfpEq?.key} className="col-start-2 text-4xl">
            {diagram.lfpEq?.node}
          </appear.div>
        </>
      )}
      <appear.div className="col-start-3">{diagram.topLeft}</appear.div>
      <appear.div key={diagram.topMid.key} className="col-start-4">
        {diagram.topMid.node}
      </appear.div>
      <appear.div className="col-start-5">{diagram.topRight}</appear.div>
      <appear.div key={diagram.midLeft.key} className="col-start-3">
        {diagram.midLeft.node}
      </appear.div>
      <appear.div key={diagram.midRight.key} className="col-start-5">
        {diagram.midRight.node}
      </appear.div>
      <appear.div className="col-start-3">{diagram.botLeft}</appear.div>
      <appear.div key={diagram.botMid.key} className="col-start-4">
        {diagram.botMid.node}
      </appear.div>
      <appear.div className="col-start-5">{diagram.botRight}</appear.div>
    </div>
  );
};

type State = {
  title?: string;
  diagram?: Diagram;
  showLfp?: boolean;
  explainExLt?: boolean;
  explainEqFin?: boolean;
};

const sequence: State[] = [
  {
    title: "Minimum Expected Total Cost of infinitly branching MDPs",
    diagram: infBinf,
    explainExLt: true,
  },
  {
    title: "Minimum Expected Total Cost of finitly branching MDPs",
    diagram: finBinf,
    explainExLt: false,
    explainEqFin: true,
  },
  { showLfp: true },
  {
    title: "Maximum Expected Total Cost of infinitly branching MDPs",
    explainEqFin: false,
    diagram: infBsup,
  },
];

export const sRels = makeSlide(sequence.length, () => {
  const { step } = useSlide();

  const state = sequence.slice(0, step + 1).reduce((acc, s) => ({
    ...acc,
    ...s,
  }));

  return (
    <div className="flex justify-center flex-col items-center gap-16">
      <appear.div key={state.title} className="text-5xl text-fg-700 font-bold">
        {state.title}
      </appear.div>
      <appear.div className="text-4xl">
        <RenderDiagram diagram={state.diagram!} showLfp={!!state.showLfp} />
      </appear.div>
      <appear.div show={state.explainExLt} className="text-3xl">
        {tex`\exists\!\!<`}: There exists an MDP where {tex`\_ < \_`}
      </appear.div>
      <appear.div show={state.explainEqFin} className="text-3xl">
        {tex`=^{\tiny f}`}: Equal under finite branching
      </appear.div>
      <appear.div
        key={`explain-${state.title}`}
        show={!!state.diagram?.explain && state.showLfp}
      >
        {state.diagram?.explain}
      </appear.div>

      {/* <div className="text-4xl">
        {tex`\Phi : (\State \to \ENNReal) \to \State \to \ENNReal`}{" "}
      </div>
      <div className="text-4xl">{tex`\Phi(v) = \lambda s.\: \cost(s) + \iInf_{\alpha \mem \Act} \sum_{s' \mem \succs(s)} \P(s, \alpha, s') \cdot v(s')`}</div> */}
    </div>
  );

  return (
    <div className="flex justify-center flex-col items-center">
      <appear.div to={1} exit className="text-8xl mb-12">
        Probabilistic programs and{" "}
      </appear.div>
      {/* <appear.div from={2} className="text-4xl ml-10 mb-10 place-self-start">
        The main <H>theorem</H> says that the <H>expected reward</H> is equal to
        the <H>weakest pre-expectation</H>.
      </appear.div> */}
      <motion.div
        layout
        className={step == 0 ? "text-5xl" : "text-6xl"}
      >{tex`\\MinER(\\orew_X, \\state{C}{\\sigma}) = \\dwp{C}{X}(\\sigma)`}</motion.div>
      <appear.div from={2} className="text-5xl mt-10 italic">
        The <H className="not-italic">expected reward</H> is equal to the{" "}
        <H className="not-italic">weakest pre-expectation</H>.
      </appear.div>
      <appear.div to={1} exit className="text-5xl mt-32">
        Oliver Emil Bøving
      </appear.div>
      <appear.div to={1} exit className="text-3xl mt-10 text-center">
        As part of DFF project AuRoRA <br /> with Christoph Matheja
      </appear.div>
      <appear.img to={1} src={DTU} className="w-12 mt-10" />
    </div>
  );
});
