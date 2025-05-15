import { 
  Incident, 
  FormType, 
  CloudAtlasIncident, 
  BaseIncident,
  BackupRestoreIncident,
  CitrixIncident,
  DatabaseIncident,
  SecurityAccessIncident,
  OtherIncident,
  FailedDeploymentIncident,
  NetworkIncident,
  IchpIncident,
  IchpIssueScopeType,
  OperatingSystemIncident,
  LinuxIssueScopeType,
  StorageIncident,
  StorageIssueScopeType,
} from './schema';

export const convertObjectToEnum = (OBJECT_CONSTANTS) => {
  type OBJ_CONS_TYPE = typeof OBJECT_CONSTANTS[number]["value"];
  // z.enum expects a non-empty array so to work around that
  // we pull the first value out explicitly
  const VALUES: [OBJ_CONS_TYPE, ...OBJ_CONS_TYPE[]] = [
    OBJECT_CONSTANTS[0].value,
    // And then merge in the remaining values from `properties`
    ...OBJECT_CONSTANTS.slice(1).map((param) => param.value)
  ];

  return VALUES;
}

export const filterObjectKeys = (arr, keysToKeep) => {
  return Object.keys(arr)
  .filter(key => keysToKeep.includes(key))
  .reduce((obj, key) => {
    obj[key] = arr[key];
    return obj;
  }, {});
}

export const getIncidentIssue = (form: FormType) => {
  if (form.issue !== '1-incident') {
    return form.issue;
  }

  return form.subIssue;
}

export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''; // Or handle the error as needed
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const calculatePriority = (impact: string, urgency: string): string => {
  if (!impact || !urgency) {
    return '';
  }

  const impactNumber = Number(impact.charAt(0));
  const urgencyNumber = Number(urgency.charAt(0));

  const priorityMatrix: { [key: number]: { [key: number]: string } } = {
    1: {1: '1 - Critical', 2: '2 - High', 3: '3 - Moderate'},
    2: {1: '2 - High', 2: '3 - Moderate', 3: '4 - Low'},
    3: {1: '3 - Moderate', 2: '4 - Low', 3: '5 - Planning'}
  };

  return priorityMatrix[urgencyNumber][impactNumber] || '';
}

export const isApplicationOwner = (applicationOwner) => (
  applicationOwner === '1' || false
)

const defaultPostBody = {
  "assignment group": "Tech/BankInfra/GCE IPC/IPC_FirstLine",
  "description": "Lorem backstage OneFirstLine Long Description",
  "impact": "",
  "notify by": "",
  "short description": "Lorem backstage OneFirstLine",
  "support offering - l2": "IPC FirstLine Support",
  "urgency": ""
}

export const preparePayload = (form: Incident, issue: string) => {
  let transformedData;

  switch (issue) {
    case '1-backup-restore':
      transformedData = backupRestoreForm(form);
      break;
    case '2-citrix':
      transformedData = citrixForm(form);
      break;
    case '3-cloud-atlas':
      transformedData = cloudAtlasForm(form);
      break;
    case '4-database':
      transformedData = databaseForm(form);
      break;
    case '5-failed-deployment':
      transformedData = failedDeploymentForm(form);
      break;
    case '6-ichp':
      transformedData = ichpForm(form);
      break;
    case '7-network-gso':
      transformedData = networkForm(form);
      break;
    case '8-operating-system':
      transformedData = operatingSystemForm(form);
      break;
    case '9-other':
      transformedData = otherForm(form);
      break;
    case '10-security-access':
      transformedData = securityAccessForm(form);
      break;
    case '11-storage':
      transformedData = storageForm(form);
      break;
    default:
      transformedData = {
        shortDescription: form.shortDescription,
        description: 'Description: ' + form.description
      }
      break;
  }

  // return {...defaultPostBody, ...transformedData};
  return defaultPostBody;
}

const backupRestoreForm = (form: BackupRestoreIncident) => {
  return {
    shortDescription: '[Backup/Restore]: ' + form.shortDescription,
    description: 'Description: ' + form.description,
    urgency: form?.urgency,
    impact: form?.impact,
  }
}

