import { refreshToken } from '../api/login';
import { clearTokens, getTokens, isTokenExpired, storeTokens } from './KeyChainStore';

export const resolveAuthState = async () => {
    const tokens = await getTokens();
    if (!tokens) return false;
    const { access, refresh } = tokens;
    if (!isTokenExpired(access)) return true;
    if (!refresh || isTokenExpired(refresh)) {
        await clearTokens();
        return false;
    }
    console.log("Using Refresh Token!");
    const res = await refreshToken(refresh);
    const newToken = await res.json();
    if (!res.ok) {
        console.log(data.message);
        throw new Error(data.message);
    }
    console.log(newToken);
    await storeTokens(newToken);
    return true;
}