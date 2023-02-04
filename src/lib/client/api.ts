import type { Forward } from 'data/types'
import { errorReason } from 'utils/error'
import { log } from 'utils/logging'

export function eligible(name: string) {
  return request<{ name: string }>('eligible', { name })
}

export function create(name: string, url: string) {
  return request<Forward>('create', { name, url })
}

export function update(
  name: string,
  url: string,
  original: Pick<Forward, 'id' | 'name' | 'url'>
) {
  return request<Forward>('update', { name, url, original })
}

type Action = 'eligible' | 'create' | 'update'

async function request<T>(action: Action, body?: unknown) {
  const path = `/api/${action}`

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const body = await response.text()
      const message = errorMessage(body)

      throw new Error(message)
    }

    const data = await response.json()
    log('request', { path, body, data })

    return data as T
  } catch (error) {
    log('request', { path, body, error }, 'E')
    throw error
  }
}

function errorMessage(body: string) {
  try {
    const err = JSON.parse(body)
    return errorReason(err)
  } catch {
    return body
  }
}
