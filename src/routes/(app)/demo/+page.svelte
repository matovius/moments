<script lang="ts">
  import Header from "../journal-header.svelte";
  import EntriesView from "../entries-view.svelte";
  import Form from './entry-form.svelte';
  import { HeaderHeight } from "../store";

  $: headerHeight = $HeaderHeight;
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
</script>

<svelte:head>
  <title>Demo Journal - Moments</title>
</svelte:head>

<Header pageTitle="Demo Journal" />

<main
  class="main"
  style="padding-top: {(headerHeight + 12) | 58 + 12}px;"
  bind:this={EntriesDisplay} bind:clientHeight={displayHeight}
>
  <Form on:scroll={scrollView} />
  <EntriesView />
</main>

<style>
  .main {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    padding-inline: 12px;
  }
</style>
