import "server-only"

export const getEndpointURL = (id: string) => {
  return `${process.env.APP_URL}/link?id=${id}`
}
