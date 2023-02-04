<script lang="ts">
  import { page } from '$app/stores'
  import { getPageContext } from 'context/page'
  import type { Forward } from 'thin-backend'
  import { Form, InvalidRedirect, Welcome } from './components'

  const params = $page.url.searchParams
  const editId = params.get('id')
  const editName = params.get('name') || undefined
  const editUrl = params.get('url') || undefined

  const pageContext = getPageContext()
  const view = pageContext.store<string>('view')

  function nameEligible(name: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === 'testing') {
          reject(`'${name}' is not available`)
        } else {
          resolve(true)
        }
      }, 500 + Math.random() * 5000)
    })
  }

  function onSubmit(name: string, url: string) {
    return new Promise<Forward>((_, reject) => {
      setTimeout(
        () => reject('Almost ready, try again real soon'),
        500 + Math.random() * 5000
      )
    })
  }

  function onClose() {
    view.set('')
  }
</script>

<InvalidRedirect />

{#if $view === 'create'}
  <Form {editName} {editUrl} {nameEligible} {onSubmit} {onClose} />
{:else}
  <Welcome />
{/if}
