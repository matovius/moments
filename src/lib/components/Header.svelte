<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
	import { DropdownMenu } from "bits-ui";
	import { EllipsisVerticalIcon } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<any>();

  function clearMoments() {
    dispatch("clearmoments");
  }
</script>

<header class="header">
  <div class="container">
    <div class="corner leftCorner">
      <div class="logoWrapper">
        <Logo />
      </div>
    </div>

    <div class="corner rightCorner">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="button ghost account" style="--pad-y: 12px" title="More options">
          <EllipsisVerticalIcon />
          <span class="sr-only">More options</span>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content class="dropdown more-options" align="end">
          <DropdownMenu.Group>
            <DropdownMenu.Item class="button ghost clear-moments">
              <span>About</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item class="button ghost clear-moments">
              <span>Export</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator class="separator" />

          <DropdownMenu.Group>
            <DropdownMenu.Item class="button ghost clear-moments" on:click={clearMoments}>
              <span>Clear Moments</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>
</header>

<style>
  .header {
    isolation: isolate;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 12px;

    & > .container {
      width: 100%;
      max-width: 1200px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-block: 12px;
    }
  }

  .leftCorner {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 24px;

    & > .logoWrapper {
      width: 36px;
      height: 36px;
      aspect-ratio: 1;
    }
  }

  .rightCorner {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  :global(.dropdown) {
    border-radius: 24px;
  }

  :global(.dropdown .separator) {
    width: 100%;
    height: 1px;
    background: hsl(var(--clr-neutral-200));
    margin-block: 8px;

    @media (prefers-color-scheme: dark) {
      background: hsl(var(--clr-neutral-800));
    }
  }

  :global(.dropdown.more-options) {
    color-scheme: light;
    color: hsl(var(--clr-neutral-950));
    width: 240px;
    padding: 8px;
    border: 1px solid;
    border-color: hsl(var(--clr-neutral-200));
    background: hsl(var(--clr-white));

    @media (prefers-color-scheme: dark) {
      color-scheme: dark;
      color: hsl(var(--clr-neutral-50));
      border-color: hsl(var(--clr-neutral-800));
      background: hsl(var(--clr-neutral-950));
    }
}
</style>