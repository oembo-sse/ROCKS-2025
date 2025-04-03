import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { buildSlides, useSlidesBase } from "./hooks";
import { SlidesContext, useSlide } from "./slides";
import { sIntro } from "./slides/sIntro";
import { s04 } from "./slides/s04";
import { s00 } from "./slides/s00";
import { s01 } from "./slides/s01";
import { s02 } from "./slides/s02";
import { s03 } from "./slides/s03";
import { s90 } from "./slides/s90";
import { s05 } from "./slides/s05";
import { s06 } from "./slides/s06";
import { s055 } from "./slides/s055";
import { s07 } from "./slides/s07";
import { s08 } from "./slides/s08";
import { s09 } from "./slides/s09";
import { s10 } from "./slides/s10";
import { s80 } from "./slides/s80";
import { s85 } from "./slides/s85";
import { sA } from "./slides/sA";
import { sC } from "./slides/sC";
import { sRels } from "./slides/sRels";
import { sLean } from "./slides/sLean";

const SLIDES = buildSlides([
  sIntro,
  s04,
  s00(
    `x := 5 ;
sum := 0 ;
while x > 0 {
  { x := x - 1 } [1/2] { x := x - 2 } ;
  sum := sum + x
}`,
    ["x", "sum"]
  ),
  s00(
    `x := 1 ; stop := 0 ;
while stop = 0 {
{ stop := 1 } [1/2] { x := x + 1 }
}`,
    ["x", "stop"]
  ),
  sC,
  sA,
  sRels,
  s10,
  sLean,
  //   s01,
  //   s02,
  //   s03,
  //   s05,
  //   // s00(`x := 5 ; y := x + 2`, ["x", "y"]),
  //   s055,
  //   s06,
  //   s00(`tick := 0 ;
  // fail := 0 ; sent := 0 ;
  // while sent < 4 && fail < 2 {
  //   tick := tick + 1 ;
  //   { fail := 0 ; sent := sent + 1 } [1/2]
  //   { fail := fail + 1 }
  // }`),
  //   s07,
  //   s08,
  //   s09,
  //   s85,
  //   s80,
  //   s00(`tick := 0 ;
  // fail := 0 ; sent := 0 ;
  // while sent < 4 && fail < 2 {
  //   tick := tick + 1 ;
  //   { fail := 0 ; sent := sent + 1 } [1/2]
  //   { fail := fail + 1 }
  // }`),
  s90,
]);

export const App = () => {
  const base = useSlidesBase(SLIDES);

  return (
    <SlidesContext.Provider value={base}>
      <SlideShow />
    </SlidesContext.Provider>
  );
};

const SlideShow = () => {
  const { currentSlideIndex, currentSlide, totalSlides, step } = useSlide();

  const CurrentSlide = currentSlide.render;

  return (
    <>
      <div className="bg-white w-screen h-screen grid place-items-center text-fg-900 font-katex overflow-hidden">
        <div className="grid place-items-center gap-10">
          <LayoutGroup>
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              // layout="position"
            >
              <CurrentSlide step={step} />
            </motion.div>
          </LayoutGroup>
          {/* <div className="text-7xl">{text`\\H{Op}erational semantics`}</div> */}
          {/* <div className="text-7xl">
      {text`\\H{M}arkov \\H{D}ecision \\H{P}rocesses`}
    </div> */}
          {/* {operationalSemantics.map((tex) => (
      <div className="text-lg">{tex}</div>
    ))} */}
          {/* <div className="text-3xl">{tex`\\op : \\State \\to \\Set{(\\Act \\times \\State \\times \\ENNReal)}`}</div>
    <div className="text-3xl">{tex`\\P : \\State \\to \\Act \\to \\State \\to \\ENNReal`}</div>
    <div className="text-3xl">{tex`\\P : \\State \\to \\Act \\to \\Dist \\State`}</div>
    <div className="text-3xl">{tex`\\act : \\State \\to \\Set{\\Act}`}</div>
    <div className="text-3xl">{tex`\\succs : \\State \\to \\Act  \\to \\Set{\\State}`}</div>
    <div className="text-3xl">{tex`\\P(s, \\alpha)(s') = \\sum_{(s',\\: p) \\:\\in\\: \\op(s,\\: \\alpha)} p`}</div>
    <div className="text-3xl">{tex`\\act(s) = \\{ \\alpha \\mid \\exists s'. P(s,\\alpha)(s') > 0 \\}`}</div>
    <div className="text-3xl">{tex`\\succs(s, \\alpha) = \\{ s' \\mid P(s, \\alpha)(s') > 0 \\} = \\supp{P(s, \\alpha)}`}</div> */}
        </div>
      </div>
      <div className="fixed bottom-4 right-6 font-katex text-3xl text-fg-700/50">
        {currentSlideIndex + 1}
      </div>
      <div
        className="fixed bottom-0 h-2 bg-fg-300 left-0 transition-all"
        style={{
          width: (step / (currentSlide.steps - 1)) * 100 + "%",
        }}
      ></div>
      <div
        className="fixed bottom-0 h-1 bg-fg-500 left-0 transition-all"
        style={{
          width: (currentSlideIndex / (totalSlides - 1)) * 100 + "%",
          // width: (globalStep / (totalSteps - 1)) * 100 + "%",
        }}
      ></div>
    </>
  );
};
