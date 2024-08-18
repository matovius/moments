<script lang="ts">
  import { browser } from "$app/environment";
  import { Button } from "bits-ui";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import { AllEntries } from "$lib/scripts/store";
  import { type Entry } from "$lib/scripts/types";
	import { ChevronRightIcon } from "lucide-svelte";

  let EntryInput: HTMLInputElement;
  let inputText: string = '';
  $: isCtaDisabled = inputText === '';

  function saveEntry() {
    const date: Date = new Date;

    if (browser) {
      const timestamp: number = date.getTime();

      let text: string = inputText.trim();
      // const utcDateTime: string = date.toUTCString();
      
      if (text !== '') {
        const newEntry: Entry = {
          text,
          timestamp,
        }
  
        AllEntries.update((entries) =>  {
          return [newEntry, ...entries];
        });
        // dispatch("scroll");
      }
    }
    inputText = '';
  }

  function handleInputKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      saveEntry();
    }

    return;
  }
</script>

<svelte:head>
  <title>Welcome - Moments Demo App</title>
</svelte:head>

<AppHeader pageTitle="Welcome to Moments" />

<main class="w-full h-full max-h-full overflow-auto flex justify-start items-start px-60">
  <div id="container" class="w-full max-w-960 flex flex-col pt-120">
    <h2 class="h-xs text-neutral-500">Add to your journal</h2>
    <!-- <span class="h-xs">Today is {dayjs(Date.now()).format('dddd, MMM D, YYYY')}</span> -->
    <div class="w-full max-w-960 pt-24">
      <form id="form" class="w-full flex justify-center items-center gap-8 py-12" on:submit|preventDefault>
        <div class="w-full flex flex-row justify-center items-center gap-8 relative">
          <input
            type="text"
            class="input"
            aria-label="Textbox"
            placeholder="Do you have a moment?"
            style="padding-right: 62px;"
            bind:this={EntryInput}
            bind:value={inputText}
            on:keydown={handleInputKeydown}
          />
          <div class="absolute right-4">
            <Button.Root
            class="btn btn-default"
            disabled={isCtaDisabled}
            on:click={() => {
              saveEntry();
              EntryInput.focus();
            }}>
            <span>Save</span>
            </Button.Root>
          </div>
        </div>
      </form>
    </div>
    <div class="w-fit pt-24">
      <!-- <a href="/demo/journal" class="link">Open your journal instead?</a> -->
      <Button.Root href="/demo/journal" class="btn btn-outlined">
        <span>Open your journal instead</span>
        <ChevronRightIcon aria-hidden="true" />
      </Button.Root>
      <span class="p block pl-12 py-12">Or</span>
      <Button.Root href="/demo/notepad" class="btn btn-outlined">
        <span>Open the notepad</span>
        <ChevronRightIcon aria-hidden="true" />
      </Button.Root>
    </div>
  </div>
</main>
