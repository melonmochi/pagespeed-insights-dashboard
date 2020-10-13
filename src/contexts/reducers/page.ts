import { PageInterface, PageAction } from '@/typings';

const changeVersions = (state: PageInterface['State'], action: PageAction['CHANGE_VERSIONS']) => ({
  ...state,
  versions: action.payload,
});

const reducers = (
  state: PageInterface['State'],
  action: PageInterface['Action'],
): PageInterface['State'] => {
  switch (action.type) {
    case 'CHANGE_VERSIONS':
      return changeVersions(state, action);
    default:
      return { ...state };
  }
};

export default reducers;
