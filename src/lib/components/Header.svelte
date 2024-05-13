<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
</script>

<header class="header">
  <div class="container">
    <div class="corner leftCorner">
      <div class="logoWrapper">
        <Logo />
      </div>
    </div>
    <div class="corner rightCorner">
      <a href="/demo" class="button solid cta">
        <span>Open demo</span>
      </a>
    </div>
  </div>
</header>

<style>
  .header {
    color-scheme: light;
    isolation: isolate;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 12px;
    background: hsl(var(--clr-white));
    position: sticky;
    top: 0;
    z-index: 1000;

    @media (prefers-color-scheme: dark) {
      color-scheme: dark;
      background: hsl(var(--clr-neutral-950));
    }

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
</style>