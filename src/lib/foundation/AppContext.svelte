<script lang="ts">
  import { createAppContext } from 'context/app'
  import type { LoadContext } from 'context/load'
  import 'styles/global.css'

  export let load: LoadContext

  const context = createAppContext(load)
  const staging = context.routing.staging
</script>

<svelte:head>
  {#if staging}
    <!-- staging background -->
    <style lang="postcss">
      html {
        background-attachment: fixed;
        background-image: repeating-linear-gradient(
          -45deg,
          transparent 0 20px,
          theme(colors.slate.600) 20px 40px
        );
      }
    </style>
  {/if}
</svelte:head>

<slot />
