<script lang="ts">
  import { users } from '$lib/client/pb';
  import { userStore } from '$lib/stores/userStore';
  import { onMount } from 'svelte';
  import Auth from './auth.svelte';
  import FwdList from './fwd-list.svelte';

  let loaded = false;

  onMount(async () => {
    const user = await users.current();
    console.log('user', user);

    loaded = true;
  });
</script>

<main class="container mx-auto h-full max-w-screen-lg">
  {#if $userStore}
    <div class="flex flex-col items-center gap-4">
      <FwdList user={$userStore} />
    </div>
  {:else if loaded}
    <Auth />
  {/if}
</main>
