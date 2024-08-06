<script lang="ts">
	import Logo from "$lib/components/Logo.svelte";
	import { Button, Dialog, DropdownMenu } from "bits-ui";
	import { EllipsisIcon, SearchIcon, XIcon } from "lucide-svelte";
	import { onMount } from "svelte";
	import { quadOut } from "svelte/easing";
	import { fly, scale } from "svelte/transition";
	import { HeaderHeight, AllEntries } from "$lib/scripts/store";

  export let pageTitle: string;

  let header: HTMLElement;
  let headerHeight: number;
  let isClearMomentsOpen: boolean = false;
  let isAboutOpen: boolean = false;

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

<header
  class="w-full flex justify-center items-center px-24"
  style="opacity: 0;" bind:this={header} bind:clientHeight={headerHeight}
>
  <div class="w-full max-w-600 flex flex-row justify-between py-12">
    <div class="flex flex-row justify-start items-center gap-12">
      <a
        href="/"
        class="home-link text-neutral-800 dark:text-neutral-200 rounded-full
        outline-dashed outline-2 outline-transparent outline-offset-4
        hover:text-primary-500 focus:text-primary-500
        focus-visible:outline-primary-500"
        aria-labelledby="back-to-homepage-link"
      >
        <div class="size-24 aspect-square">
          <Logo />
        </div>
        <span id="back-to-homepage-link" class="sr-only">Back to homepage</span>
      </a>

      <div id="page-title" class="text-[16px] font-extrabold text-neutral-600 dark:text-neutral-400" role="heading" aria-level="1">
        <span>{pageTitle}</span>
      </div>
    </div>

    <div class="flex flex-row justify-end items-center gap-12">
      <div class="flex flex-row gap-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger class="btn btn-ghost" aria-labelledby="header-more-options-button-id">
            <EllipsisIcon aria-hidden="true" />
            <span id="header-more-options-button-id" class="sr-only">More options</span>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            class="w-160 flex flex-col border border-solid border-neutral-200 dark:border-neutral-800
            rounded-24 bg-white dark:bg-neutral-900 z-50 overflow-hidden"
            transition={fly}
            transitionConfig={{ duration: 100, easing: quadOut, x: 0, y: -4, opacity: 0 }}
          >
            <DropdownMenu.Group class="py-12">
              <DropdownMenu.Item
                class="btn btn-ghost" style="--btn-radius: 0px;"
                on:click={() => { isClearMomentsOpen = true; }}>Clear all entries</DropdownMenu.Item>
              <DropdownMenu.Item
                class="btn btn-ghost" style="--btn-radius: 0px;"
                on:click={() => { isAboutOpen = true; }}>About Moments</DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </div>
</header>

<Dialog.Root bind:open={isClearMomentsOpen}>
  <Dialog.Portal class="dialog-portal">
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="clear-entries-dialog" transition={scale}
      transitionConfig={{ duration: 100, easing: quadOut, start: 0.95, opacity: 0 }}
    >
      <div class="absolute top-24 right-24">
        <Dialog.Close class="btn btn-ghost" aria-labelledby="clear-entries-dialog-close">
          <XIcon aria-hidden="true" />
          <span id="clear-entries-dialog-close" class="sr-only">Close</span>
        </Dialog.Close>
      </div>

      <Dialog.Title class="p-24 border-b border-solid border-neutral-200 dark:border-neutral-800">
        <h3 class="h-xs">Clear all entries?</h3>
      </Dialog.Title>
      <Dialog.Description class="p-24">
        <p class="p">
          Are you sure you want to clear all your recorded entries?
          They will be deleted permanently.
        </p>
      </Dialog.Description>

      <div class="grid grid-cols-2 gap-12 p-24">
        <Dialog.Close class="btn btn-outlined">
          <span>Cancel</span>
        </Dialog.Close>
        <Button.Root class="btn btn-danger"
          on:click={() => {
            isClearMomentsOpen = false;
            clearAllEntries();
          }}
        >
          <span>Clear all</span>
        </Button.Root>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root bind:open={isAboutOpen}>
  <Dialog.Portal class="dialog-portal">
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="about-dialog" transition={scale}
      transitionConfig={{ duration: 100, easing: quadOut, start: 0.95, opacity: 0 }}
    >
      <div class="absolute top-24 right-24">
        <Dialog.Close class="btn btn-ghost" aria-labelledby="about-dialog-close">
          <XIcon aria-hidden="true" />
          <span id="about-dialog-close" class="sr-only">Close</span>
        </Dialog.Close>
      </div>

      <Dialog.Title class="p-24 border-b border-solid border-neutral-200 dark:border-neutral-800">
        <h3 class="h-xs">About Moments</h3>
      </Dialog.Title>
      <Dialog.Description class="p-24">
        <p class="p">
          Moments is a note-taking and journaling app that helps you capture your thoughts
          and keep track of your daily happenings.
        </p><br />
        <p class="p">
          With the chat-style interface consisting of discrete units called entries that let
          you write just about anything you want without having to worry about structure or format.
          This means that you can be as informal and unstructured as you want because this is
          supposed to be a dump for your brain.
        </p><br />
        <p class="p">
          This project was solidified by Martin Matovu at The Webware Workshop and is free and open-source.
          You can find the code on
          <a
            href="https://github.com/matovius/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-primary-500"
          >GitHub</a>.
        </p>
      </Dialog.Description>

      <div class="grid p-24">
        <Dialog.Close class="btn btn-outlined">
          <span>Close</span>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style lang="postcss">
  #page-title > span::before {
    content: "Journal title ;";
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
    margin: -1px;
    clip: rect(0,0,0,0);
    overflow: hidden;
  }

  :global(.clear-entries-dialog) {
    @apply text-neutral-800 dark:text-neutral-200 w-full max-w-[calc(100%-24px)] 400:max-w-360
    border border-solid border-neutral-200 dark:border-neutral-800
    rounded-24 bg-white dark:bg-neutral-900
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50;
  }

  :global(.about-dialog) {
    @apply text-neutral-800 dark:text-neutral-200 w-full max-w-[calc(100%-24px)] 400:max-w-360
    border border-solid border-neutral-200 dark:border-neutral-800
    rounded-24 bg-white dark:bg-neutral-900
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50;
  }
</style>
