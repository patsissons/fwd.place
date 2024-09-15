<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import { Button } from '$lib/components/ui/button';
  import { fwds, users } from '$lib/client/pb';
  import { fwdStore } from '$lib/stores/fwdStore';
  import { userStore } from '$lib/stores/userStore';
  import { onMount } from 'svelte';
  import { Input } from '$lib/components/ui/input';

  let loaded = false;
  let name = '',
    url = '';

  onMount(async () => {
    const user = await users.current();
    console.log('user', user);

    loaded = true;
  });

  function handleAuth() {
    users.login('github').catch(console.error);
  }

  function handleDelete(id: string) {
    fwds.delete(id).catch(console.error);
  }

  function handleCreate() {
    const user = $userStore?.id;
    if (!name || !url || !user) return;

    fwds
      .create({ name, url, enabled: true, public: true, user })
      .then((fwd) => {
        name = '';
        url = '';
      })
      .catch(console.error);
  }
</script>

<main class="container mx-auto h-full max-w-screen-lg">
  {#if $userStore}
    <div class="flex flex-col items-center gap-4">
      <div class="w-full max-w-lg">
        <form class="flex flex-col gap-2 py-2" on:submit|preventDefault={handleCreate}>
          <Input placeholder="Name" bind:value={name} />
          <Input placeholder="Url" bind:value={url} />
          <Button type="submit">Create</Button>
        </form>
      </div>
      <Accordion.Root class="w-full">
        {#each $fwdStore as fwd (fwd.id)}
          <Accordion.Item value={fwd.id}>
            <Accordion.Trigger>
              <div class="grid w-full grid-cols-[1fr,auto,1fr] items-center gap-1 px-2">
                <span class="justify-self-start">{$userStore.name}/{fwd.name}</span>
                <span class="justify-self-center">→</span>
                <span class="justify-self-end">{fwd.url}</span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div class="flex flex-col gap-1">
                <div class="bg-muted">
                  <pre class="bg-slate-800 p-4 font-mono text-slate-200">{JSON.stringify(
                      fwd,
                      null,
                      2,
                    )}</pre>
                </div>
                <Button variant="destructive" on:click={() => handleDelete(fwd.id)}>Delete</Button>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        {/each}
      </Accordion.Root>
    </div>
  {:else if loaded}
    <div class="grid h-full place-items-center">
      <Button class="flex items-center gap-2" on:click={handleAuth}>
        <svg aria-label="github" height="20" viewBox="0 0 14 14" width="20">
          <path
            d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
            fill="currentColor"
            fill-rule="nonzero"
          />
        </svg>
        <span>Continue with GitHub</span>
      </Button>
    </div>
  {/if}
</main>
