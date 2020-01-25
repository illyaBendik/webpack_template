export { exampleCreate, examplEdit };

async function exampleCreate(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  };
  const res = await fetch('/api/example/', requestOptions);
  return await res.json();
}

async function examplEdit(id, data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  };
  const res = await fetch(`/api/${id}/example/`, requestOptions);
  return await res.json();
}
