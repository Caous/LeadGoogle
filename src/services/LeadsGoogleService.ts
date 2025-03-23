import { LeadGoogleDto } from "../models/LeadsGoogleDto";
import { instanceApi } from "./AxiosConfig";

export const getAll = async (
): Promise<LeadGoogleDto[] | string> => {
    return (
        await instanceApi.get<LeadGoogleDto[] | string>("/LeadGoogleInnova/GetAllLeadGoogle")
    ).data;
};