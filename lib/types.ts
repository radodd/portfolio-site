import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type Lerp = (x: number, y: number, a: number) => number;

export type GradientCursorProps = {
  isHovered: boolean;
  distance: number;
};

export type MoveCircleProps = {
  x: number;
  y: number;
};
