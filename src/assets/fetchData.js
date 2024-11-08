const BASE_URL = 'https://api.api-ninjas.com/v1/quotes'

export const fetchData = async (currentCategory) => {
  const response = await fetch(
    currentCategory.value ? `${BASE_URL}?category=${currentCategory.value}` : BASE_URL,
    {
      method: 'GET',
      headers: {
        'X-Api-Key': 'ji7i7KVCKObnhRMtB1LRmQ==AmyCMKLfmYJsYBLJ',
        'Content-Type': 'application/json',
      },
    },
  )
  if (!response.ok) {
    throw new Error("Responce isn't ok")
  }

  return response.json()
}
