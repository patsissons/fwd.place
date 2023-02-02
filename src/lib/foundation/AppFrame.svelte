<script lang="ts">
  import { getAppContext } from 'context/app'
  import Navbar from './Navbar'

  const context = getAppContext()
</script>

<main class="flex flex-col items-center min-w-[320px]">
  <section id="navbar" class="w-full">
    <Navbar />
  </section>
  <section id="content" class="container mx-auto p-4">
    {#if context.routing.staging}
      <div class="hidden min-[480px]:flex min-[480px]:justify-center mb-4">
        <div class="badge badge-lg badge-warning">
          ⚠️ staging environment ⚠️
        </div>
      </div>
    {/if}
    <slot />
  </section>
</main>
