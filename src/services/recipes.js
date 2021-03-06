const apiHost = ''

export async function list(query={}) {
  const partial = new URLSearchParams()
  for(let [key, val] of Object.entries(query)) {
    partial.append(key, val)
  }
  const response = await fetch(`${apiHost}/api/recipes?${partial.toString()}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`,
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