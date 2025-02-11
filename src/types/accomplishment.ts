
export interface Accomplishment {
  id: string;
  title: string;
  date: string;
  role: string;
  company: string;
  privateDetails: string;
  selected?: boolean;
  tags?: string[];
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

export type View = "private" | "public";

