async function tokenizar() {
    let url = 'https://chtolecac.pythonanywhere.com/api/token/';
    let tokenBack = await fetch(url)
                            .then(res => res.json())
                            .catch(err => console.log("Error: ", err));

    return tokenBack;
};

export { tokenizar }