export const example = {
    example_create
};

async function example_create(data) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' ,'Accept': 'application/json'},
        body: JSON.stringify(data)
    };
    let res = await fetch(`${url}/api/example/`, requestOptions)
    return await res.json()
}