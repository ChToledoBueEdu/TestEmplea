async function consultar(token, url, dato) {
    let options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let envio = await fetch(`${url}${dato}`, options)
                        .then(res => res.status === 200 ? res.json() : null)
                        .catch(err => err.status);

    return envio;
}

async function crear(token, url, datos) {
    let options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    };
    console.log(options);
    let crear = await fetch(url, options)
                        .then(res => res.status === 200 ? true : null)
                        .catch(err => err.status);
    
    return crear;
}

export { consultar, crear }