import { z } from 'zod';
import { 
  ISSUE_TYPES, 
  IMPACT_LEVELS, 
  URGENCY_LEVELS, 
  ISSUE_SUB_TYPES, 
  IS_APPLICATION_OWNER, 
  PORTAL_VERSION, 
  IMPACTED_USERS,
  DB_TYPES, 
  ENVIRONMENTS,
  TENANT,
  DB_PROBLEM_CATEGORIES,
  NETWORK_SEVERITIES,
  ICHP_ISSUE_SCOPES,
  ICHP_CLUSTER_NAMES,
  OS_LINUX_ISSUE_SCOPES,
  STORAGE_ISSUE_SCOPES,
} from './constants'

import { convertObjectToEnum } from './helpers'


export interface SubmittedData {
  incident: Incident;
  form: FormType;
}

export type FormType = {
  issue: IssueType,
  category: string,
  subIssue: IssueSubType
}

// Define Issue, Category, Sub Issue Types, Impact, Urgency
export const issueTypeEnum = z.enum(convertObjectToEnum(ISSUE_TYPES));
export type IssueType = z.infer<typeof issueTypeEnum>;

export const categoryTypeEnum = z.enum(['ipc', 'sndo', 'public cloud', 'onepipeline']);
export type CategoryType = z.infer<typeof categoryTypeEnum>;

export const issueSubTypeEnum = z.enum(convertObjectToEnum(ISSUE_SUB_TYPES));
export type IssueSubType = z.infer<typeof issueSubTypeEnum>;

export const impactEnum = z.enum(convertObjectToEnum(IMPACT_LEVELS));
export type ImpactType = z.infer<typeof impactEnum>;

export const urgencyEnum = z.enum(convertObjectToEnum(URGENCY_LEVELS));
export type UrgencyType = z.infer<typeof urgencyEnum>;

export const databaseTypeEnum = z.enum(DB_TYPES);
export type DatabaseType = z.infer<typeof databaseTypeEnum>;

export const environmentEnum = z.enum(convertObjectToEnum(ENVIRONMENTS));
export type EnvironmentType = z.infer<typeof environmentEnum>;

export const tenantEnum = z.enum(TENANT);
export type TenantType = z.infer<typeof tenantEnum>;

export const databaseProblemEnum = z.enum(DB_PROBLEM_CATEGORIES);
export type DatabaseProblemType = z.infer<typeof databaseProblemEnum>;

export const networkSeverityEnum = z.enum(NETWORK_SEVERITIES);
export type NetworkServerityType = z.infer<typeof networkSeverityEnum>;

export const ichpIssueScopeEnum = z.enum(ICHP_ISSUE_SCOPES);
export type IchpIssueScopeType = z.infer<typeof ichpIssueScopeEnum>;

export const ichpClusterNameEnum = z.enum(ICHP_CLUSTER_NAMES);
export type IchpClusterNameType = z.infer<typeof ichpClusterNameEnum>;

export const booleanOptionEnum = z.enum(['Yes', 'No',]);
export type BooleanOptionType = z.infer<typeof booleanOptionEnum>;

export const linuxIssueScopeEnum = z.enum(convertObjectToEnum(OS_LINUX_ISSUE_SCOPES));
export type LinuxIssueScopeType = z.infer<typeof linuxIssueScopeEnum>;

export const storageIssueScopeEnum = z.enum(STORAGE_ISSUE_SCOPES);
export type StorageIssueScopeType = z.infer<typeof storageIssueScopeEnum>;


/*
 * Form Schema Definition 
 */
export const BaseIncidentSchema = z.object({
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description cannot exceed 5000 characters'),
  shortDescription: z.string()
    .min(10, 'Short description must be at least 10 characters')
    .max(100, 'Short description cannot exceed 100 characters'),

  // assignmentGroup: z.string().default('Tech/BankInfra/GCE IPC/IPC_FirstLine'),
  // category: z.nullable(),
  // impact: z.string().nullable(),
  // urgency: z.string().nullable(),
  // notifyBy: z.string().nullable(),
  // supportOfferingL2: z.string().default('IPC FirstLine Support'),
});

