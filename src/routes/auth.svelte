<script>
  import LogoGithubIcon from '~icons/ion/logo-github';
  import { fwds, users } from '$lib/client/pb';
  import { Button } from '$lib/components/ui/button';

  function handleAuth() {
    users.login('github').catch(console.error);
  }
</script>

<div class="grid h-full place-items-center">
  <Button class="flex items-center gap-2" on:click={handleAuth}>
    <LogoGithubIcon class="size-5" />
    <span>Continue with GitHub</span>
  </Button>
</div>
