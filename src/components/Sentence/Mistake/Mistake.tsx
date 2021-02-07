import React from 'react';

const Mistake = ({ active }: { active: boolean }) => (
  <div className={`sentence__mistake ${active ? 'sentence__mistake_active' : ''}`}>
    Something wrong!
  </div>
);

export default Mistake;