export const BackupRestoreIncidentSchema = BaseIncidentSchema.extend({
  impact: impactEnum,
  urgency: urgencyEnum,
});

// TODO: Fix DatePicker to Allow DateStart and DateEnd
export const CitrixIncidentSchema = BackupRestoreIncidentSchema.extend({
  userCk: z.string()
    .length(6, 'Corporate key must contain exact 6 character(s)'),
  publishedApplicationName: z.string().min(2),
  publishedApplicationFolderName: z.string().min(2),
  occurrenceDateStart: z.string(),
  occurrenceTimeStart: z.string(),

  portalVersion: z.enum(convertObjectToEnum(PORTAL_VERSION)).default('Prod'),
  impactedUsers: z.enum(convertObjectToEnum(IMPACTED_USERS)).default('One'),
  applicationOwner: z.enum(convertObjectToEnum(IS_APPLICATION_OWNER)),
  citrixServerName: z.string().optional(),
  deliveryGroupName: z.string().optional(),
  additionalDescription: z.string().optional(),
  // occurrenceDateStart: ['', requiredValidator],
  // occurrenceDateEnd: ['', requiredValidator],
  // occurrenceTimeStart: ['', requiredValidator],
}).superRefine((data, ctx) => {
  if (data.applicationOwner === '1' && 
    (!data.citrixServerName || data.citrixServerName.length === 0) &&
    (!data.deliveryGroupName || data.deliveryGroupName.length === 0) ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Citrix server name is required",
      path: ["citrixServerName"]
    })
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Delivery group name is required",
      path: ["deliveryGroupName"]
    })
    return true;
  }
});

export const CloudAtlasIncidentSchema = BackupRestoreIncidentSchema.extend({
  actionSetId: z.string()
})

export const DatabaseIncidentSchema = BackupRestoreIncidentSchema.extend({
  shortDescription: z.string().optional(),
  databaseType: databaseTypeEnum,
  ciName: z.string(),
  clusterName: z.string().optional(),
  tenant: tenantEnum,
  environment: environmentEnum,
  contactPerson: z.string(),
  countryCaller: z.string(),
  problemCategory: databaseProblemEnum,
// attachments
});

export const OtherIncidentSchema = BackupRestoreIncidentSchema.extend({
  ciName: z.string().optional(),
// attachments
});

export const FailedDeploymentIncidentSchema = BackupRestoreIncidentSchema.extend({
  businessGroup: z.string().min(3),
  tenant: tenantEnum,
  serverVmName: z.string().min(3),
  environment: environmentEnum,
  workflowName: z.string().min(3),
  // attachments: [''],
});

export const NetworkIncidentSchema = BackupRestoreIncidentSchema.extend({
  shortDescription: z.string().optional(),
  severity: networkSeverityEnum,
  siteUrl: z.string().optional(),
  hostName: z.string().optional(),
  environment: z.string(),
  applicationName: z.string(),
  sourceIpAddress: z.string().ip(),
  destinationIpAddress: z.string().ip(),
  destinationPort: z.string(),
  accessRequestId: z.string(),
  occurrenceTimeStart: z.string()
    .min(1, { message: "This field is required" }),
  occurrenceTimeEnd: z.string()
    .min(1, { message: "This field is required" }),
  workedInPast: z.string()
    .min(1, { message: "This field is required" }),
  // attachments: z.string(),
  // attachments: [''],
});

export const IchpIncidentSchema = BackupRestoreIncidentSchema.extend({
  issueScope: ichpIssueScopeEnum,
  // issueScope: z.string().pipe(
  //     z.enum(ICHP_ISSUE_SCOPES).catch( 'UNKNOWN' )
  // ),
  
  namespaceName: z.string()
    .min(1, { message: "This field is required" }),
  clusterName: ichpClusterNameEnum,
  source: z.string().optional(),
  destination: z.string().optional(),
  port: z.string().optional(),
  networkDomainInteraction: z.string().array().optional(),
  activeAutoscaler: booleanOptionEnum.optional(),
  //  z.string().optional().default('Yes'),
  // attachments: [''],
}).superRefine((data, ctx) => {
  if (data.issueScope === 'Network and Firewall' && 
    (!data.source || data.source.length === 0) &&
    (!data.destination || data.destination.length === 0) &&
    (!data.port || data.port.length === 0) ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Source field is required",
      path: ["source"]
    })
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Destination field is required",
      path: ["destination"]
    })
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Port field is required",
      path: ["port"]
    })
    return true;
  }
});

