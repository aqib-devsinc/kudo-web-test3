import { VIEW_TYPE, PROJECT_TABS } from 'constants/home';

export default {
  props: {
    view: VIEW_TYPE.grid,
    tab: PROJECT_TABS.private.value,
    project: {
      id: 1,
      name: 'Project 1',
      created_at: Date.now(),
    },
  },
};