const citrixForm = (form: CitrixIncident) => {
  return {
    shortDescription: '[Citrix]: ' + form.shortDescription,
    description: 'Description: ' + form?.description
    + (isApplicationOwner(form?.applicationOwner) ? '\n' + 'Changes or modifications prior to the incident: ' + form?.additionalDescription : '')
    + (isApplicationOwner(form?.applicationOwner) ? '\n' + 'Citrix server name: ' + form?.citrixServerName : '')
    + (isApplicationOwner(form?.applicationOwner) ? '\n' + 'Delivery group name: ' + form?.deliveryGroupName : '')
    + '\n' + 'Portal version: ' + form?.portalVersion
    + '\n' + 'Published application name: ' + form?.publishedApplicationName
    + '\n' + 'Published application folder name: ' + form?.publishedApplicationFolderName
    + '\n' + 'Occurrence date start: ' + form?.occurrenceDateStart
    + '\n' + 'Occurrence date end: ' + form?.occurrenceDateEnd
    + '\n' + 'Occurrence time start: ' + form?.occurrenceTimeStart
    + '\n' + 'Impacted users: ' + form?.impactedUsers
    + '\n' + 'User CK: ' + form?.userCk,
    urgency: form?.urgency,
    impact: form?.impact,
  }
}

const cloudAtlasForm = (form: CloudAtlasIncident) => {
  return {
    shortDescription: '[Cloud Atlas]: ' + form.shortDescription,
    description: 'Action Set ID: ' + form?.actionSetId + '\n' + 'Description: ' + form?.description,
    urgency: form?.urgency,
    impact: form?.impact,
  }
}

const databaseForm = (form: DatabaseIncident) => {
  return {
    shortDescription: '[' + form.databaseType + '][Tenant: ' + form.tenant + '] ' + form.problemCategory,
    configurationItem: form.ciName,
    description: 'Database type & Cluster name: ' + form.databaseType + ' & ' + form.clusterName
      + '\n' + 'Configuration item name: ' + form.ciName
      + '\n' + 'Environment: ' + form.environment
      + '\n' + 'Impact: ' + form.impact
      + '\n' + 'Urgency: ' + form.urgency
      + '\n' + 'Contact person: ' + form.contactPerson
      + '\n' + 'Country of caller: ' + form.countryCaller
      + '\n' + 'Problem category: ' + form.problemCategory
      + '\n' + 'Description: ' + form.description,
    // attachments: this.prepareAttachments(),
    urgency: form.urgency,
    impact: form.impact,
  }
}

const failedDeploymentForm = (form: FailedDeploymentIncident) => {
  return {
    shortDescription: '[Failed deployment] ' + form.shortDescription,
    description: 'Business Group: ' + form.businessGroup
    + '\n' + 'Tenant: ' + form.tenant 
    + '\n' + 'VM / Server name: ' + form.serverVmName
    + '\n' + 'Environment: ' + form.environment
    + '\n' + 'Name of the failed workflow: ' + form.workflowName
    + '\n' + 'Description: ' + form.description,
    // attachments: this.prepareAttachments(),
    urgency: form.urgency,
    impact: form.impact,
  }
}

const networkForm = (form: NetworkIncident) => {
  return {
    shortDescription: '[Network / GSO] ' + form.applicationName,
    description: 'Severity: ' + form.severity
      + (form.siteUrl?.trim() ? '\n' + 'URL of the site: ' + form.siteUrl : '')
      + (form.hostName?.trim() ? '\n' + 'Host name: ' + form.hostName : '')
      + (form.environment?.trim() ? '\n' + 'Environmnet: ' + form.environment : '')
      + (form.accessRequestId?.trim() ? '\n' + 'Access request UUID: ' + form.accessRequestId : '')
      + (form.workedInPast?.trim() ? '\n' + 'Did it work in past: ' + form.workedInPast : '')
      + '\n' + 'Occurrence time start: ' + form.occurrenceTimeStart
      + '\n' + 'Occurrence time end: ' + form.occurrenceTimeEnd
      + '\n' + 'Source IP address: ' + form.sourceIpAddress
      + '\n' + 'Destination IP address: ' + form.destinationIpAddress
      + '\n' + 'Destination port: ' + form.destinationPort
      + '\n' + 'Description: ' + form.description,
    // attachments: this.prepareAttachments(),
    urgency: form?.urgency,
    impact: form?.impact,
  }
}

