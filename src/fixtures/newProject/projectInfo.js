import { PROJECT_TYPES } from 'constants/project';
import additionalInfo from './additionalInfo';
import shareType from './shareType';

export default {
  ...additionalInfo,
  values: {
    ...additionalInfo.values,
    ...shareType.values,
    type: PROJECT_TYPES.projectInfo.id,
  },
  activeProjectType: { id: PROJECT_TYPES.projectInfo.id },
};
