import React from 'react';
import ButtonProps from './Button.types';

const Button = ({ state, onClick }: ButtonProps) => {
  const wordMap = ([] as (HTMLElement | null)[]).concat(state.wordMap);
  const active = wordMap.filter((item) => {
    if (typeof item !== null) {
      return item;
    }
    return false;
  });
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sentence__button ${active.length ? 'sentence__button_active' : ''}`}
    >
      Check
    </button>
  );
};

export default Button;
