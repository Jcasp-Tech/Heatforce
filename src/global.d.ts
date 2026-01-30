// src/types/window.d.ts
declare global {
  interface Window {
    VendigoCalculatorWidget?: {
      new (): {
        calculate: (
          param1: number,
          param2: number,
          param3: number,
          param4: number,
          param5
        ) => any;
      };
    };
  }
}

// This is required to ensure that the declaration file is treated as a global module.
export {};
