type FormReducerAction = {
  type: Action;
  key?: any;
  value: any;
};

export type FormReducerDispatch = (action: FormReducerAction) => void;

export enum Action {
  SET,
  DELETE,
  INITIALIZE,
  RESET,
}

export function reducer<T>(state: T, action: FormReducerAction) {
  switch (action.type) {
    case Action.SET:
      return { ...state, [action.key]: action.value };
    case Action.INITIALIZE:
      return { ...state, ...action.value };
    case Action.RESET:
      return action.value;
    default:
      return state;
  }
}
