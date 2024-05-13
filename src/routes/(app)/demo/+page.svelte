<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy } from "svelte";

	import { quadInOut, quintIn } from "svelte/easing";
	import { fly, scale } from "svelte/transition";
  
  import { type Moment } from "./types";
	import { AllMoments } from "./store";

  const Days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const Months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  let MomentInput: HTMLInputElement;

  let inputText: string = '';
  let isCtaDisabled: boolean = true;

  let allMoments: Moment[] = [];

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

    if (browser) {
      const timestamp: string = date.toLocaleTimeString();
      const text: string = inputText.trim();

      const newMoment: Moment = {
        text: text,
        timestamp: timestamp
      }

      AllMoments.update(moments =>  {
        return [newMoment, ...moments]
        }
      );
    }

    //console.log(allMoments);
    inputText = '';
  }

  function handleInputKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      saveMoment();
    }

    return;
  }

  function clearMoments() {
    AllMoments.set([]);
  }

  function checkTimestamp(savedTime: string) {
    const date: Date = new Date;
    const dateFormat = Intl.DateTimeFormat();

    console.log('Saved time: ', savedTime);
    console.log('Current Date: ', date.toLocaleDateString());
    console.log('Reformatted Date: ', `${Days[date.getDay()]}, ${date.getDate()}, ${Months[date.getMonth()]}, ${date.getFullYear()}`);
  }

  onDestroy(() => {
    unsubAllMoments();
  })
</script>

<svelte:head>
  <title>Moments</title>
</svelte:head>

<header class="header">
  <div class="container">
    <div class="corner start">
      <button class="button menu">
        <span>Menu</span>
      </button>
      <div class="logo">
        <span>Moments</span>
      </div>
    </div>
    <div class="corner">
      <!-- <button class="button userAccount">
        <span>A</span>
      </button> -->
      <button class="button clearMoments" on:click={clearMoments}>
        <span>Clear Moments</span>
      </button>
    </div>
  </div>
</header>

<footer class="footer">
  <div class="container inputContainer">
    <input
      type="text"
      name="input"
      id="input"
      class="inputField"
      placeholder="Do you have a Moment?"
      bind:this={MomentInput}
      bind:value={inputText}
      on:keydown={handleInputKeydown}
    />
    {#if inputText !== ''}
      <button
        class="button"
        disabled={isCtaDisabled}
        transition:scale={{ delay: 0, duration: 200, easing: quintIn, start: 0, opacity: 0 }}
        on:click={saveMoment}>
        <span>Send</span>
      </button>
    {/if}
  </div>
</footer>

<main class="main">
  <div class="container momentsContainer">
    {#each allMoments as moment, index}
      <button
        class="momentWrapper"
        data-index={index}
        transition:fly={{ duration: 200, easing: quadInOut, x: 0, y: '100%', opacity: 0 }}
        on:click={() => {
          checkTimestamp(moment.timestamp);
        }}
      >
        <span class="text">{moment.text}</span>
        <span class="timestamp">{moment.timestamp}</span>
      </button>
    {/each}
  </div>
</main>


<style>
  .header {
    isolation: isolate;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    position: relative;

    & > .container {
      width: 100%;
      max-width: 1200px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & > .corner {
        &.start {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }
      }
    }

    & .menu {
      padding-block: 4px;
      padding-inline: 8px;
    }

    /* This element is temporarily hidden for experimental purposes */
    & .logo {
      display: none;
      font-weight: 800;
    }
  
    & .userAccount {
      width: 36px;
      height: 36px;
      aspect-ratio: 1;
      user-select: none;
  
      & > span {
        line-height: 1;
        font-size: 24px;
        font-weight: 800;
      }
  
      &:is(:hover, :focus) {
        background: hsl(var(--clr-neutral-200));
        color: hsl(var(--clr-neutral-600));
      }
  
      &:focus-visible {
        outline-color: hsl(var(--clr-white));
      }
    }

    & .clearMoments {
      padding-block: 4px;
      padding-inline: 8px;
    }
  }

  .main {
    isolation: isolate;
    width: 100%;
    height: calc(100% - 84px);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 96px;
    
    & > .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: center;
      gap: 4px;
      padding-inline: 12px;
      overflow: auto;
    }
  }

  .momentWrapper {
    isolation: isolate;
    font: inherit;
    will-change: border-radius;
    transition: border-radius 200px ease;
    text-align: start;
    width: 100%;
    max-width: 600px;
    background: hsl(var(--clr-neutral-900));
    padding: 24px;
    border: none;
    border-radius: 12px;
    position: relative;

    & > .text {
      font-weight: 400;
      width: 100%;
    }

    & > .timestamp {
      font-size: 12px;
      line-height: 1.5;
      color: hsl(var(--clr-neutral-600));
      pointer-events: none;
      position: absolute;
      bottom: 8px;
      right: 8px;
    }
  }

  .footer {
    isolation: isolate;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 12px;
    padding-block: 24px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    
    & > .container {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
      background: hsl(var(--clr-neutral-950));
      box-shadow: 0 0 16px 16px hsl(var(--clr-neutral-950));
    }
  }

  .inputField {
    will-change: width;
    transition: all 200ms ease;
    font: inherit;
    color: hsl(var(--clr-neutral-200));
    width: 100%;
    padding: 12px 24px;
    border: none;
    border-radius: 9999rem;
    background: hsl(var(--clr-black));
    outline: 2px solid transparent;
    outline-offset: 4px;

    &::placeholder {
      color: hsl(var(--clr-neutral-800));
    }

    &:is(:hover, :focus) {
      color: hsl(var(--clr-white));
      background: hsl(var(--clr-neutral-900));

      &::placeholder {
        color: hsl(var(--clr-neutral-600));
      }
    }

    &:focus-visible {
      outline-color: hsl(var(--clr-white));
    }
  }
</style>
