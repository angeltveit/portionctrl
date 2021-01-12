const apiHost = ''

export async function load() {
  const response = await fetch(`${apiHost}/api/profile`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`,
    }
  })
  if(!response.ok) {
    localStorage.clear()
    return location.reload()
  }
  return await response.json()
}

export default {
  load,
}
