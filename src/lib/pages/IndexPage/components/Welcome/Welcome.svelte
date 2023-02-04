<script lang="ts">
  import Card from 'components/Card.svelte'
</script>

<Card>
  <div slot="title" class="flex flex-1 justify-between items-center gap-2">
    <span>Welcome to fwd.place</span>
    <span class="text-sm text-secondary"
      >The greatest URL forwarding service available</span
    >
  </div>
  <p>
    This is a free and open source simple URL forwarding service built in
    sveltekit, hosted on vercel, and persisted by thin backend.
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
    Get started and create your first forwarding URL by clicking the <span
      class="text-secondary">Create</span
    > button above
  </p>
</Card>
