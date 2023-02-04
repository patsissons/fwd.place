<script lang="ts">
  import { goto } from '$app/navigation'
  import Card from 'components/Card.svelte'
  import type { Forward } from 'data/types'
  import { validation } from 'data/validation'
  import { errorReason } from 'utils/error'

  export let editName: string | undefined = undefined
  export let editUrl: string | undefined = undefined

  export let nameEligible: (name: string) => Promise<unknown>
  export let onSubmit: (name: string, url: string) => Promise<Forward>
  export let onClose: () => unknown

  let name: string = editName || '',
    nameError: string | undefined,
    validatingName = false,
    nameValidated = false
  let url: string = editUrl || '',
    urlError: string | undefined,
    validatingUrl = false
  let error: string | undefined
  let success: Forward | undefined
  let saving = false

  const editMode = Boolean(editName && editUrl)

  $: validating = validatingName || validatingUrl
  $: invalid = Boolean(nameError || urlError || (!name && !url))

  async function validateName() {
    try {
      validatingName = true
      nameValidated = false
      nameError = undefined

      validation.name(name)

      if (name !== editName) await nameEligible(name)

      nameValidated = true
    } catch (err) {
      nameError = errorReason(err)
    } finally {
      validatingName = false
    }
  }

  function validateUrl() {
    try {
      validatingUrl = true
      urlError = undefined

      validation.url(url)
    } catch (err) {
      urlError = errorReason(err)
    } finally {
      validatingUrl = false
    }
  }

  async function handleSubmit() {
    try {
      if (nameError || urlError) return

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
    <div class="flex flex-col gap-2">
      <label for="name" class="input-label">Name</label>
      <div class="flex gap-2">
        <input
          bind:value={name}
          on:blur={validateName}
          type="text"
          name="name"
          id="name"
          class="input w-full"
          class:input-error={nameError}
          aria-label="forwarding name"
          placeholder="some-name (→ fwd.place/some-name)"
          required
          disabled={saving || validatingName}
        />
        {#if validatingName}
          <div class="btn btn-ghost loading pointer-events-none" />
        {:else if nameValidated}
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
        {:else if nameError}
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
      {#if nameError}
        <p class="text-error">{nameError}</p>
      {/if}
    </div>
    <div class="flex flex-col gap-2">
      <label for="url" class="input-label">URL</label>
      <input
        bind:value={url}
        on:blur={validateUrl}
        type="text"
        name="url"
        id="url"
        class="input w-full"
        aria-label="forwarding URL"
        placeholder="https://butt.holdings/"
        required
        disabled={saving || validatingUrl}
      />
      {#if urlError}
        <p class="text-error">{urlError}</p>
      {/if}
    </div>
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
