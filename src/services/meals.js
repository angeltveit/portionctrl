const apiHost = 'http://192.168.1.149:9000'

export async function list(query={}) {
  const partial = new URLSearchParams()
  for(let [key, val] of Object.entries(query)) {
    partial.append(key, val)  
  }
  const response = await fetch(`${apiHost}/api/meals?${partial.toString()}`, {
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}

export async function create(body) {
  const response = await fetch(`${apiHost}/api/meals`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}
export async function remove(body) {
  const response = await fetch(`${apiHost}/api/meals`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}
export function kcalFor(meal) {
  const sum = meal.ingredients.reduce((prev, curr) => {
    prev += parseInt(curr.kcal || 0) * (parseInt(curr.gram || 0) / 100)
    return prev
  }, 0)
  return sum.toFixed(0)
}