<script lang="ts">
  import LogoGithubIcon from '~icons/ion/logo-github';
  import AddCircleIcon from '~icons/ion/add-circle';
  import { Button } from '$lib/components/ui/button';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { userStore } from '$lib/stores/userStore';
  import { users } from '$lib/client/pb';
  import UserDialog from './user-dialog.svelte';
  import AddDialog from '../fwd-dialog.svelte';

  let open = false;
  let name = '';

  $: if ($userStore && !name) {
    name = $userStore.name;
  }
  $: if (!$userStore) {
    name = '';
  }

  async function handleSubmit() {
    const id = $userStore?.id;
    if (!id) return;

    const fields = { name };

    const user = await users.update(id, fields);
    open = false;
  }

  function handleAdd() {
    // ...
  }
</script>

<header class="h-14">
  <div class="grid grid-cols-[1fr,auto,1fr] items-center gap-2 py-2">
    <div class="justify-self-start pl-2">
      <Button
        class="aspect-square bg-gradient-to-br from-sky-500 to-fuchsia-500 p-0"
        variant="outline"
        href="https://github.com/patsissons/fwd.place"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LogoGithubIcon class="size-6" />
      </Button>
    </div>
    <div class="container mx-auto place-self-center">
      <h1 class="animated-header text-2xl font-bold text-primary sm:text-4xl">
        <span class="text-sky-500">fwd</span><span class="text-primary">.</span><span
          class="text-fuchsia-500">place</span
        >
      </h1>
    </div>
    <div class="justify-self-end pr-2">
      {#if $userStore}
        <div class="flex items-center justify-end">
          <AddDialog user={$userStore} />
          <UserDialog user={$userStore} />
        </div>
      {/if}
    </div>
  </div>
</header>
