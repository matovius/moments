<script lang="ts">
	import { page } from "$app/stores";
	import Logo from "$lib/components/Logo.svelte";
	import { Button, Dialog, DropdownMenu, Tooltip } from "bits-ui";
	import { EllipsisIcon, MenuIcon, SearchIcon, XIcon } from "lucide-svelte";
	import { onMount } from "svelte";
	import { quadOut } from "svelte/easing";
	import { fly, scale } from "svelte/transition";
	import { HeaderHeight, AllEntries } from "./store";

  export let pageTitle: string;

  let header: HTMLElement;
  let headerHeight: number;
  let isClearMomentsOpen: boolean = false;
  let isTutorialOpen: boolean = false;

  function showHeader() {
    header.style.opacity = "1";
  }

  function clearAllEntries() {
    AllEntries.set([]);
  }

  onMount(() => {
    setTimeout(() => {
      HeaderHeight.set(headerHeight);
      showHeader();
      // console.log($HeaderHeight);
    }, 10);
  })
</script>


<header class="header" style="opacity: 0;" bind:this={header} bind:clientHeight={headerHeight}>
  <div class="container">
    <div class="side">
      {#if $page.url.pathname === "/demo"}
        <a href="/" class="logo-wrapper" aria-labelledby="homepage-link">
          <Logo />
          <span id="homepage-link" class="sr-only">Back to homepage</span>
        </a>

      {/if}

      <div class="page-title" role="heading" aria-level="1">
        <span>{pageTitle}</span>
      </div>
    </div>

    <div class="side">
      <div class="nav">
        <Button.Root class="btn btn-ghost" aria-labelledby="header-search-button-id">
          <SearchIcon aria-hidden="true" />
          <span id="header-search-button-id" class="sr-only">Search</span>
        </Button.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger class="btn btn-ghost" aria-labelledby="header-more-options-button-id">
            <EllipsisIcon aria-hidden="true" />
            <span id="header-more-options-button-id" class="sr-only">More options</span>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="dropdown-menu"
            style="z-index: 101;"
            align="end"
            transition={fly}
            transitionConfig={{ duration: 100, easing: quadOut, x: 0, y: -4, opacity: 0 }}
          >
            <DropdownMenu.Group>
              <DropdownMenu.Item class="btn btn-ghost"
                on:click={() => { isTutorialOpen = true; }}>Take the tour</DropdownMenu.Item>
              <DropdownMenu.Item class="btn btn-ghost"
                on:click={() => { isClearMomentsOpen = true; }}>Clear all entries</DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator class="horizontal-separator" />
            <DropdownMenu.Group>
              <DropdownMenu.Item href="/#" class="btn btn-ghost">Pricing</DropdownMenu.Item>
              <DropdownMenu.Item href="/#" class="btn btn-ghost">Changelog</DropdownMenu.Item>
              <DropdownMenu.Item href="/#" class="btn btn-ghost">About</DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Item class="btn btn-default" style="--pad-x: 24px;">Join the waitlist</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </div>
</header>

<Dialog.Root bind:open={isTutorialOpen}>
  <Dialog.Portal class="dialog-portal">
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="tutorial-dialog" transition={scale} transitionConfig={{ duration: 100, easing: quadOut, start: 0.95, opacity: 0 }}>
      <div class="close-button">
        <Dialog.Close class="btn btn-ghost" aria-labelledby="tutorial-dialog-close">
          <XIcon aria-hidden="true" />
          <span id="tutorial-dialog-close" class="sr-only">Close</span>
        </Dialog.Close>
      </div>

      <Dialog.Title class="title">
        <h3 class="h-xs">Tutorial</h3>
      </Dialog.Title>
      <Dialog.Description class="description">
        <p class="step">Step {1}</p>
        <br />
        <p class="p">
          There's a textbox at the bottom.
          Use that to type your notes, and press <kbd>Enter</kbd>
          to add it to your journal.
        </p>
      </Dialog.Description>

      <div class="actions">
        <Button.Root class="btn btn-outlined" disabled aria-disabled="true">
          <span>Previous</span>
        </Button.Root>
        <Button.Root class="btn btn-primary">
          <span>Next</span>
        </Button.Root>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root bind:open={isClearMomentsOpen}>
  <Dialog.Portal class="dialog-portal">
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="clear-moments-dialog" transition={scale} transitionConfig={{ duration: 100, easing: quadOut, start: 0.95, opacity: 0 }}>
      <div class="close-button">
        <Dialog.Close class="btn btn-ghost" aria-labelledby="clear-moments-dialog-close">
          <XIcon aria-hidden="true" />
          <span id="clear-moments-dialog-close" class="sr-only">Close</span>
        </Dialog.Close>
      </div>

      <Dialog.Title class="title">
        <h3 class="h-xs">Clear all entries?</h3>
      </Dialog.Title>
      <Dialog.Description class="description">
        <p class="p">
          Are you sure you want to clear your recorded entries?
          They will be deleted permanently.
        </p>
      </Dialog.Description>

      <div class="actions">
        <Button.Root class="btn btn-outlined" on:click={() => { isClearMomentsOpen = false; }}>
          <span>Cancel</span>
        </Button.Root>
        <Button.Root class="btn btn-danger" on:click={() => { isClearMomentsOpen = false; clearAllEntries(); }}>
          <span>Clear all</span>
        </Button.Root>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  .header {
    width: 100dvw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 24px;
    background-color: hsl(var(--clr-white));
    position: fixed;
    top: 0;
    z-index: 100;

    & > .container {
      width: 100%;
      max-width: 960px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-block: 12px;

      & > .side {
        display: flex;
        flex-direction: row;
      }
    }
  }

  .side:is(:nth-child(1)) {
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  }
  .side:is(:nth-last-child(1)) {
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }

  .logo-wrapper {
    width: 24px;
    height: 24px;
    aspect-ratio: 1;
    color: hsl(var(--clr-neutral-800));
    border-radius: 9999rem;
    outline: 2px dashed transparent;
    outline-offset: 4px;

    &:is(:hover, :focus) {
      color: hsl(var(--clr-primary-500));
    }

    &:focus-visible {
      outline-color: hsl(var(--clr-primary-500));
    }
  }

  .page-title {
    font-size: 16px;
    font-weight: 800;
    color: hsl(var(--clr-neutral-600));

    & > span::before {
      content: "Journal title ;";
      opacity: 0;
      width: 1;
      height: 1;
      position: absolute;
      margin: -1px;
      clip: rect(0,0,0,0);
    }
  }

  .side > .nav {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  :global(.dropdown-menu) {
    display: grid;
    grid-auto-flow: row;
    gap: 4px;
    padding: 12px;
    border: 1px solid hsl(var(--clr-neutral-200));
    border-radius: 24px;
    background-color: hsl(var(--clr-white));
  }
  :global(.clear-moments-dialog) {
    width: 100%;
    max-width: calc(100% - 24px);
    border: 1px solid hsl(var(--clr-neutral-200));
    border-radius: 24px;
    background-color: hsl(var(--clr-white));
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;

    & > .close-button {
      position: absolute;
      top: 24px;
      right: 24px;
    }

    & > .title {
      padding: 24px;
      border-bottom: 1px solid hsl(var(--clr-neutral-200));
    }

    & > .description {
      padding: 24px;
    }
    & > .actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      padding: 24px;
    }

    @media screen and (min-width: 400px) {
      max-width: 360px;
    }
  }
  :global(.tutorial-dialog) {
    width: 100%;
    max-width: calc(100% - 24px);
    border: 1px solid hsl(var(--clr-neutral-200));
    border-radius: 24px;
    background-color: hsl(var(--clr-white));
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;

    & > .close-button {
      position: absolute;
      top: 24px;
      right: 24px;
    }

    & > .title {
      padding: 24px;
      border-bottom: 1px solid hsl(var(--clr-neutral-200));
    }

    & > .description {
      padding: 24px;
      & > .step {
        font-weight: 600;
      }
    }
    & > .actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      padding: 24px;
    }

    @media screen and (min-width: 400px) {
      max-width: 360px;
    }
  }
</style>

