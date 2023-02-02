<script lang="ts">
  import AppLayout from 'foundation/AppLayout.svelte'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<AppLayout loadContext={data.context}>
  <slot />
</AppLayout>
