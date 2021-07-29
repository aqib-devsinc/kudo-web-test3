import { string, object, array, number, lazy } from 'yup';
import { SHARE_TYPES, PRIMARY_LANGS, PROJECT_TYPES } from 'constants/project';

const shareTypeSchema = {
  share_type: string().oneOf(Object.values(SHARE_TYPES).map((shareType) => shareType.value)).required('Required'),
  project_users: array().when('share_type', {
    is: SHARE_TYPES.shared.value,
    then: array().of(
      object().shape({
        email: string().email('Invalid email').required('Required'),
        access_type: string().oneOf(Object.values(SHARE_TYPES.shared.accessTypes)
          .map((accessType) => accessType.value)).required('Required'),
      }),
    ).min(1, 'Minimum 1 email required').required(),
  }),
};

export const shareProjectSchema = object().shape(shareTypeSchema);

const additionalFieldsSchema = {
  name: string().max(50).required('Required'),
  primary_language: string().when('type', {
    is: PROJECT_TYPES.blankProject.id,
    otherwise: string().oneOf(Object.values(PRIMARY_LANGS).map((lang) => lang.value)).required('Required'),
  }).nullable(),
  secondary_languages: array().of(string()).min(1, 'Minimum 1 language required')
    .max(6, 'Maximun 6 languages can be selected'),
  description: string().max(500),
  tags: array().of(string().max(50, 'Maximum 50 characters allowed')),
  client: string().max(100, 'Maximum 100 characters allowed').nullable(),
  subject_matter: string().max(100, 'Maximum 100 characters allowed').required('Required'),
  ...shareTypeSchema,
};

const blankProjectSchema = object().shape(additionalFieldsSchema);

const uploadDocSchema = object().shape({
  files: array().of(object().shape({
    attachment: lazy((value) => {
      switch (typeof value) {
        case 'object':
          return object().nullable();
        case 'string':
          return string().nullable();
        default:
          return string().nullable();
      }
    }),
    language: string().nullable(),
  })).min(1, 'Minimum 1 file required'),
  ...additionalFieldsSchema,
});

const projectInfoSchema = object().shape({
  ...additionalFieldsSchema,
  keywords: array()
    .of(string().max(50, 'Maximum 50 characters allowed'))
    .min(3, 'Minimum 3 keywords required')
    .required(),
});

const websiteUrlSchema = object().shape({
  url: string()
    .matches(
      // eslint-disable-next-line max-len
      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
      'invalid URL!',
    )
    .required('Required'),
  ...additionalFieldsSchema,
});

export default function projectSchema(projectType) {
  switch (projectType) {
    case PROJECT_TYPES.blankProject.id:
      return blankProjectSchema;

    case PROJECT_TYPES.uploadDocs.id:
      return uploadDocSchema;

    case PROJECT_TYPES.projectInfo.id:
      return projectInfoSchema;

    case PROJECT_TYPES.websiteUrl.id:
      return websiteUrlSchema;

    default:
      throw new Error('Invalid project type');
  }
}
