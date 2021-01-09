const apiHost = ''

export async function list() {
  const response = await fetch(`${apiHost}/api/missions`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`,
    }
  })
  return await response.json()
}
