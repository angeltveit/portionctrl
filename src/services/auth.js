const apiHost = ''

export async function login(body) {
  const response = await fetch(`${apiHost}/api/auth`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}