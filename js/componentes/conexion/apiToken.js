import { apiConfig } from "./config.js";

async function tokenizar() {
    let auth = {username: apiConfig.user, password: apiConfig.pass };
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth)
    }
    let url = 'https://chtolecac.pythonanywhere.com/api/token/';
    let tokenBack = await fetch(url, options)
                            .then(res => res.json())
                            .catch(err => null);
    return tokenBack;
};

export { tokenizar }