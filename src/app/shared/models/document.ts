// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface Document {
  _id?: string;
  originalName: string;
  mimeType: string;
  path?: string;
  size: number;
  uploadedBy?: string;
  uploadDate: Date;
  content?: Content;
  status?: 'pending' | 'validated' | 'approved' | 'rejected' | 'archived';
  statusLog?: {
    userId?: string;
    changeDate?: Date;
    changeType?: 'upload' | 'approve' | 'validate' | 'reject' | 'archive' | 'delete' | 'edit';
  }[];
}

export interface Content {
  title: string;
  date?: Date;
  orderNumber?: string;
  storeName?: string;
  address?: string;
  tax_identification_number?: string;
  billed_to?: {
    name?: string;
    address?: string;
  };
  delivery?: {
    company?: string;
    method?: string;
    delivery_fee?: number;
    currency?: string;
  };
  client_type?: string;
  sale_type?: string;
  items?: Item[];
  subtotal_ht?: {
    amount?: number;
    currency?: string;
  };
  tax?: {
    rate?: number;
    amount?: number;
    currency?: string;
  };
  total_ttc?: {
    amount?: number;
    payment_method?: string;
    currency?: string;
  };
  contact_info?: string;
  siret?: string;
  naf?: string;
  tva?: string;
}

export interface Item {
  description?: string;
  quantity?: number;
  unit_price_ht?: number;
  unit_price_ttc?: number;
  total_discount?: number;
  item_variation?: string;
  currency?: string;
}

export interface Note {
  created?: Date;
  note?: string;
  user?: string;
}
export enum DisplayMode {
  TABLE = 'table',
  SMALL_CARDS = 'smallCards',
  LARGE_CARDS = 'largeCards',
}

export const DEFAULT_DASHBOARD_VIEW_PAGE_SIZE = 10;
