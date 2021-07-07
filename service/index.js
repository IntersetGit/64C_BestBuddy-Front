import Axios from 'axios';

export const GetMasterInsuranceService = async () => {
    return await Axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_SERVICE}/masterData/GetMasterInsurance`,
        config: { headers: { "Content-Type": "multipart/form-data" } },
    })
};

export const AddInsuranceService = async (data) => {
    return await Axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_SERVICE}/insurance/addInsurance`,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        data
    })
};

export const GetAllInsuranceService = async (data) => {
    return await Axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_SERVICE}/insurance/getAllInsurance`,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        data
    })
};



export default {
    AddInsuranceService,
    GetMasterInsuranceService,
    GetAllInsuranceService,
}