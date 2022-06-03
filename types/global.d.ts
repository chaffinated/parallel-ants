
declare module NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare global {
  interface Window {
    lottieRefs: any[];
    heap: any;
  }
}
