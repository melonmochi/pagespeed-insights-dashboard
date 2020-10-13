import { CheckboxValueType } from 'antd/lib/checkbox/Group';

type Versions = string[];

export interface PageAction {
  CHANGE_VERSIONS: { type: 'CHANGE_VERSIONS'; payload: Versions };
}

type PageActionType = PageAction['CHANGE_VERSIONS'];

interface PageState {
  versions: Versions;
}

export interface PageInterface {
  Action: PageActionType;
  State: PageState;
  Dispatch: (a: PageActionType) => void;
}

export interface GetInsightsProperties {
  categories?: CheckboxValueType[];
  strategy?: string;
  url?: string;
  version: string;
}
