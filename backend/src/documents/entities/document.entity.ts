export enum DocumentType {
  PASSPORT = 'PASSPORT',
  TRANSCRIPT = 'TRANSCRIPT',
  DIPLOMA = 'DIPLOMA',
  CAQ = 'CAQ',
  FINANCIAL_PROOF = 'FINANCIAL_PROOF',
  OTHER = 'OTHER',
}

export class Document {
  id: string;
  originalName: string;
  filename: string;
  filePath: string;
  type: DocumentType;
  isVerified: boolean;
  userId: string;
  createdAt: Date;
}