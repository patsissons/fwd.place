<script lang="ts">
  import { errorReason } from '$lib/utils/error'

  export let value = ''
  export let validating = false
  export let invalid = false
  export let saving = false
  export let onValidate: (() => unknown) | undefined

  let error: string | undefined,
    validated = false

  $: invalid = Boolean(error)

  function handleChanged(event: KeyboardEvent) {
    error = undefined
  }

  async function handleValidate() {
    if (!onValidate) return

    try {
      validating = true
      validated = false
      error = undefined

      await onValidate()

      validated = true
    } catch (err) {
      error = errorReason(err)
    } finally {
      validating = false
    }
  }
</script>

<div class="flex flex-col gap-2">
  <label for="name" class="input-label">Name</label>
  <div class="flex gap-2">
    <input
      bind:value
      on:keydown={handleChanged}
      on:blur={handleValidate}
      type="text"
      name="name"
      id="name"
      class="input w-full"
      class:input-error={error}
      aria-label="forwarding name"
      placeholder="some-name (→ fwd.place/some-name)"
      required
      disabled={saving || validating}
    />
    {#if validating}
      <div class="btn btn-ghost loading pointer-events-none" />
    {:else if validated}
      <div class="btn btn-success pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    {:else if error}
      <div class="btn btn-error pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    {/if}
  </div>
  {#if error}
    <p class="text-error">{error}</p>
  {/if}
</div>
