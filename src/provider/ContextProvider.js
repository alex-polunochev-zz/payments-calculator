import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  screenWidth: null
};

export const Context = createContext(defaultState);

export const ContextProvider = (props) => {
  const { children } = props;

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? { screenWidth: window.innerWidth } : { screenWidth: 0 }
  );

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return <Context.Provider value={{ screenWidth }}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
