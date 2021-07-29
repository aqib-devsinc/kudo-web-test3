const { PUBLIC_URL } = process.env;

export const ADMIN_PROJECTS_TABLE_HEADER = {
  interpreterName: {
    label: 'Interpreter Name',
    value: 'interpreter',
    sortable: true,
    sortOn: 'owner__first_name',
  },
  projectId: {
    label: 'Glossary ID',
    value: 'id',
    sortable: true,
    sortOn: 'id',
  },
  projectType: {
    label: 'Glossary Type',
    value: 'type',
    sortable: true,
    sortOn: 'type',
  },
  noOfTerms: {
    label: 'No. of Terms',
    value: 'terms_count',
    sortable: true,
    sortOn: 'terms_count',
  },
  languages: {
    label: 'Languages',
    value: 'languages',
    sortable: false,
    sortOn: 'languages',
  },
  status: {
    label: 'Status',
    value: 'status',
    sortable: false,
    sortOn: 'status',
  },
};

export const ADMIN_INTERPRETER_TABLE_HEADER = {
  interpreterName: {
    label: 'Interpreter Name',
    value: 'full_name',
    sortable: true,
    sortOn: 'first_name',
  },
  languages: {
    label: 'Languages',
    value: 'languages',
    sortable: false,
    sortOn: 'languages',
  },
  noOfProjects: {
    label: 'No. of Glossaries',
    value: 'projects_count',
    sortable: true,
    sortOn: 'projects_count',
  },
  email: {
    label: 'Email',
    value: 'email',
    sortable: true,
    sortOn: 'email',
  },
  status: {
    label: 'Status',
    value: 'status',
    sortable: false,
    sortOn: 'status',
  },
  roles: {
    label: 'Roles',
    value: 'roles',
    sortable: false,
    sortOn: 'roles',
  },
  action: {
    label: 'Action',
    value: 'action',
    sortable: false,
    sortOn: 'action',
  },
};

export const PROJECT_TYPES = {
  blankProjects: {
    value: 'blank',
    title: 'Blank Glossary',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/Blank-3.svg`,
  },
  uploadDocs: {
    value: 'upload',
    title: 'Uploaded Doc',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/Uploaded-file-red.svg`,
  },
  projectInfo: {
    value: 'keyword',
    title: 'Keywords',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/Keywords-2.svg`,
  },
  websiteUrl: {
    value: 'url',
    title: 'Website/URL',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/Earth-2.svg`,
  },
};

export const ADMIN_PROJECTS_DEFAULT_PAGE = 1;
export const ADMIN_INTERPRETER_DEFAULT_PAGE = 1;
export const ADMIN_PROJECTS_PER_PAGE = 10;
export const ADMIN_INTERPRETER_PER_PAGE = 10;

export const DATATABLE_TYPE = {
  dashboard: 'dashboard',
  interpreter: 'interpreter',
}

export const SORTING_DIRECTION = {
  asc: 'asc',
  desc: 'desc',
};
