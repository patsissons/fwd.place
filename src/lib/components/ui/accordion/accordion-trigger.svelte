<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import ChevronDown from 'lucide-svelte/icons/chevron-down';
  import { cn } from '$lib/utils.js';

  type $$Props = AccordionPrimitive.TriggerProps;
  type $$Events = AccordionPrimitive.TriggerEvents;

  let className: $$Props['class'] = undefined;
  export let level: AccordionPrimitive.HeaderProps['level'] = 3;
  export { className as class };
</script>

<AccordionPrimitive.Header {level} class="flex">
  <AccordionPrimitive.Trigger
    class={cn(
      'flex flex-1 items-center justify-between py-4 font-medium hover:bg-muted',
      className,
    )}
    {...$$restProps}
    on:click
  >
    <slot />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
