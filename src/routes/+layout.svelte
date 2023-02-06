<script lang="ts">
  import type { PageContextData } from '$lib/context/page'
  import AppLayout from '$lib/foundation/AppLayout.svelte'
  import { writable } from 'svelte/store'
  import type { LayoutData } from './$types'

  export let data: LayoutData

  const view = writable('')

  const pageContext: PageContextData = {
    actions: {
      create: {
        id: 'create',
        title: 'Create',
        class: ['btn-secondary'],
        onAction() {
          view.set('create')
        },
      },
    },
    stores: {
      view,
    },
    onHome() {
      view.set('')
    },
  }
</script>

<AppLayout loadContext={data.context} {pageContext}>
  <slot />
</AppLayout>
