
// export interface TextColors {
//   h1: string;
//   h2: string;
//   h3: string;
//   h4: string;
//   h5: string;
//   h6: string;
//   p: string;
//   input: string;
//   label: string;
//   caption: string;
//   button: string;
//   contrast?: TextColors | null;
// }

export interface Palette {
  background: string;
  primary: string;
  secondary: string;
  tertiary: string;
  quatenary: string;
  emphasis: string;
  subtle: string;
  alert: string;
}

export interface Colors extends Palette {
  // text: TextColors;
  hover?: Palette;
  focus?: Palette;
  active?: Palette;
  contrast?: Colors;
  [key: string]: any;
}


export interface Theme {
  name: string;
  colors: Colors;
  breakpoints: (string | number)[];
  [key: string]: any;
}
