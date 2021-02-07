import { State, Action } from '../../../App.types';

interface NucleusProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  restoreWord: boolean;
  setDataState: (options: {
    inField?: { active: boolean; placeUnder: HTMLElement | undefined };
    inRestore?: boolean;
  }) => void;
}

export default NucleusProps;
