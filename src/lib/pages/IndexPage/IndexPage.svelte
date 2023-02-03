<script lang="ts">
  import { page } from '$app/stores'
  import Card from 'components/Card.svelte'
  import { Content, Heading } from './components'

  export let data: unknown = undefined

  const {
    url: { searchParams },
  } = $page
  let invalidRedirect = searchParams.get('error')
  let invalidRedirectReason = searchParams.get('reason')
</script>

{#if invalidRedirect}
  <div class="alert alert-error shadow-lg mb-4 max-w-5xl mx-auto">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <span
        >{invalidRedirect} is not a valid redirect{invalidRedirectReason
          ? ` (${invalidRedirectReason})`
          : ''}</span
      >
    </div>
  </div>
{/if}

<Card>
  <span slot="title">
    <Heading />
  </span>
  <Content {data} />
</Card>
