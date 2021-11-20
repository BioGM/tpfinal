let url_base = 'http://localhost:3000';

async function getLevel(id) {
    let response = await fetch(url_base + '/levels/' + id);
    let data = await response.json();    
    return data;
}