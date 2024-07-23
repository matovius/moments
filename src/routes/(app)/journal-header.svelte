<script lang="ts">
	import { page } from "$app/stores";
	import Logo from "$lib/components/Logo.svelte";
	import { Button, DropdownMenu, Tooltip } from "bits-ui";
	import { EllipsisIcon, MenuIcon, SearchIcon } from "lucide-svelte";
	import { onMount } from "svelte";
	import { quadOut } from "svelte/easing";
	import { fly } from "svelte/transition";
	import { HeaderHeight, AllMoments } from "./store";

  export let pageTitle: string;

  let header: HTMLElement;
  let headerHeight: number;

  let isMoreOptionsOpen: boolean = false;

  function showHeader() {
    header.style.opacity = "1";
  }

  onMount(() => {
    setTimeout(() => {
      HeaderHeight.set(headerHeight);
      showHeader();
      console.log($HeaderHeight);
    }, 15);
  })
</script>


<header class="header" style="opacity: 0;" bind:this={header} bind:clientHeight={headerHeight}>
  <div class="container">
    <div class="side">
      {#if $page.url.pathname === "/demo"}
        <a href="/" class="logo-wrapper">
          <Logo />
          <span class="sr-only">Back to homepage</span>
        </a>

      {/if}

      <div class="page-title">
        <span>{pageTitle}</span>
      </div>
    </div>

    <div class="side">
      <div class="nav">
        <Tooltip.Root openDelay={500}>
          <Tooltip.Trigger class="btn btn-ghost">
            <SearchIcon />
            <span class="sr-only">Search</span>
          </Tooltip.Trigger>
          <Tooltip.Content
            transition={fly}
            transitionConfig={{ duration: 100, easing: quadOut, x: 0, y: -4 }}
            side="bottom"
            sideOffset={4}
          >
            <div class="tooltip">
              <small class="small">Search</small>

            </div>
          </Tooltip.Content>
        </Tooltip.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger class="btn btn-ghost">
            <EllipsisIcon />
            <span class="sr-only">More options</span>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="dropdown-menu"
            style="z-index: 101;"
            align="end"
            transition={fly}
            transitionConfig={{ duration: 100, easing: quadOut, x: 0, y: -4, opacity: 0 }}
          >
            <DropdownMenu.Item class="btn btn-ghost">Take a tour</DropdownMenu.Item>
            <DropdownMenu.Item class="btn btn-ghost" on:click={() => { AllMoments.set([]) }}>Clear journal</DropdownMenu.Item>
            <DropdownMenu.Item class="btn btn-default" style="--pad-x: 48px;">Join the waitlist</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    width: 100%;
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
  }

  .side > .nav {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  .tooltip {
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 4px;
    border-radius: 9999rem;
    border: 1px solid hsl(var(--clr-neutral-200));
    background: hsl(var(--clr-white));
  }

  :global(.dropdown-menu) {
    display: grid;
    grid-auto-flow: row;
    gap: 4px;
    padding: 4px;
    border: 1px solid hsl(var(--clr-neutral-200));
    border-radius: 24px;
    background-color: hsl(var(--clr-white));
  }
</style>

