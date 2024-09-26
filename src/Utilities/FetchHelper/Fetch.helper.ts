
export const fetcher = (url: string) => fetch(url).then(r => r.json())
export const postFetcher = async (url: string, data: any) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
export const putFetcher = async (url: string, data: any) => fetch(url, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json())
