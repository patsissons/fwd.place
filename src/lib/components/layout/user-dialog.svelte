<script lang="ts">
  import type { User } from '$lib/client/types';
  import { Button } from '$lib/components/ui/button';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { users } from '$lib/client/pb';

  export let user: User;

  let open = false;
  let name = '';

  async function handleSubmit() {
    await users.update(user.id, { name });
    open = false;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger
    class="rounded-full border-2 border-transparent outline-fuchsia-500 hover:border-fuchsia-500"
  >
    <Avatar.Root>
      <Avatar.Image src={user.avatar} alt={user.username} />
      <Avatar.Fallback>{user.username.slice(0, 2)}</Avatar.Fallback>
    </Avatar.Root>
  </Dialog.Trigger>
  <Dialog.Content>
    <form on:submit|preventDefault={handleSubmit}>
      <Dialog.Header>
        <Dialog.Title>{user.email}</Dialog.Title>
        <Dialog.Description>
          Change your profile name, used as the prefix to the url forwarding path.
        </Dialog.Description>
      </Dialog.Header>
      <div class="my-2">
        <Input autocomplete="off" data-1p-ignore placeholder="name" bind:value={name} />
      </div>
      <Dialog.Footer>
        <Button variant="destructive" on:click={users.logout}>Logout</Button>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
