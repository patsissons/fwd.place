<script lang="ts">
  import ClipboardIcon from '~icons/ion/clipboard';
  import { Button } from './ui/button';

  export let value: string;

  function handleClick() {
    navigator.clipboard.writeText(value);
  }
</script>

<div class="flex items-center gap-1">
  <slot />
  <button type="button" on:click={handleClick}>
    <ClipboardIcon />
  </button>
</div>
