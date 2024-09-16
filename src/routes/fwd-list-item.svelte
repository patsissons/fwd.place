<script lang="ts">
  import TrashIcon from '~icons/ion/trash';
  import ShareIcon from '~icons/ion/share';
  import { Label } from '$lib/components/ui/label';
  import { Switch } from '$lib/components/ui/switch';
  import { fwds } from '$lib/client/pb';
  import type { Fwd, User } from '$lib/client/types';
  import Copyable from '$lib/components/copyable.svelte';
  import { Button } from '$lib/components/ui/button';
  import Link from '$lib/link.svelte';
  import FwdDialog from '$lib/components/fwd-dialog.svelte';
  import { host } from '$lib/url';

  export let user: User;
  export let fwd: Fwd;
  export let path: string | undefined;

  function toggleEnabled() {
    fwds.update(fwd.id, { enabled: !fwd.enabled }).catch(console.error);
  }

  function togglePublic() {
    fwds.update(fwd.id, { public: !fwd.public }).catch(console.error);
  }

  function handleDelete() {
    fwds.delete(fwd.id).catch(console.error);
  }
</script>

<div class="flex flex-col gap-1">
  <div class="flex items-center justify-between gap-1">
    <div class="flex items-center gap-1">
      <div class="flex items-center gap-2">
        <Switch id="enabled" checked={fwd.enabled} on:click={toggleEnabled} />
        <Label for="enabled">Enabled</Label>
      </div>
      <div class="flex items-center gap-2">
        <Switch id="public" checked={fwd.public} on:click={togglePublic} />
        <Label for="public">Public</Label>
      </div>
    </div>
    <div class="flex justify-end gap-1">
      <FwdDialog {user} {fwd} />
      <Button variant="destructive" on:click={handleDelete}>
        <TrashIcon />
      </Button>
      <Button
        class="bg-cyan-500 hover:bg-cyan-500/90"
        href={fwd.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ShareIcon />
      </Button>
    </div>
  </div>
  <div>
    {#if path}
      <Copyable value={`${host}/${path}`}>
        <code>{path}</code>
      </Copyable>
    {/if}
    <Copyable value={`${host}/${fwd.id}`}>
      <code>/{fwd.id}</code>
    </Copyable>
  </div>
  <div class="flex justify-between gap-1">
    <Link href={fwd.url} external>{fwd.url}</Link>
    <span>{fwd.created} / {fwd.updated}</span>
  </div>
  <!-- <div class="bg-muted">
    <pre class="bg-slate-800 p-4 font-mono text-slate-200">{JSON.stringify(fwd, null, 2)}</pre>
  </div> -->
</div>
