<script lang="ts">
  import { browser } from "$app/environment";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import dayjs from "dayjs";
	import { quadInOut, quadOut, quintIn } from "svelte/easing";
	import { fade, fly, scale } from "svelte/transition";
	import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from "lucide-svelte";
  import { type Moment } from "./types";
	import { AllMoments, HeaderHeight } from "./store";
  import { Dialog } from "bits-ui";
  import { XIcon } from "lucide-svelte";
  import EntryCard from "./entry-card.svelte";

  let dispatch = createEventDispatcher();
  let MomentsDisplay: HTMLElement;
  let allMoments: Moment[] = [];

  let isDialogOpen: boolean = false;
  let selectedMoment: Moment;
  let selectedMomentIndex: number;

  // I do a subscription callback here to be able to update
  // localStorage whenever the store value changes.
  const unsubAllMoments = AllMoments.subscribe((moments) => {
    allMoments = moments;
    if (browser) {
      localStorage.setItem('allMoments', JSON.stringify(moments));
      dispatch("scroll");
    }
  });

  function openSelectionDialog(ev: CustomEvent) {
    selectedMoment = ev.detail.moment;
    selectedMomentIndex = ev.detail.index;
    console.log(selectedMomentIndex);
    setTimeout(() => {
      isDialogOpen = true;
    }, 15);
    console.log(isDialogOpen);
  }

  onDestroy(() => {
    unsubAllMoments();
  });
</script>

<div class="entries" transition:fade={{ duration: 200, easing: quadOut }}>
  {#each allMoments as moment, index}
    <!-- <button
      class="moment"
      id={`moment-${moment.timestamp}`}
      data-id={moment.timestamp}
      data-index={index}
      transition:fly={{ duration: 200, easing: quadInOut, x: 0, y: '50%', opacity: 0 }}
    >
      <span class="p">{moment.text}</span>
    </button> -->

    <EntryCard {moment} {index} on:open-entry={openSelectionDialog} />
  {/each}
</div>
<Dialog.Root bind:open={isDialogOpen}>
  <Dialog.Portal class="dialog-portal">
    <Dialog.Overlay
      class="dialog-overlay"
      transition={fade}
      transitionConfig={{ duration: 100, easing: quadOut }}
    />
    <Dialog.Content
      class="dialog-content"
      transition={scale}
      transitionConfig={{ duration: 100, easing: quadOut, start: 0.95, opacity: 0 }}
    >
      <Dialog.Description>
        <p class="h-xs">{selectedMoment.text}</p>
      </Dialog.Description>
      <Dialog.Close class="btn btn-default">
        <XIcon />
        <span>Close</span>
      </Dialog.Close>
    </Dialog.Content>

  </Dialog.Portal>
</Dialog.Root>

<style>
  .entries {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column-reverse;
    padding-top: 12px;
    padding-bottom: 12px;

    & > .moment {
      font: inherit;
      text-align: start;
      width: 100%;
      max-width: 600px;
      background: transparent;
      padding: 24px;
      border: none;
      border-radius: 12px;
      position: relative;

      &:is(:hover, :focus) {
        background: hsl(var(--clr-neutral-100));
      }
    }
  }

  :global(.dialog-portal) {
    isolation: isolate;
    position: fixed;
    z-index: 1000;
  }
  :global(.dialog-overlay) {
    width: 100%;
    height: 100%;
    background-color: hsl(var(--clr-black) / 0.9);
    position: fixed;
    inset: 0;
    z-index: 50;
  }
  :global(.dialog-content) {
    width: 100%;
    max-width: 90%;
    padding: 24px;
    border: 1px solid hsl(var(--clr-neutral-200));
    border-radius: 24px;
    background-color: hsl(var(--clr-white));
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 50;
    transform: translate(-50%, -50%);

    &::backdrop {
      background-color: hsl(var(--clr-black), 0.9);
    }

    @media screen and (min-width: 648px) {
      max-width: 600px;
    }
  }
</style>