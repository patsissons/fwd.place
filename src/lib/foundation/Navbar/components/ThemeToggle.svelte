<script lang="ts">
  import { onMount } from 'svelte'

  let dark = true
  let documentElement: HTMLElement | undefined = undefined

  $: if (documentElement) {
    documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }

  onMount(() => {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    documentElement = document.documentElement
  })
</script>

<label class="btn btn-circle btn-ghost swap swap-rotate">
  <input type="checkbox" bind:checked={dark} />

  <p class="swap-on">🌙</p>
  <p class="swap-off">🌞</p>
</label>
