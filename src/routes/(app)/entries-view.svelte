<script lang="ts">
  import { browser } from "$app/environment";
	import { createEventDispatcher, onDestroy } from "svelte";
	import dayjs from "dayjs";
	import { quadOut } from "svelte/easing";
	import { fade } from "svelte/transition";
  import { type Entry } from "./types";
	import { AllEntries } from "./store";
  import EntryCard from "./entry-card.svelte";

  interface MomentGroup {
    date: string;
    entries: Entry[];
  }

  let dispatch = createEventDispatcher();
  let allEntries: Entry[] = [];
  let EntriesList: HTMLElement;
  let listHeight: number;

  // I do a subscription callback here to be able to update
  // localStorage whenever the store value changes.
  const unsubAllEntries = AllEntries.subscribe((entries) => {
    allEntries = entries.toReversed();
    if (browser) {
      localStorage.setItem('allEntries', JSON.stringify(entries));
      // dispatch("scroll");
      setTimeout(scrollView, 100);
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

<div class="entries" transition:fade={{ duration: 200, easing: quadOut }}>
  <div class="container">
    <ul class="entries-list" bind:this={EntriesList} bind:clientHeight={listHeight}>
      {#each entriesByDate as group}
        <li>
          <div class="date">
            <span class="small">{group.date}</span>
          </div>
          <ul class="entry-group">
            {#each group.entries as entry, index}
              <li>
                <EntryCard {entry} {index} />
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .entries {
    width: 100%;
    max-width: 600px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid hsl(var(--clr-neutral-200));
    border-radius: 16px;
    overflow: hidden;

    & > .container {
      width: 100%;
      height: 100%;
      overflow: auto;
      /* margin-bottom: 74px; */
    }

    & li > .date {
      isolation: isolate;
      text-align: center;
      color: hsl(var(--clr-neutral-400));
      padding-block: 16px;
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid hsl(var(--clr-neutral-200));
      background-color: hsl(var(--clr-white));
    }
  }

  ul {
    list-style: none;
    width: 100%;

    & > li {
      width: 100%;
    }
  }

  .entries-list {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .entry-group > li {
    padding: 4px;
  }
</style>
