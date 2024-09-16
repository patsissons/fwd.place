<script lang="ts">
  import type { User } from '$lib/client/types';
  import * as Accordion from '$lib/components/ui/accordion';
  import { fwdStore } from '$lib/stores/fwdStore';
  import FwdListItem from './fwd-list-item.svelte';

  export let user: User;
</script>

<Accordion.Root class="w-full">
  {#each $fwdStore as fwd (fwd.id)}
    {@const path = fwd.public ? `${user.name}/${fwd.name}` : undefined}
    <Accordion.Item value={fwd.id}>
      <Accordion.Trigger>
        <div class="grid w-full grid-cols-[1fr,auto,1fr] items-center gap-1 px-2">
          <span class="justify-self-start">{path || fwd.name}</span>
          <span class="justify-self-center transition-all [[data-state=open]_&]:rotate-90">→</span>
          <span class="justify-self-end">{fwd.url}</span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content>
        <FwdListItem {user} {fwd} {path} />
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
