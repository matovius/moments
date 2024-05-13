<script lang="ts">
</script>

<div class="app">
  <slot />
</div>

<style>
  .app {
    isolation: isolate;
    width: 100dvw;
    height: 100dvh;
    overflow: hidden;
  }
</style>