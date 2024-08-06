<script lang="ts">
  import { browser } from "$app/environment";
	import { ArrowUpIcon } from "lucide-svelte";
	import { Button } from "bits-ui";
  import { type Entry } from "$lib/scripts/types";
  import { AllEntries } from "$lib/scripts/store";

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

<form id="form" class="w-full flex justify-center items-center gap-8 py-12" on:submit|preventDefault>
  <div class="w-full max-w-600 flex flex-row justify-center items-center gap-8 relative">
    <input
      type="text"
      class="input"
      aria-label="Textbox"
      placeholder="Do you have a moment?"
      style=" padding-right: 62px;"
      bind:this={EntryInput}
      bind:value={inputText}
      on:keydown={handleInputKeydown}
    />
    <div class="absolute bottom-4 right-4">
      <Button.Root
      class="btn btn-default"
      aria-labelledby="journal-form-submit-button"
      disabled={isCtaDisabled}
      on:click={() => {
        saveEntry();
        EntryInput.focus();
      }}>
      <ArrowUpIcon aria-hidden="true" />
      <span id="journal-form-submit-button" class="sr-only">Submit</span>
      </Button.Root>
    </div>
  </div>
</form>
