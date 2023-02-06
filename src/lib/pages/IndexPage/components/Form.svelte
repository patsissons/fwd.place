<script lang="ts">
  import { goto } from '$app/navigation'
  import Card from '$lib/components/Card.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import type { Forward } from '$lib/data/types'
  import { validation } from '$lib/data/validation'
  import { errorReason } from '$lib/utils/error'

  export let editName: string | undefined = undefined
  export let editUrl: string | undefined = undefined

  export let nameEligible: (name: string) => Promise<unknown>
  export let onSubmit: (name: string, url: string) => Promise<Forward>
  export let onClose: () => unknown

  let name: string = editName || '',
    nameInvalid = false,
    nameValidating = false
  let url: string = editUrl || '',
    urlInvalid = false,
    urlValidating = false
  let error: string | undefined
  let success: Forward | undefined
  let saving = false

  const editMode = Boolean(editName && editUrl)

  $: validating = nameValidating || urlValidating
  $: invalid = nameInvalid || urlInvalid

  async function validateName() {
    validation.name(name)
    if (name !== editName) await nameEligible(name)
  }

  function validateUrl() {
    validation.url(url)
  }

  async function handleSubmit() {
    try {
      if (invalid) return

      saving = true
      error = undefined
      success = await onSubmit(name, url)
      goto(`/?id=${success.id}&name=${success.name}&url=${success.url}`, {
        keepFocus: true,
        noScroll: true,
        replaceState: true,
      })
    } catch (err) {
      error = errorReason(err)
      success = undefined
    } finally {
      saving = false
    }
  }
</script>

<Card>
  <div slot="title" class="flex flex-1 justify-between">
    <div>{editMode ? 'Update' : 'Create'} forwarding URL</div>
    <button
      on:click={onClose}
      disabled={saving}
      class="btn btn-square btn-ghost btn-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        /></svg
      >
    </button>
  </div>
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <TextInput
      bind:value={name}
      bind:validating={nameValidating}
      bind:invalid={nameInvalid}
      {saving}
      onValidate={validateName}
    />
    <TextInput
      bind:value={url}
      bind:validating={urlValidating}
      bind:invalid={urlInvalid}
      {saving}
      onValidate={validateUrl}
    />
    <button
      type="submit"
      disabled={saving || invalid || validating}
      class:loading={saving}
      class="w-full btn btn-primary">Save changes</button
    >
    {#if error}
      <p class="text-error">{error}</p>
    {:else if success}
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-2">
          <p class="text-info">
            Forwarding link {editMode ? 'updated' : 'created'}!
          </p>
          <a
            href={`/${name}`}
            target="_blank"
            rel="noreferrer"
            class="text-accent text-2xl">Try it out</a
          >
        </div>
        <div class="flex items-center justify-end gap-2">
          <p class="text-right">Save this link! →</p>
          <a
            href={`/?id=${success.id}&name=${success.name}&url=${success.url}`}
            class="text-secondary text-2xl">Edit Link</a
          >
        </div>
      </div>
    {/if}
  </form>
</Card>
