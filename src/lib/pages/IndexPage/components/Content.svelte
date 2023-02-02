<script lang="ts">
  import { getAppContext } from 'context/app'

  export let data: unknown

  const context = getAppContext()
</script>

<p>URL forwarding is coming very soon...</p>
{#if context.routing.staging}
  <pre class="p-4 bg-base-100 overflow-x-scroll">{JSON.stringify(
      data,
      null,
      2
    )}</pre>
{/if}
