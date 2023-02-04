<script lang="ts">
  import type { PageContextData } from 'context/page'
  import AppLayout from 'foundation/AppLayout.svelte'
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
  }
</script>

<AppLayout loadContext={data.context} {pageContext}>
  <slot />
</AppLayout>
