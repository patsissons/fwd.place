<div class="card max-w-5xl mx-auto bg-base-300 shadow-xl">
  <div class="card-body">
    {#if $$slots.title}
      <h2 class="card-title flex">
        <slot name="title" />
      </h2>
    {/if}
    <slot />
  </div>
</div>
