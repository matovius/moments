<script lang="ts">
  import { browser } from "$app/environment";
	import { onDestroy } from "svelte";
	import dayjs from "dayjs";
	import { quadOut } from "svelte/easing";
	import { fade, scale } from "svelte/transition";
  import { Button, Dialog } from "bits-ui";
  import { XIcon } from "lucide-svelte";
  import { type Entry } from "$lib/scripts/types";
	import { AllEntries } from "$lib/scripts/store";
  import EntryCard from "$lib/components/EntryCard.svelte";

  interface MomentGroup {
    date: string;
    entries: Entry[];
  }

  let allEntries: Entry[] = [];
  let EntriesList: HTMLElement;
  let listHeight: number;

  let deletableEntry: Entry;
  let isConfirmDeleteEntryOpen: boolean = false;

  // I do a subscription callback here to be able to update
  // localStorage whenever the store value changes.
  const unsubAllEntries = AllEntries.subscribe((entries) => {
    allEntries = entries.toReversed();
    if (browser) {
      localStorage.setItem('allEntries', JSON.stringify(entries));
      // dispatch("scroll");
      // setTimeout(scrollView, 100);
    }
  });
  
  function scrollView() {
    if (EntriesList) {
      const listDimensions: DOMRect = EntriesList.getBoundingClientRect();
      const scrollHeight: number = listDimensions.height + listHeight;
      const container = EntriesList.parentElement;
      const lastEntryGroup = EntriesList.lastElementChild;
      // container?.scrollTo({top: container?.scrollHeight, behavior: "smooth"});
      lastEntryGroup?.scrollIntoView(false);

      // console.log("scrolled");
      // console.log(EntriesList.parentElement.scrollHeight);
    }
  }

  function confirmDelete(ev: CustomEvent) {
    deletableEntry = ev.detail.entry;
    isConfirmDeleteEntryOpen = true;
  }

  function deleteEntry() {
    AllEntries.update(entries => {
      let deletableEntryIndex: number = entries.indexOf(deletableEntry);

      if (deletableEntryIndex > -1) {
        entries.splice(deletableEntryIndex, 1);
      }

      return entries;
    });
  }

  $: entriesByDate = groupEntriesByDate(allEntries);

  function groupEntriesByDate(entries: Entry[]) {
    const groups: MomentGroup[] = [];

    entries.forEach(entry => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      const formattedDate = dayjs(date).format('dddd D, MMM YYYY');
      const existingGroup = groups.find(group => group.date === formattedDate);

      if (existingGroup) {
        existingGroup.entries.push(entry);
      } else {
        groups.push({ date: formattedDate, entries: [entry] });
      }
    });
    return groups;
  }

  onDestroy(() => {
    unsubAllEntries();
  });
</script>

<div
  class="w-full max-w-600 h-full flex justify-center items-center
  rounded-24 border border-solid border-neutral-200 dark:border-neutral-800
  overflow-hidden"
  transition:fade={{ duration: 200, easing: quadOut }}>
  <div class="w-full h-full overflow-y-auto">
    <ul
      class="w-full min-h-full flex flex-col justify-end items-center"
      bind:this={EntriesList} bind:clientHeight={listHeight}
    >
      {#each entriesByDate as group}
        <li class="w-full">
          <div class="isolate text-center text-neutral-600 dark:text-neutral-400 flex justify-center items-center
            py-12 border-b border-solid border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-10">
            <span class="small">{group.date}</span>
          </div>
          <ul class="w-full p-12">
            {#each group.entries as entry, index}
              <li class="w-full">
                <EntryCard {entry} on:delete={confirmDelete} />
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
</div>

<Dialog.Root bind:open={isConfirmDeleteEntryOpen}>
  <Dialog.Portal class="dialog-portal">
    <Dialog.Overlay class="dialog-overlay" />

    <Dialog.Content class="delete-entry-dialog" transition={scale} transitionConfig={{ duration: 100, easing: quadOut, start: 0.95, opacity: 0 }}>
      <div class="absolute top-24 right-24">
        <Dialog.Close class="btn btn-ghost" aria-labelledby="delete-entry-dialog-close">
          <XIcon aria-hidden="true" />
          <span id="delete-entry-dialog-close" class="sr-only">Close</span>
        </Dialog.Close>
      </div>

      <Dialog.Title class="p-24 border-b border-solid border-neutral-200 dark:border-neutral-800">
        <h3 class="h-xs">Delete this entry?</h3>
      </Dialog.Title>
      <Dialog.Description class="p-24">
        <p class="p">
          Are you sure you want to delete this entry?
          It will be deleted permanently.
        </p>
      </Dialog.Description>

      <div class="grid grid-cols-2 gap-12 p-24">
        <Dialog.Close class="btn btn-outlined">
          <span>Cancel</span>
        </Dialog.Close>
        <Button.Root class="btn btn-danger" on:click={() => { isConfirmDeleteEntryOpen = false; deleteEntry(); }}>
          <span>Delete</span>
        </Button.Root>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style lang="postcss">
  :global(.delete-entry-dialog) {
    @apply w-full max-w-[calc(100%-24px)] 400:max-w-360
    text-neutral-800 dark:text-neutral-200
    border border-solid border-neutral-200 dark:border-neutral-800
    rounded-24 bg-white dark:bg-neutral-900
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50;
  }
</style>
