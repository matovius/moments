<script lang="ts">
  import { browser } from "$app/environment";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import dayjs from "dayjs";
	import { quadInOut, quadOut, quintIn } from "svelte/easing";
	import { fade, fly, scale } from "svelte/transition";
	import { ArrowDownIcon, ArrowUpIcon, PlusIcon, XIcon } from "lucide-svelte";
  import { type Moment } from "./types";
	import { AllMoments, HeaderHeight } from "./store";
	import { Button, Dialog } from "bits-ui";

  export let moment: Moment;
  export let index: number;

  let dispatch = createEventDispatcher();

  function openEntry() {
    dispatch("open-entry", { moment: moment, index: index })
  }
</script>

<Button.Root
  class="entry"
  id={`moment-${moment.timestamp}`}
  data-id={moment.timestamp}
  data-index={index}
  on:click={openEntry}
>
  <p class="p">{moment.text}</p>
</Button.Root>

<style>
  :global(.entry) {
    font: inherit;
    text-align: start;
    width: 100%;
    max-width: 600px;
    background: transparent;
    padding: 24px;
    border: none;
    border-radius: 12px;
    position: relative;

    &:is(:hover, :focus) {
      background: hsl(var(--clr-neutral-100));
    }
  }
</style>
