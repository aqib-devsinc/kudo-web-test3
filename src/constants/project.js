const { PUBLIC_URL } = process.env;

export const PROJECT_TYPES = {
  uploadDocs: {
    id: 'upload',
    title: 'Upload Documents',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/upload-document.svg`,
    logoFocused: `${PUBLIC_URL}/media/svg/icons/Files/upload-document-focused.svg`,
  },
  websiteUrl: {
    id: 'url',
    title: 'Website',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/earth.svg`,
    logoFocused: `${PUBLIC_URL}/media/svg/icons/Files/earth-focused.svg`,
  },
  projectInfo: {
    id: 'keyword',
    title: 'Keywords',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/project-info.svg`,
    logoFocused: `${PUBLIC_URL}/media/svg/icons/Files/project-info-focused.svg`,
  },
  blankProject: {
    id: 'blank',
    title: 'Blank Glossary',
    logo: `${PUBLIC_URL}/media/svg/icons/Files/blank-project.svg`,
    logoFocused: `${PUBLIC_URL}/media/svg/icons/Files/blank-project-focused.svg`,
  },
};

export const SHARE_TYPES = {
  public: {
    value: 'public',
    label: 'Public',
  },
  shared: {
    value: 'shared',
    label: 'Shared with others',
    helperText: 'The added users can access the file',
    accessTypes: {
      view: {
        label: 'View only',
        value: 'view',
      },
      edit: {
        label: 'Edit',
        value: 'edit',
      },
    },
  },
  private: {
    value: 'private',
    label: 'Private',
    helperText: 'Only you can access the file',
  },
};

export const PRIMARY_LANGS = {
  english: {
    value: 'eng',
    label: 'English',
  },
  french: {
    value: 'fra',
    label: 'French',
  },
  germany: {
    value: 'deu',
    label: 'German',
  },
  italian: {
    value: 'ita',
    label: 'Italian',
  },
  spanish: {
    value: 'spa',
    label: 'Spanish',
  },
  portugues: {
    value: 'por',
    label: 'Portuguese',
  },
};
