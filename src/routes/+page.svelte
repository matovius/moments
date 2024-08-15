<script lang="ts">
  import { onMount } from "svelte";
  import { Dialog, Button } from "bits-ui";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import EntriesView from "$lib/components/EntriesView.svelte";
  import Form from '$lib/components/EntryForm.svelte';
  import { UserHasSeenLandingMessage } from "$lib/scripts/store";
	import { fly } from "svelte/transition";
	import { quadOut } from "svelte/easing";
	import LandingPage from "$lib/components/LandingPage.svelte";
  
  let EntriesDisplay: HTMLElement;
  let displayHeight: number;

  let isUserLandingOpen: boolean = true;

  function scrollView() {
    const entriesDisplayBox: DOMRect = EntriesDisplay.getBoundingClientRect();
    
    if (EntriesDisplay) {
      EntriesDisplay.scrollBy({ top: displayHeight, behavior: "smooth" });
      console.log("scrolled");
      console.log(displayHeight);
    }
  }

  function showApp() {
    EntriesDisplay.style.opacity = "1";
  }

  onMount(() => {
    setTimeout(() => {
      showApp();
      // console.log($HeaderHeight);
    }, 10);
  });
</script>

<svelte:head>
  <title>Moments</title>
</svelte:head>

<AppHeader pageTitle="Moments" />

<main
  style="opacity: 0;"
  class="h-full max-h-full overflow-hidden flex flex-col justify-center items-center px-12"
  bind:this={EntriesDisplay} bind:clientHeight={displayHeight}
>
  <EntriesView />
  <Form on:scroll={scrollView} />
</main>

<!-- <Dialog.Root bind:open={isUserLandingOpen}>
  <Dialog.Portal class="dialog-portal">
    <Dialog.Overlay class="dialog-overlay" />

    <Dialog.Content
      class="w-full max-w-960 h-full max-h-[80dvh] overflow-hidden
      border border-solid border-neutral-200 dark:border-neutral-800
      rounded-24 bg-white dark:bg-neutral-900
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      transition={fly}
      transitionConfig={{ duration: 500, easing: quadOut, x: 0, y: 48, opacity: 0 }}
    >
      <LandingPage on:close={() => { isUserLandingOpen = false; }} />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root> -->
