import { GlobalInterface } from '@/typings';

const changeVersionsGroup = (
  state: GlobalInterface['State'],
  action: GlobalInterface['Action'],
) => ({
  ...state,
  versions: action.payload,
});

const reducers = (
  state: GlobalInterface['State'],
  action: GlobalInterface['Action'],
): GlobalInterface['State'] => {
  switch (action.type) {
    case 'CHANGE_VERSIONS_GROUP':
      return changeVersionsGroup(state, action);
    default:
      return { ...state };
  }
};

export default reducers;
