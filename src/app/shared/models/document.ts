// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface Document {
  _id?: string;
  originalName: string;
  mimeType: string;
  path: string;
  size: number;
  uploadDate: Date;
  content?: string;
}
export enum DisplayMode {
  TABLE = 'table',
  SMALL_CARDS = 'smallCards',
  LARGE_CARDS = 'largeCards',
}

export enum DisplayField {
  TITLE = 'title',
  CREATED = 'created',
  ADDED = 'added',
  TAGS = 'tag',
  CORRESPONDENT = 'correspondent',
  DOCUMENT_TYPE = 'documenttype',
  STORAGE_PATH = 'storagepath',
  CUSTOM_FIELD = 'custom_field_',
  NOTES = 'note',
  OWNER = 'owner',
  SHARED = 'shared',
  ASN = 'asn',
}

export const DEFAULT_DISPLAY_FIELDS = [
  { id: DisplayField.TITLE, name: 'Title' },
  { id: DisplayField.CREATED, name: 'Created' },
  { id: DisplayField.ADDED, name: 'Added' },
  { id: DisplayField.TAGS, name: 'Tags' },
  { id: DisplayField.CORRESPONDENT, name: 'Correspondent' },
  { id: DisplayField.DOCUMENT_TYPE, name: 'Document type' },
  { id: DisplayField.STORAGE_PATH, name: 'Storage path' },
  { id: DisplayField.NOTES, name: 'Notes' },
  { id: DisplayField.OWNER, name: 'Owner' },
  { id: DisplayField.SHARED, name: 'Shared' },
  { id: DisplayField.ASN, name: 'ASN' },
];

export const DEFAULT_DASHBOARD_VIEW_PAGE_SIZE = 10;

export const DEFAULT_DASHBOARD_DISPLAY_FIELDS = [
  DisplayField.CREATED,
  DisplayField.TITLE,
  DisplayField.TAGS,
  DisplayField.CORRESPONDENT,
];

export const DOCUMENT_SORT_FIELDS = [
  { field: 'archive_serial_number', name: 'ASN' },
  { field: 'correspondent__name', name: 'Correspondent' },
  { field: 'title', name: 'Title' },
  { field: 'document_type__name', name: 'Document type' },
  { field: 'created', name: 'Created' },
  { field: 'added', name: 'Added' },
  { field: 'modified', name: 'Modified' },
  { field: 'num_notes', name: 'Notes' },
  { field: 'owner', name: 'Owner' },
];

export const DOCUMENT_SORT_FIELDS_FULLTEXT = [
  {
    field: 'score',
    name: ':Score is a value returned by the full text search engine and specifies how well a result matches the given query:Search score',
  },
];
