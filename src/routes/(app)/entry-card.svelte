<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { ContextMenu, DropdownMenu } from "bits-ui";
	import { EllipsisIcon } from "lucide-svelte";
  import { type Entry } from "./types";
	import dayjs from "dayjs";

  export let entry: Entry;
  export let index: number;

  let dispatch = createEventDispatcher();

  function openEntry() {
    dispatch("open-entry", { entry: entry, index: index })
  }
</script>

<!-- <div
  class="entry"
  id={`entry-${entry.timestamp}`}
  data-id={entry.timestamp}
  data-index={index}
>
  <p class="p">{entry.text}</p>
  <div class="entry-options">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="btn btn-ghost" aria-labelledby="entry-dropdown-trigger-{entry.timestamp}">
        <EllipsisIcon aria-hidden="true" />
        <span id="entry-dropdown-trigger-{entry.timestamp}" class="sr-only">Options</span>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  </div>
</div> -->

<ContextMenu.Root>
  <ContextMenu.Trigger class="entry" id="entry-{entry.timestamp}">
    {#if entry.text.includes("\n")}
      <pre class="p" style="font: inherit;">{entry.text}</pre>
    {:else}
      <p class="p">{entry.text}</p>
    {/if}
    <small class="small">{dayjs(entry.timestamp).format("H:mm A")}</small>
  </ContextMenu.Trigger>
</ContextMenu.Root>

<style>
  :global(.entry) {
    font: inherit;
    text-align: start;
    width: 100%;
    max-width: 600px;
    background: transparent;
    padding: 24px;
    border: none;
    border-radius: 12px;
    position: relative;
    isolation: isolate;

    &:hover {
      background: hsl(var(--clr-neutral-100));
    }

    & > .small {
      color: hsl(var(--clr-neutral-400));
    }
  }
</style>
