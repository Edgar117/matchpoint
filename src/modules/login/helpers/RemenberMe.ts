import { encrypt , decrypt } from '@/helpers/Encrypt'
import { APPLICATION_NAME } from '../../../helpers/applicationName';
import { ref } from "vue";

export const remeberMe = async  (user : string, password : string, remeberMe : boolean, DirectorioActivo: boolean) => {

    const RemenberMe = {
        user: user,
        password: password,
        remeberMe: remeberMe,
        DirectorioActivo: DirectorioActivo
    };

    if(remeberMe){
        const data = await encrypt(RemenberMe);
        localStorage.setItem(`remenberMe-${APPLICATION_NAME.APP_NAME_SECURITY}`, data );
    }else{
        const data =  localStorage.getItem(`remenberMe-${APPLICATION_NAME.APP_NAME_SECURITY}`);
        if(data !== null || data !== undefined ){
            localStorage.removeItem(`remenberMe-${APPLICATION_NAME.APP_NAME_SECURITY}`);
        }
    }
    

}

export const readRemeberMe = async () => {

    let remenber ='';
    const info = ref<any>("");
    if(localStorage.getItem(`remenberMe-${APPLICATION_NAME.APP_NAME_SECURITY}`) !== null){
            const data = localStorage.getItem(`remenberMe-${APPLICATION_NAME.APP_NAME_SECURITY}`);
            remenber =  await decrypt(data);
            info.value = JSON.parse(remenber);
    }
  
   return info;
}