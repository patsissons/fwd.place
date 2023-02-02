<script lang="ts">
  import type { LoadContext } from 'context/load'
  import 'styles/global.css'
  import AppContext from './AppContext.svelte'
  import AppFrame from './AppFrame.svelte'

  export let loadContext: LoadContext
</script>

<AppContext load={loadContext}>
  <AppFrame>
    <slot />
  </AppFrame>
</AppContext>
