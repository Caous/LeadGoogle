export interface LeadGoogleDto {
    id: string;
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
    boxEmail: string;
    historico: HistoricoLead[];
}

export interface HistoricoLead {
    assunto: string;
    descricao: string;
    dataAtualizacao: string; // Date pode ser tratado como string no JSON
}

