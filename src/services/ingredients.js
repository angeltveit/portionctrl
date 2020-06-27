const apiHost = ''

export async function list(query={}) {
  const partial = new URLSearchParams()
  for(let [key, val] of Object.entries(query)) {
    partial.append(key, val)
  }
  const response = await fetch(`${apiHost}/api/ingredients?${partial.toString()}`, {
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}

export async function create(body) {
  const response = await fetch(`${apiHost}/api/ingredients`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}
