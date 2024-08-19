<script lang="ts">
	import Logo from "$lib/components/Logo.svelte";
	import { Button, Dialog, DropdownMenu } from "bits-ui";
	import { EllipsisIcon, MenuIcon, XIcon } from "lucide-svelte";
	import { onMount } from "svelte";
	import { quadOut } from "svelte/easing";
	import { fly, slide } from "svelte/transition";
	import MobileNavDialog from "$lib/components/MobileNavDialog.svelte";

  let header: HTMLElement;
  let isMobileNavOpen: boolean = false;

  function showHeader() {
    header.style.opacity = "1";
  }

  onMount(() => {
    setTimeout(() => {
      showHeader();
    }, 10);
  })
</script>

<header
  class="w-full flex justify-center items-center px-24 bg-white dark:bg-neutral-900 sticky top-0"
  style="opacity: 0;" bind:this={header}
>
  <div id="container" class="w-full max-w-960 flex flex-row justify-between py-12">
    <div id="start" class="flex flex-row justify-start items-center gap-12">
      <a
        href="/"
        class="home-link text-black dark:text-white rounded-full
        outline-dashed outline-2 outline-transparent outline-offset-4
        hover:text-primary-500 focus:text-primary-500
        focus-visible:outline-primary-500"
        aria-labelledby="go-to-homepage-link"
      >
        <div class="size-24 aspect-square">
          <Logo />
        </div>
        <span id="go-to-homepage-link" class="sr-only">Go to homepage</span>
      </a>

      <div id="page-title" class="text-[16px] font-extrabold" role="heading" aria-level="1">
        <span>Moments</span>
      </div>
    </div>

    <div id="end" class="flex flex-row justify-end items-center gap-12">
      <nav id="desktop-nav" class="hidden 960:block">
        <ul class="flex flex-row justify-end items-center gap-12">
          <li>
            <a href="/#" class="nav-link">About</a>
          </li>
          <li>
            <a href="/#" class="nav-link">Changelog</a>
          </li>
          <li>
            <a href="/#" class="nav-link">Try the demo</a>
          </li>
          <li>
            <Button.Root href="/waitlist" class="btn btn-default">Join the waitlist</Button.Root>
          </li>
        </ul>
      </nav>
      <div id="mobile-nav" class="block 960:hidden">
        <Button.Root class="btn btn-ghost" on:click={() => { isMobileNavOpen = true; }}>
          <MenuIcon aria-hidden="true" />
          <span id="mobile-nav-dialog-trigger" class="sr-only">Open nav drawer</span>
        </Button.Root>
        <MobileNavDialog bind:open={isMobileNavOpen} />
      </div>
    </div>
  </div>
</header>

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

  :global(.mobile-nav-dialog) {
    @apply text-neutral-800 dark:text-neutral-200 w-full
    max-w-[calc(100%-24px)] 400:max-w-360 h-[100dvh]
    rounded-l-24 bg-white dark:bg-neutral-900
    fixed top-0 right-0 z-50;
  }
</style>
