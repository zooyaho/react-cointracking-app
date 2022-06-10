import React, { useState } from 'react';

const ModeContext = React.createContext({
  isLightMode: true,
  toggleMode: () => { },
});

export const ModeContextProvider = (props: { children: any; }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleModeHandler = () => {
    const changeMode = !isLightMode;
    setIsLightMode(changeMode);
  };

  return (
    <ModeContext.Provider value={{
      isLightMode: isLightMode,
      toggleMode: toggleModeHandler
    }}>
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeContext;