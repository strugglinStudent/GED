export class User {
  _id?: string;
  userName?: string;
  email?: string;
  password?: string;
  role?: string;
  companyName?: string;
  avatar?: string;
  phoneNumber?: string;
  language?: string;
  country?: string;
  status?: string;
  requestPasswordReset?: string;
  userGroups?: UserGroup[];
}
export class UserGroup {
  _id?: string;
  name?: string;
  description?: string;
  users?: {
    userId: string;
    permissions: ('approve' | 'validate' | 'reject' | 'archive' | 'delete' | 'edit')[];
  }[];
}

export class Workflow {
  _id?: string;
  name?: string;
  description?: string;
  users?: {
    userId: string;
    permissions: ('approve' | 'validate' | 'reject' | 'archive' | 'delete' | 'edit')[];
  }[];
}
