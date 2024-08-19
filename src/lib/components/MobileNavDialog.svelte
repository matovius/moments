<script lang="ts">
  import { quadOut } from "svelte/easing";
  import { fly, slide } from "svelte/transition";
	import { Button } from "bits-ui";
	import { XIcon } from "lucide-svelte";

  let Dialog: HTMLDialogElement;

  export let open: boolean = false;

  $: {
    if (open && Dialog) {
      document.body.style.overflow = "hidden";
      Dialog.showModal();
    } else if (!open && Dialog) {
      setTimeout(() => {
        Dialog.close();
        document.body.style.removeProperty("overflow");
      }, 200);
    }
  }

  function handleKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      open = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<dialog class="isolate w-0 h-0 overflow-visible p-0 border-none m-0 backdrop:bg-black/90" bind:this={Dialog}>
  <div class="fixed top-12 right-24 z-10">
    <Button.Root class="btn btn-ghost" aria-labelledby="mobile-nav-dialog-close" on:click={() => { open = false; }}>
      <XIcon aria-hidden="true" />
      <span id="mobile-nav-dialog-close" class="sr-only">Close</span>
    </Button.Root>
  </div>
  {#if open}
    <div class="mobile-nav-dialog" transition:fly={{ duration: 100, easing: quadOut, x: "100%", y: 0, opacity: 0 }}>
      <nav id="mobile-nav" class="block p-24">
        <ul class="flex flex-col justify-start items-start gap-24">
          <li>
            <a href="/#" class="nav-link" on:click={() => { open = false; }}>About</a>
          </li>
          <li>
            <a href="/#" class="nav-link" on:click={() => { open = false; }}>Changelog</a>
          </li>
          <li>
            <a href="/#" class="nav-link" on:click={() => { open = false; }}>Try the demo</a>
          </li>
          <li>
            <Button.Root href="/#waitlist" class="btn btn-default" on:click={() => { open = false; }}>Join the waitlist</Button.Root>
          </li>
        </ul>
      </nav>
    </div>    
  {/if}

  <button
    on:click={() => { open = false; }}
    id="overlay"
    class="w-[100dvw] h-[100dvh] bg-transparent fixed inset-0 -z-[1]"
    aria-label="Close dialog"
  >
    <span class="sr-only">Close dialog</span>
  </button>
</dialog>

<style lang="postcss">
  .mobile-nav-dialog {
    @apply text-neutral-800 dark:text-neutral-200 w-full
    max-w-[calc(100%-24px)] 400:max-w-360 h-[100dvh]
    rounded-l-24 bg-white dark:bg-neutral-900
    fixed top-0 right-0 z-[1];
  }
</style>
