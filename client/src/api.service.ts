import axios from 'axios';

export const baseUrl = 'http://localhost:5000';

type Response = {
    error: boolean,
    data: any
}


export const getExperimentMidiFiles = async (expId:string): Promise<Response> => {
    try {
        const rep = await axios.get<Array<string>>(`${baseUrl}/experiments/${expId}`)
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