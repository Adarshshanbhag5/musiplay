import React, {createContext, useReducer} from 'react';

const initialState = {
  modalOpen: false,
  optionData: {
    id: '',
    url: '',
    duration: 0,
    title: '',
    album: '',
    artist: '',
    artwork: '',
  },
  modalCase: 'default',
  longPressData: {},
};

export const MODALACTIONS = {
  MODALVISIBLE: 'modalVisible',
  OPTIONDATA: 'optionData',
  MODALCASE: 'modalCase',
  LONGPRESS: 'longpress',
  RESET: 'reset',
};

const reducer = (state, action) => {
  switch (action.type) {
    case MODALACTIONS.MODALVISIBLE:
      return {...state, modalOpen: !state.modalOpen};
    case MODALACTIONS.OPTIONDATA:
      return {...state, optionData: action.payload.data};
    case MODALACTIONS.RESET:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        optionData: initialState.optionData,
        modalCase: initialState.modalCase,
        longPressData: initialState.longPressData,
      };
    case MODALACTIONS.LONGPRESS:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalCase: action.payload.case,
        longPressData: action.payload.data,
      };
    case MODALACTIONS.MODALCASE:
      return {
        ...state,
        modalCase: action.payload.case,
      };
    default:
      return state;
  }
};

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log(state);

  const value = {state, dispatch};

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
