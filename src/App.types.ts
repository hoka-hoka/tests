type State = {
  wordMap: (HTMLElement | null)[];
  capture: boolean;
  eventCapture: React.MouseEvent | undefined;
  coordsXY: Record<'x' | 'y', string | number>[];
};
type Action =
  | { type: 'SET_WORD_LIST'; wordMap: (HTMLElement | null)[] }
  | { type: 'CAPTURE_WORD'; capture: boolean; eventCapture: React.MouseEvent | undefined }
  | { type: 'SET_START_COORDINATES'; coordsXY: Record<'x' | 'y', string | number>[] };

export type { State, Action };
