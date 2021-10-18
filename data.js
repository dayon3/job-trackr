const initialData = {
  jobs: {
    'job-1': {
      id: 'job-1',
      company: 'Vercel',
      title: 'Junior Software Engineer',
      salary: '$ 50,000',
      location: 'New York'
    },
    'job-2': {
      id: 'job-2',
      company: 'Microsoft Azure',
      title: 'DevOps Engineer',
      salary: '$ 90,000',
      location: 'New York'
    },
    'job-3': {
      id: 'job-3',
      company: 'Amazon',
      title: 'Frontend Engineer',
      salary: '$ 96,000',
      location: 'New York'
    },
    'job-4': {
      id: 'job-4',
      company: 'Labyrinthine Construction LLC',
      title: 'Senior Cloud Architect',
      salary: '$ 120,000',
      location: 'New York'
    },
    'job-5': {
      id: 'job-5',
      company: 'Netlify',
      title: 'Senior Cloud Architect',
      salary: '$ 120,000',
      location: 'New York'
    },
    'job-6': {
      id: 'job-6',
      company: 'Andela',
      title: 'JavaScript Developer',
      salary: '$ 120,000',
      location: 'New York'
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Wishlist',
      jobIds: ['job-1', 'job-2', 'job-3', 'job-4', 'job-5', 'job-6']
    },
    'column-2': {
      id: 'column-2',
      title: 'Applied',
      jobIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Interview',
      jobIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'Offer',
      jobIds: []
    },
    'column-5': {
      id: 'column-5',
      title: 'Rejected',
      jobIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5']
};

export default initialData;
