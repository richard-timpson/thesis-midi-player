import axios from 'axios';

export const baseUrl = 'http://localhost:5000';

type Response<T> = {
    error: boolean,
    data: T | null
}

const get = async <T>(url:string): Promise<Response<T>> => {
    try {
        const rep = await axios.get<T>(url)
        return {
            error: false,
            data: rep.data
        };
    }
    catch (err) {
        return {
            error: true,
            data: null
        }
    }
}

export type ExperimentMidiFilesResponse = Array<string>;

export const getExperimentMidiFiles = async (expId:string): Promise<Response<ExperimentMidiFilesResponse>> => {
    return await get<ExperimentMidiFilesResponse>(`${baseUrl}/experiments/${expId}`)
}

export interface ComparisonMidiFilesResponse {
    [key:string]: Array<string>
}

export const getComparisonMidiFiles = async (): Promise<Response<ComparisonMidiFilesResponse>> => {
    return await get<ComparisonMidiFilesResponse>(`${baseUrl}/experiments/comparison`)
}