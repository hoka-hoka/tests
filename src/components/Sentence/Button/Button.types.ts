import { State, Action } from '../../../App.types';

interface ButtonProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  onClick: () => void;
}

export default ButtonProps;
