<script lang="ts">
  import LogoGithubIcon from '~icons/ion/logo-github';
  import { Button } from '$lib/components/ui/button';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { userStore } from '$lib/stores/userStore';
  import { users } from '$lib/client/pb';

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
    console.log('submitting user change', fields);

    const user = await users.update(id, fields);
    console.log('user', user);
    open = false;
  }
</script>

<header class="h-14">
  <div class="grid grid-cols-[1fr,auto,1fr] items-center gap-2 py-2">
    <div class="justify-self-start pl-2">
      <Button
        class="aspect-square bg-gradient-to-br from-sky-500 to-fuchsia-500 p-0"
        variant="ghost"
        href="https://github.com/patsissons/fwd.place"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LogoGithubIcon width={24} height={24} />
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
        <Dialog.Root bind:open>
          <Dialog.Trigger
            class="rounded-full border-2 border-transparent outline-fuchsia-500 hover:border-fuchsia-500"
          >
            <Avatar.Root>
              <Avatar.Image src={$userStore.avatar} alt={$userStore.username} />
              <Avatar.Fallback>{$userStore.username.slice(0, 2)}</Avatar.Fallback>
            </Avatar.Root>
          </Dialog.Trigger>
          <Dialog.Content>
            <form on:submit|preventDefault={handleSubmit}>
              <Dialog.Header>
                <Dialog.Title>{$userStore.email}</Dialog.Title>
                <Dialog.Description
                  >Change your profile name, used as the prefix to the url forwarding path.</Dialog.Description
                >
              </Dialog.Header>
              <div class="my-2">
                <Input placeholder="name" bind:value={name} />
              </div>
              <Dialog.Footer>
                <Button variant="destructive" on:click={users.logout}>Logout</Button>
                <Button type="submit">Save changes</Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      {/if}
    </div>
  </div>
</header>
