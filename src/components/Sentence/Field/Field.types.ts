import { State, Action } from '../../../App.types';

interface FieldProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  setDataState: (options: {
    inField?: { active: boolean; placeUnder: HTMLElement | undefined };
    inRestore?: boolean;
  }) => void;
  fixWord: { active: boolean; placeUnder: HTMLElement | undefined };
}

export default FieldProps;
