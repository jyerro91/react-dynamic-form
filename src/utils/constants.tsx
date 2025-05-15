

export const SNAPI_API_URL = 'https://ingtst.service-now.com/api/ingg2/v22/itsm/incident';

  export const ISSUE_TYPES = [
  {label: 'Incident', value: '1-incident'},
  {label: 'Question', value: '2-question'},
  {label: 'Free format request', value: '3-request'},
];

export const ISSUE_SUB_TYPES = [
  {label: 'Backup and Restore', value: '1-backup-restore'},
  {label: 'Citrix', value: '2-citrix'},
  {label: 'Cloud Atlas', value: '3-cloud-atlas'},
  {label: 'Database', value: '4-database'},
  {label: 'Failed Deployment', value: '5-failed-deployment'},
  {label: 'ICHP', value: '6-ichp'},
  {label: 'Network / GSO', value: '7-network-gso'},
  {label: 'Operating System', value: '8-operating-system'},
  {label: 'Other', value: '9-other'},
  {label: 'Security Access', value: '10-security-access'},
  {label: 'Storage', value: '11-storage'},
];

export const IMPACT_LEVELS = [
  {label: '3 Low - affects no one', value: '3-Low'},
  {label: '2 Medium - affects 1 to 10 clients', value: '2-Medium'},
  {label: '1 High - affects more than 10 clients', value: '1-High'},
];

export const URGENCY_LEVELS = [
  {label: '3 Low - solution can be delayed for a longer time', value: '3-Low'},
  {label: '2 Medium - service needs to be restored ASAP', value: '2-Medium'},
  {label: '1 High - service must be restored immediately', value: '1-High'},
];

export const ENVIRONMENTS = [
  {label: 'Development', value: 'development'},
  {label: 'Test', value: 'test'},
  {label: 'Acceptance', value: 'acceptance'},
  {label: 'Production', value: 'production'},
];


export const IS_APPLICATION_OWNER = [
  {label: 'No', value: '0'},
  {label: 'Yes', value: '1'},
];

export const IMPACTED_USERS = [
  {label: 'One', value: 'One'},
  {label: 'Multiple', value: 'Multiple'},
];

export const CATEGORIES = [
  {label: 'IPC', value: 'ipc'},
  {label: 'SNDO', value: 'sndo'},
  {label: 'Public Cloud', value: 'public-cloud'},
  {label: 'OnePipeline', value: 'one-pipeline'},
]

export const PORTAL_VERSION = [
  {label: 'Production (https://publishedapps.ing.net/)', value: 'Prod'},
  {label: 'Non-Production (https://publishedapps-nonprod.ing.net/)', value: 'NonProd'},
];

export const TENANT = [
  '',
  'Wholesale Banking Tech',
  'Domestic Bank NL',
  'Group Services',
  'Local NL',
  'Tech Infra',
  'ING Belgium',
  'ING Romania',
  'Tech Romania',
  'ING Italy',
  'ING Spain',
  'ING Germany',
  'ING Czech Republic',
  'ING Luxembourg',
  'ING Australia',
  'ING France',
  'ING PL Bank Ślaski',
  'ING HUBS Polant',
  'ING Switzerland',
  'ING Austria',
  'ING CNG',
] as const;


/**
 * Database Related Field Data
 */
export const DB_PROBLEM_CATEGORIES = [
  '',
  'Security',
  'Availability',
  'Connectivity',
  'Backup/restore',
  'Risk',
  'Clone/copy',
  'DR',
  'Performance',
  'Migration',
  'Patch',
  'Start/stop',
  'Resize',
  'Add/remove additional network',
  'Remove Oracle database',
  'Add/alter/drop DBFS',
  'PEDR',
] as const;

export const DB_TYPES = ['', 'DBaaS Oracle', 'MS SQL'] as const;

/**
 * ICHP Related Field Data
 */
export const ICHP_CLUSTER_NAMES = [
  '0001','0002','0003','0004',
  '0013','0014','0016','0017',
  '0018','0019','0021','0022',
  '0023','0024','0030','0031',
  '0032','0033','0046','0047',
  '0048','0049','0050','0051',
  '0052','0053'
] as const;

export const ICHP_ISSUE_SCOPES =[ 
  'Network and Firewall',
  'Deployment and Pipeline',
  'Monitoring and Logging',
  'Namespace quota', 'Hardware',
  'S3', 'OVN', 'Onboarding', 
  '2nd day operations', 'Others'
] as const;

export const ICHP_NETWORK_DOMAIN_INTERACTION =[
  'EAGN',
  'EIN',
  'BZ',
  'UAZ',
  'TPA',
] as const;

/**
 * Network /GSO Related Field Data
 */
export const NETWORK_SEVERITIES = [
  '',
  'LOW - issue affects only one user',
  'MEDIUM - issue affects few/several users',
  'HIGH - issue is wide spread/whole team is affected',
  'FATAL - issue affects whole Tenant'
] as const;

/**
 * OS Related Field Data
 */
export const OS_LINUX_ISSUE_SCOPES = [
  {value: 'patching', name: 'Patching'},
  {value: 'host-unreachable', name: 'Host unreachable/unresponsive'},
  {value: 'resource-capacity', name: 'Resource/Capacity'},
  {value: 'stack-wide', name: 'Stack wide'},
];

export const OS_WINDOWS_ISSUE_SCOPES = [
  'Failed provisioning',
  '2nd day operations / patching issues',
  'Monitoring issue - SquaredUp (SCOM Portal)',
  'SollAR implementation',
  'TSCM / VS / FQD+',
  'Patching not visible in the software center',
  'Other'
] as const;

/**
 * Storage Related Field Data
 */
export const STORAGE_ISSUE_SCOPES = [
  '',
  'File sharing (NFS / SMB)',
  'ECS object storage (s3)',
  'Minio object storage',
  'Other'
] as const;