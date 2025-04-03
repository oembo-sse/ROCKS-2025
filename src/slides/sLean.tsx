import colors from "tailwindcss/colors";
import { color, motion } from "framer-motion";
import { tex } from "../Katex";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { H } from "../common";

import DTU from "../assets/DTU2.png";
import jpmdpfppp from "../assets/jpmdpfppp.png";
import React from "react";
import { LeanLogo } from "../assets/lean_logo";

type State = {
  pdf?: boolean;
};

const sequence: State[] = [{ pdf: true }, { pdf: false }];

export const sLean = makeSlide(sequence.length, () => {
  const { step } = useSlide();

  const state = sequence.slice(0, step + 1).reduce(
    (acc, s) => ({
      ...acc,
      ...s,
    }),
    {}
  );

  return (
    <div className="flex justify-center flex-col items-center gap-16">
      <appear.div className="text-4xl text-fg-700 font-bold flex flex-col justify-center items-center w-[40ch] text-center">
        All this work has been formalized in the interactive theorem prover{" "}
        <LeanLogo />
      </appear.div>
      <appear.div show={state.pdf} className="w-[80vw] fixed top-32 shadow-2xl">
        <img src={jpmdpfppp} />
      </appear.div>
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
