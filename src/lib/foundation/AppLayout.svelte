<script lang="ts">
  import '$styles/global.css'
  import type { LoadContext } from '$lib/context/load'
  import type { PageContextData } from '$lib/context/page'
  import AppContext from './AppContext.svelte'
  import AppFrame from './AppFrame.svelte'

  export let loadContext: LoadContext
  export let pageContext: PageContextData | undefined = undefined
</script>

<AppContext load={loadContext} page={pageContext}>
  <AppFrame>
    <slot />
  </AppFrame>
</AppContext>
