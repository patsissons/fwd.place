import { HoudiniClient, type RequestHandler } from '$houdini'

const requestHandler: RequestHandler = async ({
  fetch,
  text = '',
  variables = {},
}) => {
  const result = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })
  return await result.json()
}

export default new HoudiniClient(requestHandler)
