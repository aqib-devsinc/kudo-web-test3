import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const initialState = {
  auth: {
    user: {
      full_name: '',
      email: '',
    },
    token: null,
  },
  projects: {
    new: { name: 'test project' },
    private: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    shared: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    public: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    all: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    current: {
      id: 6,
      name: 'project with files',
      created_at: '2021-01-06T08:04:42.544365Z',
      project_users: [],
      keywords: [
        {
          id: 6,
          name: 'some',
        },
        {
          id: 7,
          name: 'new ',
        },
        {
          id: 8,
          name: 'tag',
        },
      ],
      client: {
        id: 1,
        name: 'client 1',
      },
      subject_matter: {
        id: 1,
        name: 'subject matter 1',
      },
      description: 'fddfdfvdf',
      primary_language: 'eng',
      secondary_languages: [
        'fra',
        'deu',
      ],
      type: 'upload',
      share_type: 'private',
      url: '',
      owner_id: 1,
      files: [
        {
          id: 4,
          created_at: '2021-01-06T08:04:44.099828Z',
          updated_at: '2021-01-06T08:04:44.099857Z',
          url: `https://files-to-text.s3.amazonaws.com/uploads/zia%40gmail.com/project_6/
            20210106-080442_glossary.pdf?AWSAccessKeyId=AKIAUSMVGTY7HMBEB6ML&Signature=
            4h%2FwDCQJFkiLCY7WpgPgNgUfE40%3D&Expires=1610481166`,
          metadata: {
            name: 'glossary.pdf',
            size: 15,
            version: 1,
            key_name: 'uploads/zia@gmail.com/project_6/20210106-080442_glossary.pdf',
            language: '',
          },
          corpus: `https://files-to-text.s3.amazonaws.com/corpus_text1.txt?AWSAccessKeyId=
            AKIAUSMVGTY7HMBEB6ML&Signature=2Hyg7hFIPUnVsshRis5eSAWuAI0%3D&Expires=1610481166`,
          project: 6,
        },
      ],
    },
    glossary: {
      current_page: 1,
      total_pages: 1,
      previous_page: null,
      next_page: null,
      total_records: 10,
      page: 1,
      per_page: 10,
      statistics: {
        number_of_terms: 10,
        missing_translations: 8,
      },
      languages: [
        {
          code: 'eng',
          name: 'English',
        },
        {
          code: 'fra',
          name: 'French',
        },
        {
          code: 'deu',
          name: 'German',
        },
      ],
      terms: [
        {
          id: 6,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: 'Jessica Warren',
          feedback: 'Alexis Miles',
          comment: 'Angel Estrada',
          status: 'unrevised',
          speaker: 'Shaun Bright',
          favorite: 'Christopher Bradley',
          translations: [
            {
              id: 6,
              name: 'Brianna Miranda',
              language: 'eng',
              abbreviation: 'Michael James',
              pos: 'Michael Williams',
              example: 'Kathryn Wilson',
              source: 'Anna Price',
              term_id: 6,
            },
            {
              id: 7,
              name: 'Christine Smith',
              language: 'fra',
              abbreviation: 'Dawn Harmon',
              pos: 'Matthew Jensen',
              example: 'Carmen Parker',
              source: 'Mark Rollins',
              term_id: 6,
            },
            {
              id: 8,
              name: 'Christine Oliver',
              language: 'deu',
              abbreviation: 'James Stephens',
              pos: 'Jonathan Lara',
              example: 'Anne Miller',
              source: 'Mary Santos',
              term_id: 6,
            },
          ],
          cycle_id: 1,
          created_at: '2021-01-06T07:56:26.624914Z',
          updated_at: '2021-01-06T07:56:26.624935Z',
        },
        {
          id: 7,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: 'Stacey Jones',
          feedback: 'Stephanie Baker',
          comment: 'Kevin Torres',
          status: 'unrevised',
          speaker: 'Debra Pratt',
          favorite: 'Emily Marquez DDS',
          translations: [
            {
              id: 9,
              name: 'Vickie Romero',
              language: 'eng',
              abbreviation: 'Lance Jimenez',
              pos: 'Brian Martin',
              example: 'Michael Williams',
              source: 'Amanda Swanson',
              term_id: 7,
            },
            {
              id: 10,
              name: 'James Mcclain',
              language: 'fra',
              abbreviation: 'Benjamin Hayes',
              pos: 'Jennifer Foley',
              example: 'Douglas Fields',
              source: 'Courtney Fitzpatrick',
              term_id: 7,
            },
            {
              id: 11,
              name: 'Christina Hogan',
              language: 'deu',
              abbreviation: 'Lori Molina',
              pos: 'Kristy Cunningham',
              example: 'Seth Meyer',
              source: 'Ms. Dawn Clark MD',
              term_id: 7,
            },
          ],
          cycle_id: 1,
          created_at: '2021-01-06T07:56:26.628080Z',
          updated_at: '2021-01-06T07:56:26.628101Z',
        },
        {
          id: 8,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: 'Carl Smith',
          feedback: 'Penny Kaiser',
          comment: 'Stephanie Cruz',
          status: 'unrevised',
          speaker: 'Nicholas Graham',
          favorite: 'Christopher Howe',
          translations: [
            {
              id: 12,
              name: 'Karen Lang',
              language: 'fra',
              abbreviation: 'Alexander Barry',
              pos: 'Sarah Curtis',
              example: 'Shawn Bush',
              source: 'Katie Orozco',
              term_id: 8,
            },
            {
              id: 13,
              name: 'Kevin Bryan',
              language: 'deu',
              abbreviation: 'Heather Higgins',
              pos: 'David Dean',
              example: 'Justin Hendrix',
              source: 'Steven Moore',
              term_id: 8,
            },
          ],
          cycle_id: 1,
          created_at: '2021-01-06T07:56:26.630932Z',
          updated_at: '2021-01-06T07:56:26.630952Z',
        },
        {
          id: 9,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: 'Taylor Berry',
          feedback: 'Melissa Tran',
          comment: 'Kathleen Jackson',
          status: 'unrevised',
          speaker: 'Jessica Garcia',
          favorite: 'Kenneth Cline',
          translations: [
            {
              id: 14,
              name: 'Cassidy Salas',
              language: 'eng',
              abbreviation: 'Angela Flowers',
              pos: 'Kevin Meza',
              example: 'Jeanette Nguyen',
              source: 'Sandra Cardenas',
              term_id: 9,
            },
            {
              id: 15,
              name: 'Reginald Wilson',
              language: 'fra',
              abbreviation: 'Troy Mason',
              pos: 'Jeremiah Davis',
              example: 'Rachel Graham',
              source: 'Jerry Perez',
              term_id: 9,
            },
          ],
          cycle_id: 1,
          created_at: '2021-01-06T07:56:26.636853Z',
          updated_at: '2021-01-06T07:56:26.636875Z',
        },
        {
          id: 10,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: 'Joseph Johnson',
          feedback: 'Bradley Griffith',
          comment: 'Andrew Brady',
          status: 'unrevised',
          speaker: 'Richard Nguyen',
          favorite: 'Christine Carroll',
          translations: [
            {
              id: 16,
              name: 'Kaitlyn Mccullough',
              language: 'eng',
              abbreviation: 'Anna Ferguson',
              pos: 'Richard Nelson',
              example: 'Gwendolyn Brown',
              source: 'Jose Poole',
              term_id: 10,
            },
            {
              id: 17,
              name: 'Jennifer Nguyen',
              language: 'deu',
              abbreviation: 'Douglas Kelly',
              pos: 'Cheryl Mckay',
              example: 'Hunter Smith',
              source: 'David Washington',
              term_id: 10,
            },
          ],
          cycle_id: 1,
          created_at: '2021-01-06T07:56:26.639875Z',
          updated_at: '2021-01-06T07:56:26.639897Z',
        },
        {
          id: 11,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: 'Dylan Lopez',
          feedback: 'Samantha Mueller',
          comment: 'Rhonda Salas',
          status: 'unrevised',
          speaker: 'Mrs. Suzanne Baker',
          favorite: 'Sarah Barajas',
          translations: [
            {
              id: 18,
              name: 'Stacy Scott',
              language: 'eng',
              abbreviation: 'Jacqueline Nguyen',
              pos: 'Taylor Anderson',
              example: 'Daniel Jones',
              source: 'Annette Warner',
              term_id: 11,
            },
            {
              id: 19,
              name: 'Tyler Simpson',
              language: 'fra',
              abbreviation: 'Julie Rojas',
              pos: 'David Hawkins',
              example: 'Sara Lewis',
              source: 'Glenn Combs',
              term_id: 11,
            },
            {
              id: 20,
              name: 'Laura Bowers',
              language: 'deu',
              abbreviation: 'Dennis Vargas',
              pos: 'David Castillo',
              example: 'Michelle Summers',
              source: 'Vicki Bradley',
              term_id: 11,
            },
          ],
          cycle_id: 1,
          created_at: '2021-01-06T07:56:26.643290Z',
          updated_at: '2021-01-06T07:56:26.643311Z',
        },
        {
          id: 44,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: null,
          feedback: null,
          comment: null,
          status: 'unrevised',
          speaker: null,
          favorite: null,
          translations: [
            {
              id: 79,
              name: 'entity 2',
              language: 'eng',
              abbreviation: null,
              pos: null,
              example: null,
              source: null,
              term_id: 44,
            },
          ],
          cycle_id: 2,
          created_at: '2021-01-06T17:41:47.014618Z',
          updated_at: '2021-01-06T17:41:47.055630Z',
        },
        {
          id: 73,
          editor: {
            id: 1,
            full_name: 'zia rehman',
          },
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: null,
          feedback: null,
          comment: null,
          status: 'revised',
          speaker: null,
          favorite: null,
          translations: [
            {
              id: 111,
              name: 'fancy',
              language: 'fra',
              abbreviation: null,
              pos: null,
              example: null,
              source: null,
              term_id: 73,
            },
            {
              id: 110,
              name: 'new',
              language: 'eng',
              abbreviation: null,
              pos: 'something',
              example: null,
              source: null,
              term_id: 73,
            },
          ],
          cycle_id: 2,
          created_at: '2021-01-07T07:31:17.367741Z',
          updated_at: '2021-01-07T07:31:29.407935Z',
        },
        {
          id: 74,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: null,
          feedback: null,
          comment: null,
          status: 'unrevised',
          speaker: null,
          favorite: null,
          translations: [
            {
              id: 112,
              name: 'entity 2',
              language: 'eng',
              abbreviation: null,
              pos: null,
              example: null,
              source: null,
              term_id: 74,
            },
          ],
          cycle_id: 2,
          created_at: '2021-01-07T07:36:53.305991Z',
          updated_at: '2021-01-07T07:36:53.323332Z',
        },
        {
          id: 75,
          editor: null,
          creator: {
            id: 1,
            full_name: 'zia rehman',
          },
          definition: null,
          feedback: null,
          comment: null,
          status: 'unrevised',
          speaker: null,
          favorite: null,
          translations: [
            {
              id: 113,
              name: 'entity 2',
              language: 'eng',
              abbreviation: null,
              pos: null,
              example: null,
              source: null,
              term_id: 75,
            },
          ],
          cycle_id: 2,
          created_at: '2021-01-07T07:50:56.723137Z',
          updated_at: '2021-01-07T07:50:56.751791Z',
        },
      ],
    },
    search: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
  },
  search: {
    term: '',
    results: [],
  },
  modal: { isOpen: false },
  languages: { all: [] },
  admin: {
    dashboard: {
      current_page: 1,
      perPage: 10,
      next_page: 2,
      previous_page: null,
      total_pages: 2,
      statistics: {
        total_projects: 13,
        keyword_projects: 2,
        url_projects: 3,
        upload_projects: 3,
        blank_projects: 5,
        total_interpreters: 3,
      },
      projects: [
        {
          id: 13,
          name: 'vnvnv',
          type: 'keyword',
          share_type: 'private',
          interpreter: {
            ids: 7,
            full_name: 'None None',
          },
          terms_count: 84,
          status: 'Inactive',
          languages: {
            primary_language: 'eng',
            secondary_languages: ['fra'],
          },
        },
        {
          id: 12,
          name: 'vnvnv',
          type: 'keyword',
          share_type: 'private',
          interpreter: {
            ids: 7,
            full_name: 'None None',
          },
          terms_count: 84,
          status: 'Inactive',
          languages: {
            primary_language: 'eng',
            secondary_languages: ['fra'],
          },
        },
      ],
    },
    interpreters: {
      current_page: 1,
      perPage: 10,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [
        {
          id: 9,
          email: 'aqib@devsinc.com',
          full_name: 'None None',
          date_joined: '2021-03-05T07:56:35.641Z',
          no_of_projects: 0,
          status: 'Active',
          roles: ['interpreter'],
          languages: ['eng', 'deu', 'fra'],
        },
        {
          id: 10,
          email: 'zia@devsinc.com',
          full_name: 'None None',
          date_joined: '2021-03-05T07:56:35.641Z',
          no_of_projects: 0,
          status: 'Active',
          roles: ['interpreter'],
          languages: ['eng', 'deu', 'fra'],
        },
      ],
    },
  },
};

const store = mockStore(initialState);

export default store;
