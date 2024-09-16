<script lang="ts">
  import AddCircleIcon from '~icons/ion/add-circle';
  import CreateIcon from '~icons/ion/create';
  import { Label } from '$lib/components/ui/label';
  import { Switch } from '$lib/components/ui/switch';
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import type { Fwd, User } from '$lib/client/types';
  import { Input } from './ui/input';
  import { fwds } from '$lib/client/pb';

  export let user: User;
  export let fwd: Fwd | undefined = undefined;

  let name = fwd?.name ?? '',
    url = fwd?.url ?? '',
    enabled = fwd?.enabled ?? true,
    pub = fwd?.public ?? true;
  let open = false;

  async function handleSubmit() {
    if (fwd) {
      await fwds.update(fwd.id, { name, url, enabled, public: pub }).catch(console.error);
    } else {
      await fwds.create({ name, url, enabled, public: pub, user: user.id }).catch(console.error);
    }

    open = false;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#if fwd}
      <CreateIcon class="size-10" />
    {:else}
      <AddCircleIcon class="size-10" />
    {/if}
  </Dialog.Trigger>
  <Dialog.Content>
    <form on:submit|preventDefault={handleSubmit}>
      <Dialog.Header>
        <Dialog.Title>{fwd ? 'Edit URL forward' : 'Add a new URL forward'}</Dialog.Title>
      </Dialog.Header>
      <div class="flex flex-col gap-2 py-2">
        <Input placeholder="Name" bind:value={name} />
        <Input placeholder="Url" bind:value={url} />
        <div class="flex items-center gap-2">
          <Switch id="enabled" bind:checked={enabled} />
          <Label for="enabled">Enabled</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="public" bind:checked={pub} />
          <Label for="public">Public</Label>
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">{fwd ? 'Save changes' : 'Create'}</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
