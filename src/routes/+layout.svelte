<script lang="ts">
  import '@fontsource-variable/recursive';
  import '../app.css';
	import Header from '$lib/components/Header.svelte';
  import { AllMoments } from './store';

  function clearMoments() {
    AllMoments.set([]);
  }
</script>

<div class="app">
  <Header on:clearmoments={clearMoments} />
  <slot />
</div>

<style>
  .app {
    width: 100dvw;
    max-width: 100dvw;
    height: 100dvh;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
</style>