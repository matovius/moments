<script lang="ts">
  import { browser } from "$app/environment";
	import { onDestroy, onMount } from "svelte";
	import dayjs from "dayjs";
	import { quadInOut, quintIn } from "svelte/easing";
	import { fade, fly, scale } from "svelte/transition";
	import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from "lucide-svelte";
  import { type Moment } from "./types";
	import { AllMoments } from "./store";

  let MomentInput: HTMLInputElement;
  let MomentsDisplay: HTMLElement;

  let inputText: string = '';
  let isCtaDisabled: boolean = true;
  let isPlaceholderVisible: boolean = true;

  let allMoments: Moment[] = [];

  // I do a subscription callback here to be able to update
  // localStorage whenever the store value changes.
  const unsubAllMoments = AllMoments.subscribe((moments) => {
    allMoments = moments;
    if (browser) {
      localStorage.setItem('allMoments', JSON.stringify(moments));
    }
  });

  $: if (inputText !== '') {
    isCtaDisabled = false;
  }

  function saveMoment() {
    const date: Date = new Date;

    if (isPlaceholderVisible) {
      isPlaceholderVisible = false;
    }

    if (browser) {
      const timestamp: number = date.getTime();
      const text: string = inputText.trim();
      // const utcDateTime: string = date.toUTCString();
      
      if (text !== '') {
        const newMoment: Moment = {
          text: text,
          timestamp: timestamp,
        }
  
        AllMoments.update((moments) =>  {
          return [newMoment, ...moments];
        });
      }
    }

    //console.log(allMoments);
    inputText = '';
    MomentsDisplay.scrollTo({ top: MomentsDisplay.clientHeight, behavior: "smooth" });
  }

  function handleInputKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      saveMoment();
    }

    return;
  }

  function togglePlaceholder() {
    if (isPlaceholderVisible) {
      isPlaceholderVisible = false;
    } else {
      isPlaceholderVisible = true;
    }
  }

  function clearMoments() {
    AllMoments.set([]);
  }

  function checkTimestamp(savedTime: string) {
  }

  onDestroy(() => {
    unsubAllMoments();
  });
</script>

<svelte:head>
  <title>Moments</title>
</svelte:head>


<main class="main" bind:this={MomentsDisplay}>
  <form class="form" on:submit|preventDefault>
    <div class="container">
      <input
        type="text"
        class="input"
        aria-label="Textbox"
        placeholder="Do you have a Moment?"
        bind:value={inputText}
        on:keydown={handleInputKeydown}
      />
      <button
        class="button solid cta"
        style="--pad-y: 12px;"
        title="Log"
        on:click={() => {
          MomentInput.focus();
          saveMoment();
        }}>
        <ArrowUpIcon />
        <span class="sr-only">Log</span>
      </button>
    </div>
  </form>
  {#if !allMoments || !allMoments.length}
    <div
      class="placeholder"
      transition:scale={{ duration: 200, easing: quadInOut, start: 0.95, opacity: 0 }}
    >
      <h1 class="h1 heading">The simplest way to put down your thoughts</h1>
      <p class="p explanation">
        <span>
          Just tap the text box, type what you have on your mind, press Enter, and BOOM! Done.
        </span>
        <span>
          Remember, your data is saved in your browser's localStorage, and you can retrieve it in JSON format whenever you want.
        </span>
      </p>
    </div>
  {:else}
    <div class="all-moments" transition:fade={{ duration: 200, easing: quadInOut }}>
      {#each allMoments as moment, index}
        <button
          class="moment"
          id={`moment-${moment.timestamp}`}
          data-id={moment.timestamp}
          data-index={index}
          transition:fly={{ duration: 200, easing: quadInOut, x: 0, y: '50%', opacity: 0 }}
        >
          <span class="p">{moment.text}</span>
        </button>
      {/each}
    </div>
  {/if}
  <div class="content">
  </div>
</main>


<style>
  .main {
    isolation: isolate;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    padding-inline: 12px;
    overflow: auto;
    position: relative;
  }

  .placeholder {
    width: 100%;
    max-width: 600px;
    padding-inline: 12px;
    padding-bottom: 120px;
    position: absolute;

    & > .heading {
      color: hsl(var(--clr-neutral-500));
      text-align: center;
    }

    & > .explanation {
      text-align: start;
      padding-top: 48px;
    }
  }

  .all-moments {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column-reverse;
    padding-top: 12px;
    padding-bottom: 12px;

    & > .moment {
      font: inherit;
      transition: border-radius 200px ease;
      text-align: start;
      width: 100%;
      max-width: 600px;
      background: transparent;
      padding: 24px;
      border: none;
      border-radius: 12px;
      position: relative;

      &:is(:hover, :focus) {
        background: hsl(var(--clr-neutral-900));
      }
    }
  }

  .form {
    color-scheme: dark;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background: hsl(var(--clr-neutral-950), 0.9);
    backdrop-filter: blur(12px);
    position: sticky;
    bottom: 0;
    z-index: 10;

    & > .container {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding-block: 12px;
    }
  }
</style>
