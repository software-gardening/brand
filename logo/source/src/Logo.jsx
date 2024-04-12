import { useEffect } from "react";
import Color from "colorjs.io";

const count = 8;
// const color1 = new Color("#f7a072");
// const color2 = new Color("#a6284b");
const color1 = new Color("#00a896");
const color2 = new Color("#f0f3bd");
// const pattern = "M -25 0 A 40 40 0 0 0 25 0";
const pattern = "M -25 0 C 0 -20 10 0 25 0";

const getTransform = (index) => {
  const deg = Math.round(-360 * (index / count));
  // return `rotate(${deg}) translate(34, 0) rotate(47)`;
  return `rotate(${deg}) translate(40, 0) rotate(45)`;
};

const mixColor = (index) => 1 - Math.abs(1 - 2 * (index / count));

const getColor = (index) =>
  color1
    .range(color2, {
      space: "lch",
      outputSpace: "srgb",
    })(mixColor(index))
    .toString({ format: "hex" });

const leaves = Array(count)
  .fill(null)
  .map((leaf, index) => (
    <g key={index} transform={getTransform(index)}>
      <path d={pattern} fill={getColor(index + 1)} />
      <path d={pattern} fill={getColor(index)} transform="scale(-1, -1)" />
    </g>
  ));

const font = "Platypi";
// const font = "Indie Flower";

const Logo = () => {
  useEffect(() => {
    fitViewBox();
  });

  return (
    <svg>
      <defs>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=${font.replaceAll(
              " ",
              "+"
            )}&display=swap');

            text {
              font-size: 30px;
              font-family: "${font}", cursive;
              letter-spacing: 1px;
            }
          `}
        </style>
      </defs>

      <mask id="mask">
        <rect x="-1000" y="-1000" width="2000" height="2000" fill="white" />
        <circle cx="0" cy="0" r="25" fill="black" />
      </mask>
      <g mask="url(#mask)">{leaves}</g>

      <path
        fill="none"
        stroke={getColor(0)}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="square"
        d="M -9 -9 L -18 0 L -9 9 M 9 -9 L 18 0 L 9 9"
      />
      <path
        fill="none"
        stroke={getColor(count / 3)}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="square"
        d="M -9 9 L 9 -9"
      />

      <text x="70" y="-15" dominantBaseline="middle" fill="#747e8c">
        Software
      </text>
      <text x="70" y="20" dominantBaseline="middle" fill="#bb8588">
        Gardening
      </text>
    </svg>
  );
};

export default Logo;

const fitViewBox = () => {
  const svg = document.querySelector("svg");
  let { x, y, width, height } = svg.getBBox();
  const viewBox = [x, y, width, height].map(Math.round).join(" ");
  svg.setAttribute("viewBox", viewBox);
};
