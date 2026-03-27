import axiosConfig from "../configs/axios.config.js";




const getLanguages=async()=>{
    try{
        const res=await axiosConfig.get("/languages");
        return res.data;
    }catch(err){
        console.log(err);
        return null;
    }
}







export {getLanguages};
