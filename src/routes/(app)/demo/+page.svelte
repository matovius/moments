<script lang="ts">
  import { onMount } from "svelte";
  import { Dialog, Button } from "bits-ui";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import EntriesView from "$lib/components/EntriesView.svelte";
  import Form from '$lib/components/EntryForm.svelte';
  
  let EntriesDisplay: HTMLElement;
  let displayHeight: number;

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
