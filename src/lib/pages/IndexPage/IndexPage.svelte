<script lang="ts">
  import { page } from '$app/stores'
  import { create, eligible, update } from 'client/api'
  import { getPageContext } from 'context/page'
  import { onMount } from 'svelte'
  import { Form, InvalidRedirect, Welcome } from './components'

  $: params = $page.url.searchParams
  $: editId = params.get('id') || undefined
  $: editName = params.get('name') || undefined
  $: editUrl = params.get('url') || undefined

  const pageContext = getPageContext()
  const view = pageContext.store<string>('view')

  function nameEligible(name: string) {
    return eligible(name)
  }

  function onSubmit(name: string, url: string) {
    if (editId) {
      if (!editName || !editUrl) {
        throw new Error('Invalid edit link')
      }

      return update(name, url, { id: editId, name: editName, url: editUrl })
    }

    return create(name, url)
  }

  function onClose() {
    view.set('')
  }

  onMount(() => {
    if (editId && editName && editUrl) {
      view.set('create')
    }
  })
</script>

<InvalidRedirect />

{#if $view === 'create'}
  <Form {editName} {editUrl} {nameEligible} {onSubmit} {onClose} />
{:else}
  <Welcome />
{/if}
