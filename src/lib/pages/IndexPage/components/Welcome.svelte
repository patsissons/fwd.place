<script lang="ts">
  import Card from 'components/Card.svelte'
  import { getPageContext } from 'context/page'

  const pageContext = getPageContext()
  const view = pageContext.store<string>('view')

  function handleCreate() {
    view.set('create')
  }
</script>

<Card>
  <div slot="title" class="flex flex-1 justify-between items-center gap-2">
    <span>Welcome to fwd.place</span>
    <span class="text-sm text-info"
      >The greatest URL forwarding service available 😄</span
    >
  </div>
  <p>
    This is a free and <a
      class="text-accent"
      href="https://github.com/patsissons/fwd.place">open source</a
    >
    simple URL forwarding service built in
    <a class="text-accent" href="https://kit.svelte.dev">sveltekit</a>, using
    the
    <a class="text-accent" href="https://daisyui.com">DaisyUI components</a>,
    hosted on
    <a class="text-accent" href="https://vercel.com">vercel</a>, and persisted
    by
    <a class="text-accent" href="https://thin.dev">thin backend</a>.
  </p>
  <p>
    No account or login is required, simply choose a forwarding name (that is
    available) and save your forwarding url to create a permanent link.
  </p>
  <p>
    When you create a new link, you will be presented with a special edit URL
    that will allow you to update the name and/or URL after creation. Do not
    lose this link as it cannot be recovered.
  </p>
  <p>
    Get started and create your first forwarding URL by clicking the <button
      class="text-secondary"
      on:click={handleCreate}>Create</button
    > button above
  </p>
</Card>
