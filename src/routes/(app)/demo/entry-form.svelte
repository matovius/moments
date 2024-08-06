<script lang="ts">
  import { browser } from "$app/environment";
	import { ArrowUpIcon, PlusIcon } from "lucide-svelte";
  import { type Entry } from "../types";
  import { AllEntries } from "../store";
	import { createEventDispatcher, onMount } from "svelte";

  let dispatch = createEventDispatcher<any>();
  let EntryInput: HTMLInputElement;
  let EntryTextArea: HTMLTextAreaElement;

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
    // EntryTextArea.style.height = "44px";
  }

  function resizeTextArea() {
    EntryTextArea.style.height = "44px";

    // This "100" should account for only about four rows of text
    if (EntryTextArea.scrollHeight > 100) {
      EntryTextArea.style.height = "100px";
    } else {
      EntryTextArea.style.height = `${EntryTextArea.scrollHeight}px`;
    }
  }

  function handleInputKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      saveEntry();
    }

    return;
  }
</script>

<form class="form" on:submit|preventDefault>
  <div class="container">
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

    <!-- <textarea
      name="entry-input"
      id="entry-input"
      class="input"
      style=" padding-right: 62px; border-radius: 20px; resize: none;"
      placeholder="Do you have a Moment?"
      bind:this={EntryTextArea}
      bind:value={inputText}
      on:input={resizeTextArea}
      on:keydown={handleInputKeydown}></textarea> -->

    <div class="submit-button">
      <button
      class="btn btn-default"
      aria-labelledby="journal-form-submit-button"
      disabled={isCtaDisabled}
      on:click={() => {
        saveEntry();
        EntryInput.focus();
      }}>
      <ArrowUpIcon aria-hidden="true" />
      <span id="journal-form-submit-button" class="sr-only">Submit</span>
      </button>
    </div>
        
  </div>
</form>

<style>
  .form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding-block: 12px;
    background: hsl(var(--clr-white));

    & > .container {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 8px;
      position: relative;
    }
  }

  .submit-button {
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
</style>

