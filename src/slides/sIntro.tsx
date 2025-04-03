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
  InfSSup: tex`\iInf_{\McS \mem \MfS} ~ \iSup_{n \mem \Nat} ~ \EC{n}{\McS}`,
  SupInfS: tex`\iSup_{n \mem \Nat} ~ \iInf_{\McS \mem \MfS} ~ \EC{n}{\McS}`,
  InfLSup: tex`\iInf_{\McL \mem \MfL} ~ \iSup_{n \mem \Nat} ~ \EC{n}{\McL}`,
  SupInfL: tex`\iSup_{n \mem \Nat} ~ \iInf_{\McL \mem \MfL} ~ \EC{n}{\McL}`,
  SupSSup: tex`\iSup_{\McS \mem \MfS} ~ \iSup_{n \mem \Nat} ~ \EC{n}{\McS}`,
  SupSupS: tex`\iSup_{n \mem \Nat} ~ \iSup_{\McS \mem \MfS} ~ \EC{n}{\McS}`,
};

const lexicon = [
  { symbol: `\\McS`, description: "Deterministic scheduler with memory" },
  { symbol: `\\McL`, description: "Deterministic memoryless scheduler" },
];

const eqFin = tex`=^{\tiny f}`;

export const sIntro = makeSlide(1, () => {
  const { step } = useSlide();

  // return (
  //   <div className="flex justify-center flex-col items-center">
  //     <appear.div to={1} exit className="text-8xl mb-12 text-center">
  //       Expected total cost of infinite MDPs in Lean
  //     </appear.div>
  //     <div className="text-4xl">
  //       <div className="grid grid-cols-3 gap-y-10 gap-x-0 text-center">
  //         <div>{variants.InfSSup}</div>
  //         {eqFin}
  //         <div>{variants.SupInfS}</div>
  //         {eqFin}
  //         <div />
  //         {eqFin}
  //         <div>{variants.InfLSup}</div>
  //         {eqFin}
  //         <div>{variants.SupInfL}</div>
  //       </div>
  //     </div>

  //     <div>
  //       <span>Lexicon</span>
  //       <div className="grid grid-cols-[auto_auto]">
  //         {lexicon.map((l) => (
  //           <React.Fragment key={l.symbol}>
  //             {tex`${l.symbol}`}
  //             <span>{l.description}</span>
  //           </React.Fragment>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex justify-center flex-col items-center">
      <appear.div to={1} exit className="text-8xl mb-12 text-center">
        Expected total cost of infinite MDPs in Lean
      </appear.div>
      {/* <appear.div from={2} className="text-4xl ml-10 mb-10 place-self-start">
        The main <H>theorem</H> says that the <H>expected reward</H> is equal to
        the <H>weakest pre-expectation</H>.
      </appear.div> */}
      <motion.div layout className={step == 0 ? "text-5xl" : "text-6xl"}>
        {tex`\iInf_{\McS \mem \MfS} \iSup_{n \mem \N} \EC{n}{\McS}(\state{C}{\sigma}) = \wp{C}{X}(\sigma)`}
        {/* {tex`\\MinER(\\orew_X, \\state{C}{\\sigma}) = \\dwp{C}{X}(\\sigma)`} */}
      </motion.div>
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
