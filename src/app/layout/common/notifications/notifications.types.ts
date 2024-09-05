// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface Notification extends EventTarget {
  id: string;
  icon?: string;
  image?: string;
  title?: string;
  description?: string;
  time: string;
  link?: string;
  useRouter?: boolean;
  read: boolean;
}
