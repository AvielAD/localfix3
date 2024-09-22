
export const fetcher = (url: string) => fetch(url).then(r => r.json())
export const addFetcher = async (url: string, data: any) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
