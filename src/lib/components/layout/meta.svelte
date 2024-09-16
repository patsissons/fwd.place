<script lang="ts">
  import { host } from '$lib/url';
</script>

<svelte:head>
  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={host} />
  <meta property="og:image" content="{host}/og/cover.png" />

  <!-- Twitter Meta Tags -->
  <meta property="twitter:url" content={host} />
  <meta name="twitter:image" content="{host}/og/cover.png" />
</svelte:head>
