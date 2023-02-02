<script lang="ts">
  import { getAppContext } from 'context/app'
  import { ThemeToggle } from './components'

  const context = getAppContext()
  const host = context.routing.url.host
</script>

<div class="navbar items-stretch bg-base-300">
  <div class="flex-none justify-start gap-4">
    <a class="btn btn-ghost" href={host}>fwd.place</a>
    <p class="hidden min-[480px]:block">Stupidly simple url forwarding</p>
  </div>

  <div class="flex-1 justify-center" />

  <div class="flex-none justify-end">
    <ThemeToggle />
  </div>
</div>
