export const subscript = "₀₁₂₃₄₅₆₇₈₉";

export const toSubscript = (i: number | string) => {
  if (typeof i == "string") return { i: "ᵢ" }[i] || i;

  let index = "";
  if (i > 9) {
    index += subscript[Math.floor(i / 10)];
  }
  index += subscript[i % 10];
  return index;
};

export const s = (...is: (number | string)[]) =>
  `s${is.map((i) => toSubscript(i)).join("˒")}`;

export const s0 = s(0);
export const s1 = s(1);
export const s2 = s(2);
export const s3 = s(3);
