<script lang="ts">
  import type { LoadContext } from 'context/load'
  import type { PageContextData } from 'context/page'
  import 'styles/global.css'
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
