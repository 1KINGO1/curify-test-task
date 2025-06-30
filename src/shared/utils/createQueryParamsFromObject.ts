export function createQueryParamsFromObject(params: object): URLSearchParams {
  const queryParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      queryParams.append(key, value.toString())
    }
  }

  return queryParams
}
