import axios from "axios";
const axiosPublic = axios.create({
    baseURL: 'https://employee-express.vercel.app'
})
const useAxiosPublic = () => {
    
    
    return axiosPublic;
};

export default useAxiosPublic;