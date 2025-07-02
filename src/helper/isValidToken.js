
import {jwtDecode} from "jwt-decode";

export function isValidToken(jwtToken) {
    const decodedToken = jwtDecode(jwtToken);
    const expirationTime = decodedToken.exp * 1000;
    const isExpired = Date.now() > expirationTime;

    return !isExpired; // Return true if token is valid, return false if it's not
}
