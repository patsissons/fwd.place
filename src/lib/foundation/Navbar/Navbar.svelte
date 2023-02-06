<script lang="ts">
  import { getAppContext } from '$lib/context/app'
  import { getPageContext } from '$lib/context/page'
  import { ThemeToggle } from './components'

  const appContext = getAppContext()
  const pageContext = getPageContext()

  const { origin } = appContext.routing.url
  const actions = Object.entries(pageContext.actions)
</script>

<div class="navbar items-stretch bg-base-300">
  <div class="flex-none justify-start gap-4">
    <a class="btn btn-ghost" href={origin} on:click={pageContext.onHome}
      >fwd.place</a
    >
    <p class="hidden min-[480px]:block">Stupidly simple url forwarding</p>
  </div>

  <div class="flex-1 justify-center" />

  <div class="flex-none justify-end gap-2">
    {#if actions}
      {#each actions as [id, action]}
        <button
          {id}
          on:click={action.onAction}
          class={['btn'].concat(action.class || []).join(' ')}
          >{action.title}</button
        >
      {/each}
    {/if}
    <ThemeToggle />
  </div>
</div>
