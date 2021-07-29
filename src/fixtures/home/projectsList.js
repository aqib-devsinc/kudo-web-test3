import { VIEW_TYPE, PROJECT_TABS } from 'constants/home';

export default {
  props: {
    view: VIEW_TYPE.grid,
    tab: PROJECT_TABS.private.value,
    projects: [
      {
        id: 1,
        name: 'Project 1',
        created_at: Date.now(),
      },
      {
        id: 2,
        name: 'Project 2',
        created_at: Date.now(),
      },
      {
        id: 3,
        name: 'Project 3',
        created_at: Date.now(),
      },
    ],
  },
};