export const StorageIncidentSchema = BackupRestoreIncidentSchema.extend({
  issueScope: storageIssueScopeEnum.optional(),
  occurrenceTimeStart: z.string().optional(),
  occurrenceTimeEnd: z.string().optional(),
  timeZone: z.string().optional(),
  
  // File sharing issue scope 
  fileSharePath: z.string().optional(),
  // ECS object storage issue scope
  namespaceName: z.string().optional(),
  bucket: z.string().optional(),
  accessKey: z.string().optional(),
  // attachments: z.string(),
});

export const OperatingSystemIncidentSchema = BackupRestoreIncidentSchema.extend({
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  
  systemType: z.enum(['Linux', 'Windows']).default('Linux'),
  issueScope: linuxIssueScopeEnum,

  // Linux - Resource/Capacity
  fqdnHostName: z.string().optional(),
  errorDescription: z.string().optional(),

  // Linux - Host/Unreachable
  fqdnVmName: z.string().optional(),
  errorMessageSsh: z.string().optional(),
  firewallReport: z.string().optional(),

  // Linux - Patching
  failedAction: z.string().optional(),
  hostVmName: z.string().optional(),
  ansibleJobId: z.string().optional(),
  // serverVmName: z.string().min(3),
  // environment: environmentEnum,
  // workflowName: z.string().min(3),
  // tenant: tenantEnum,
  // attachments: [''],
});

/*
 * ----------------------------------------------------------
 * Incident Type Definitions
 * ----------------------------------------------------------
 */

export type BaseIncident = z.infer<typeof BaseIncidentSchema>;
export type BackupRestoreIncident = z.infer<typeof BackupRestoreIncidentSchema>;
export type CitrixIncident = z.infer<typeof CitrixIncidentSchema>;
export type CloudAtlasIncident = z.infer<typeof CloudAtlasIncidentSchema>;
export type DatabaseIncident = z.infer<typeof DatabaseIncidentSchema>;
export type SecurityAccessIncident = z.infer<typeof BackupRestoreIncidentSchema>; //Same fields with Backup and Restore
export type OtherIncident = z.infer<typeof OtherIncidentSchema>;
export type FailedDeploymentIncident = z.infer<typeof FailedDeploymentIncidentSchema>;
export type NetworkIncident = z.infer<typeof NetworkIncidentSchema>;
export type IchpIncident = z.infer<typeof IchpIncidentSchema>;
export type OperatingSystemIncident = z.infer<typeof OperatingSystemIncidentSchema>;
export type StorageIncident = z.infer<typeof StorageIncidentSchema>;
export type Incident = BaseIncident | BackupRestoreIncident | CitrixIncident | CloudAtlasIncident | DatabaseIncident | SecurityAccessIncident | OtherIncident | FailedDeploymentIncident | NetworkIncident | OperatingSystemIncident | IchpIncident | StorageIncident;


// Map incident types to schemas
export const incidentSchemaMap = {
  default: BaseIncidentSchema,
  '1-backup-restore': BackupRestoreIncidentSchema,
  '2-citrix': CitrixIncidentSchema,
  '3-cloud-atlas': CloudAtlasIncidentSchema,
  '4-database': DatabaseIncidentSchema,
  '5-failed-deployment': FailedDeploymentIncidentSchema,
  '6-ichp': IchpIncidentSchema,
  '7-network-gso': NetworkIncidentSchema,
  '8-operating-system': OperatingSystemIncidentSchema,
  '9-other': OtherIncidentSchema,
  '10-security-access': BackupRestoreIncidentSchema,
  '11-storage': StorageIncidentSchema,
} as const;

