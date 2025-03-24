export interface LeadGoogleDto {
    id: DocumentDbId;
    name: string;
    phoneNumber: string;
    category: string;
    address: string;
    timeOpen: string;
    star: string;
    webSite: string | null;
    email: string;
    social: string;
    status: number;
    observacao: string;
}

interface DocumentDbId {
    timestamp: number;
    creationTime: string;
  }