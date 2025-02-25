
export interface Accomplishment {
  id: string;
  title: string;
  date: string;
  role: string;
  company: string;
  privateDetails: string;
  description?: string;
  highlighted?: boolean;
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
