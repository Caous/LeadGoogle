import { EmailDto } from "../models/EmailDto";
import { LeadGoogleDto } from "../models/LeadsGoogleDto";
import { instanceApi } from "./AxiosConfig";

export const getAllAsync = async (
): Promise<LeadGoogleDto[] | string> => {
    return (
        await instanceApi.get<LeadGoogleDto[] | string>("/LeadGoogleInnova/GetAllLeadGoogle")
    ).data;
};

export const postAsync = async (
    request: LeadGoogleDto
): Promise<LeadGoogleDto> => {
    return (
        await instanceApi.post<LeadGoogleDto>("/LeadGoogleInnova/PostLeadGoogle", request)
    ).data;
};

export const postEmailAsync = async (
    request: EmailDto
): Promise<boolean> => {
    return (
        await instanceApi.post<boolean>("/LeadGoogleInnova/PostLeadGoogleEmail", request)
    ).data;
};

export const putAsync = async (
    request: LeadGoogleDto
): Promise<LeadGoogleDto> => {
    return (
        await instanceApi.put<LeadGoogleDto>("/LeadGoogleInnova/PutLeadGoogle", request)
    ).data;
};

export const getFirstOrDefaultLeadAsync = async (
    name: string, category: string, phoneNumber: string
): Promise<LeadGoogleDto | string> => {
    return (
        await instanceApi.get<LeadGoogleDto | string>("/LeadGoogleInnova/GetLeadByFilter/" + name + "/" + category + "/" + phoneNumber
        )
    ).data;
};

export const deleteLeadAsync = async (
    request: string
): Promise<boolean> => {
    return (
        await instanceApi.delete<boolean>("/LeadGoogleInnova/DeleteLeadGoogle/" + request)
    ).data;
};
