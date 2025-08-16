import axios from '../../utilis/Axios'
import { loadmovie } from '../Redux/Tvslice'
export {removemovie} from '../Redux/Tvslice'



export const asyncloadmovie= (id)=> async (dispatch,getstate)=>{
    try{
        const detail= await axios.get(`/tv/${id}`);
        const externalid=await axios.get(`/tv/${id}/external_ids`);
        const recommendations=await axios.get(`/tv/${id}/recommendations`);
        const similar=await axios.get(`/tv/${id}/similar`);
        const videos=await axios.get(`/tv/${id}/videos`);
        const translations=await axios.get(`/tv/${id}/translations`)
        const watchproviders=await axios.get(`/tv/${id}/watch/providers`);
        let theultimate={
            detail:detail.data,
            externalid:externalid.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            translations:translations.data.translations.map((t)=>(
                t.english_name
            )),
            videos:videos.data.results.find((i)=>i.type === 'Trailer'),
            watchproviders:watchproviders.data.results.IN
        };
        dispatch(loadmovie(theultimate));
    }
    catch(error){
        console.log(error);
    }
}