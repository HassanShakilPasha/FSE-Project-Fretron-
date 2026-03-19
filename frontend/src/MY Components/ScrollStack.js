import React from 'react';
import './ScrollStack.css';

function ScrollStack({ children }) {
  return <div className="scrollStack">{children}</div>;
}

function ScrollStackItem({ children }) {
  return <section className="scrollStackItem">{children}</section>;
}

export { ScrollStackItem };
export default ScrollStack;