// Get schema for a specific incident type
export const getSchemaForType = (issue: IssueType, subIssue: IssueSubType) => {
  const key = (issue !== '1-incident') ? 'default' : subIssue ;

  return incidentSchemaMap[key];
};

// Get default values for a specific incident type
export const getDefaultValuesForType = (issue: IssueType, subIssue: IssueSubType): Partial<Incident> => {
  // Common default values
  const baseDefaults = {
    description: '',
    shortDescription: '',
    // date: new Date().toISOString().split('T')[0],
  };

  let value  = (issue !== '1-incident') ? 'default' : subIssue ;

  // Add type-specific defaults
  switch (value) {
    case '1-backup-restore':
      return {
        ...baseDefaults,
        impact: '',
        urgency: '',
      };
      break;
    case '2-citrix':
      return {
        ...baseDefaults,
        userCk: 'AB53TQ',
        publishedApplicationName: '',
        publishedApplicationFolderName: '',
        occurrenceDateStart: '',
        occurrenceTimeStart: '',
        applicationOwner: '0',
        citrixServerName: '',
        deliveryGroupName: '',
        additionalDescription: '',
        portalVersion: 'Prod',
        impactedUsers: 'One',
        impact: '',
        urgency: '',
      };
      break;
    case '3-cloud-atlas':
      return {
        ...baseDefaults,
        actionSetId: '',
        impact: '',
        urgency: '',
      };
      break;
    case '4-database':
      return {
        ...baseDefaults,
        databaseType: '',
        ciName: '',
        clusterName: '',
        tenant: '',
        environment: '',
        contactPerson: 'AB53TQ',
        countryCaller: '',
        problemCategory: '',
        impact: '',
        urgency: '',
      };
      break;
    case '5-failed-deployment':
      return {
        ...baseDefaults,
        businessGroup: '',
        tenant: '',
        serverVmName: '',
        environment: '',
        workflowName: '',
        impact: '',
        urgency: '',
      };
      break;
    case '6-ichp':
      return {
        ...baseDefaults,
        issueScope: '',
        namespaceName: '',
        clusterName: '',
        source: '',
        destination: '',
        activeAutoscaler: '',
        port: '',
        networkDomainInteraction: [],
        impact: '',
        urgency: '',
      };
    case '7-network-gso':
      return {
        ...baseDefaults,
        severity: '',
        siteUrl: '',
        hostName: '',
        environment: '',
        applicationName: '',
        sourceIpAddress: '',
        destinationIpAddress: '',
        destinationPort: '',
        accessRequestId: '',
        occurrenceTimeStart: '',
        occurrenceTimeEnd: '',
        workedInPast: '',
        // attachments: '',
        impact: '',
        urgency: '',
      };
    case '8-operating-system':
      return {
        ...baseDefaults,
        systemType: 'Linux',
        fqdnHostName: '',
        errorDescription: '',
        fqdnVmName: '',
        errorMessageSsh: '',
        firewallReport: '',
        failedAction: '',
        hostVmName: '',
        ansibleJobId: '',
        impact: '1-High',
        urgency: '3-Low',
      };
      break;
    case '9-other':
      return {
        ...baseDefaults,
        ciName: '',
        impact: '',
        urgency: '',
      };
      break;
    case '10-security-access':
      return {
        ...baseDefaults,
        impact: '',
        urgency: '',
      };
    case '11-storage':
      return {
        ...baseDefaults,
        // impact: '3-Low',
        // urgency: '3-Low',
      }
      break;
    case '11-storage':
      return {
        ...baseDefaults,
        issueScope: '',
        occurrenceTimeStart: '',
        occurrenceTimeEnd: '',
        timeZone: '',
        fileSharePath: '',
        namespaceName: '',
        bucket: '',
        accessKey: '',
        impact: '',
        urgency: '',
        // attachments: '',
      };
      break;
    default:
      return baseDefaults;
  }
};


/*
 * TESTER FUNCTION 
 */
export function tester() {
  const user = {
    description: 'testasdasdasd',
    shortDescription: 'testasdasdasd',
    impact: '1-High',
    urgency: '2-Medium',
  }

  console.log(BackupRestoreIncidentSchema.parse(user));
}


