<script lang="ts">
  import dayjs from "dayjs";
  import { browser } from "$app/environment";
  import { Button } from "bits-ui";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import { AllEntries } from "$lib/scripts/store";
  import { type Entry } from "$lib/scripts/types";
	import { SaveIcon } from "lucide-svelte";

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

  function getCurrentDate(): number {
    return Date.now();
  }
</script>

<svelte:head>
  <title>Home - Moments Demo App</title>
</svelte:head>

<AppHeader pageTitle="Welcome to Moments" />

<main class="w-full h-full max-h-full overflow-auto flex justify-start items-start px-60">
  <div id="container" class="w-full max-w-960 flex flex-col pt-120">
    <div id="lede" class="w-full flex flex-col gap-24">
      <h2 class="h-lg text-neutral-800 dark:text-white">It's time to add to your journal</h2>
      <p class="p">
        Today is
        <span>{dayjs(getCurrentDate()).format('dddd, MMMM D, YYYY')}</span>.
        You currently have <span>no</span> entries for today.
      </p>
    </div>

    <div class="w-full max-w-960 pt-24">
      <form id="form" class="w-full flex justify-start items-start gap-8 py-12" on:submit|preventDefault>
        <div class="w-full max-w-600 flex flex-row justify-center items-center gap-8 relative">
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
          <!-- <textarea
            name="entry-text"
            id="entry-text"
            rows="8"
            placeholder="Do you have a moment?"
            class="input resize-none"
            style="--input-radius: 24px;"
            bind:this={EntryInput}
            bind:value={inputText}
          ></textarea> -->

          <div class="absolute inset-y-0 right-4 flex flex-col justify-between items-end py-4 pointer-events-none">
            <Button.Root
              class="btn btn-primary pointer-events-auto"
              aria-label="Add to journal" title="Add to journal"
              disabled={isCtaDisabled}
              on:click={() => {
                saveEntry();
                EntryInput.focus();
              }}>
              <SaveIcon aria-hidden="true" />
            </Button.Root>
          </div>
        </div>
      </form>
    </div>

    <div class="w-fit flex flex-row justify-center items-center gap-12 pt-48">
      <Button.Root href="/demo/journal" class="btn btn-outlined">
        <span>Go to the journal</span>
      </Button.Root>
      <small class="small">OR</small>
      <Button.Root href="/demo/notepad" class="btn btn-outlined">
        <span>Open the notepad</span>
      </Button.Root>
    </div>
  </div>
</main>
