import { CheckboxValueType } from 'antd/lib/checkbox/Group';

type Versions = string[];

interface GlobalActionI {
  CHANGE_VERSIONS_GROUP: { type: 'CHANGE_VERSIONS_GROUP'; payload: Versions };
}

type GlobalAction = GlobalActionI['CHANGE_VERSIONS_GROUP'];

interface GlobalStateI {
  versions: Versions;
}

export interface GlobalInterface {
  Action: GlobalAction;
  State: GlobalStateI;
  Dispatch: (a: GlobalAction) => void;
}

export interface GetInsightsProperties {
  url?: string;
  categories?: CheckboxValueType[];
  version?: string;
}
