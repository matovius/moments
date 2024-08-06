<script lang="ts">
	import { browser } from "$app/environment";
	import { createEventDispatcher } from "svelte";
	import { DropdownMenu } from "bits-ui";
	import { EllipsisIcon } from "lucide-svelte";
  import { type Entry } from "$lib/scripts/types";
	import dayjs from "dayjs";
	import { fly } from "svelte/transition";
	import { quadOut } from "svelte/easing";

  export let entry: Entry;

  let dispatch = createEventDispatcher();

  function deleteEntry() {
    dispatch("delete", { entry });
  }

  function copyText() {
    const theText = entry.text;

    if (browser) {
      navigator.clipboard.writeText(theText);
    }
  }
</script>

<div class="entry-card group relative" id="entry-{entry.timestamp}">
  <p class="p">{entry.text}</p>
  <small class="small">{dayjs(entry.timestamp).format("H:mm A")}</small>
  <div class="absolute top-0 right-0 1200:opacity-0 group-hover:opacity-100">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="btn btn-ghost" aria-labelledby="entry-options-menu-{entry.timestamp}">
        <EllipsisIcon aria-hidden="true" />
        <span id="entry-options-menu-{entry.timestamp}" class="sr-only">Options</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-160 rounded-24 border border-solid border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900 overflow-hidden"
        transition={fly}
        transitionConfig={{ duration: 200, easing: quadOut, x: 0, y: -4, opacity: 0 }}
      >
        <DropdownMenu.Group class="py-12">
          <DropdownMenu.Item class="btn btn-ghost w-full" style="--btn-radius: 0px;" on:click={copyText}>
            <span>Copy text</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item class="btn btn-ghost w-full" style="--btn-radius: 0px;" on:click={deleteEntry}>
            <span>Delete entry</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</div>