const ichpForm = (form: IchpIncident) => {
  let subComponentDescription;
  const issue: IchpIssueScopeType = form.issueScope;

  switch (issue) {
    case 'Network and Firewall':
      subComponentDescription = 'Source: ' + form.source
      + '\n' + 'Destination: ' + form.destination
      + '\n' + 'Port: ' + form.port
      + '\n' + 'Network domain interaction: ' + form.networkDomainInteraction;
      break;
    case 'Namespace quota':
      subComponentDescription =  'Is autoscaler active: ' + form.activeAutoscaler;
      break;
    default:
      subComponentDescription = false;
      break;
  }

  return {
    shortDescription: '[ICHP][' + form.issueScope +'] '  + form.shortDescription,
    description: 'Description: ' + form.description
    + '\n' + 'Namespace name: ' + form.namespaceName
    + '\n' + 'Cluster: ichp_cluster_' + form.clusterName 
    + (subComponentDescription ? '\n' + subComponentDescription : '') ,
    // attachments: this.prepareAttachments(),
    urgency: form.urgency,
    impact: form.impact,
  }
}

const operatingSystemForm = (form: OperatingSystemIncident) => {
  let subComponentDescription;
  let issueScope;
  const issue: LinuxIssueScopeType = form.issueScope;

  switch (issue) {
    case 'patching':
      issueScope = 'Patching - ' + form.failedAction
      subComponentDescription = 'Host name: ' + form.hostVmName + '\n' + 'Ansible Job ID: ' + form.ansibleJobId;
      break;
    case 'host-unreachable':
      issueScope = 'Host unreachable/unresponsive'
      subComponentDescription = 'FQDN Name: ' + form.fqdnVmName + '\n' + 'Error from SSH: ' + form.errorMessageSsh
        + '\n' + 'FW report showing matching firewall rule: ' + form.firewallReport;
      break;
    case 'resource-capacity':
      issueScope = 'Resource/Capacity'
      subComponentDescription = 'Issue description: ' + form.description + '\n' + 'Error message: ' + form.errorDescription;
      break;
    case 'stack-wide':
      issueScope = 'Stack wide'
      subComponentDescription = 'Issue description: ' + form.description;
      break;
    default:
      subComponentDescription = false;
      break;
  }

  return {
    shortDescription: '[OS/' + form.systemType +'] ' + (issueScope ?? form.issueScope),
    description: subComponentDescription,
    // description: 'Description: ' + form.description,
    // + '\n' + 'Namespace name: ' + form.namespaceName
    // + '\n' + 'Cluster: ichp_cluster_' + form.clusterName 
    // + (subComponentDescription ? '\n' + subComponentDescription : '') ,
    // attachments: this.prepareAttachments(),
    urgency: form.urgency,
    impact: form.impact,
  }
}

const otherForm = (form: OtherIncident) => {
  return {
    configurationItem: form.ciName,
    shortDescription: '[Other] ' + form.shortDescription,
    description: 'Configuration item name: ' + form.ciName + '\n' + 'Description: ' + form.description,
    urgency: form?.urgency,
    impact: form?.impact,
    // attachments: this.prepareAttachments(),
  }
}

const securityAccessForm = (form: SecurityAccessIncident) => {
  return {
    shortDescription: '[Security/Access]: ' + form.shortDescription,
    description: 'Description: ' + form.description,
    urgency: form?.urgency,
    impact: form?.impact,
    // attachments: this.prepareAttachments(),
  }
}

const storageForm = (form: StorageIncident) => {
  let subComponentDescription: string;
  const issue: StorageIssueScopeType = form.issueScope;

  switch (issue) {
    case 'File sharing (NFS / SMB)':
      subComponentDescription = 'File Share:Path: ' + form.fileSharePath;
      break;
    case 'ECS object storage (s3)':
      subComponentDescription =  'Namespace name: ' + form.namespaceName
     + '\n' + 'Bucket: ' + form.bucket
     + (form.accessKey?.trim() ? '\n' + 'Access key: ' + form.accessKey : '');
      break;
    case 'Minio object storage':
      subComponentDescription =  'Bucket: ' + form.bucket
     + (form.accessKey?.trim() ? '\n' + 'Access key: ' + form.accessKey : '');
      break;
    default:
      subComponentDescription = '';
      break;
  }

  return {
    shortDescription: '[Storage][' + form.issueScope + '] ' + form.shortDescription,
    description: 'Issue start date: ' + form.occurrenceTimeStart
    + (form.occurrenceTimeEnd ? '\n' + 'Issue end date: ' + form.occurrenceTimeEnd : '')
    + '\n' + 'Time zone: ' + form.timeZone
    + (subComponentDescription?.trim() ? '\n' + subComponentDescription : '')
    + '\n' + 'Description: ' + form.description,
    urgency: form.urgency,
    impact: form.impact,
    // attachments: this.prepareAttachments(),
  }
}