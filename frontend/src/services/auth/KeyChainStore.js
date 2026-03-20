import { jwtDecode } from 'jwt-decode';
import * as KeyChain from 'react-native-keychain';
import { log } from '../../utils/logging';

export const isTokenExpired = (token)=>{
    try{
        const decoded = jwtDecode(token);
        const currentTime = Date.now()/1000;
        return decoded.exp < currentTime + 10;
    } catch(error){
        return true;
    }
}

export const storeTokens = async ({access_token,refresh_token})=>{
    const token = JSON.stringify({access_token,refresh_token});
    try{
        log.debug("Storing tokens.....");
        await KeyChain.setGenericPassword('tokens', token);
    } catch(e){
        log.error("Error Occured During Login", e);
        log.debug("Tokens are not stored in Secure storage");
    }
}

export const getTokens = async ()=>{
    try {
        const credentials = await KeyChain.getGenericPassword();
        if(credentials){
            const token = JSON.parse(credentials.password);
            const accessToken = token.access_token;
            const refreshToken = token.refresh_token;
            return {accessToken,refreshToken};
        } else{
            log.debug("No tokens Found");
            return null;
        }
    } catch (error) {
        log.error("Error in getting Stored Tokens", error);
        return null;
    }
}

export const clearTokens = async()=>{
    await KeyChain.resetGenericPassword();
}