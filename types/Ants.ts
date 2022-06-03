export enum AntColor {
  RED,
  BLACK,
  SILVER,
}

export interface Ant {
  key: number;
  name: string;
  length: number;
  color: AntColor;
  weight: number;
}

export type AntData = {
  ants: Ant[];
};
