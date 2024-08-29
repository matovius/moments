<script lang="ts">
  import AppSidebar from '$lib/components/AppSidebar.svelte';
</script>

<div id="app" class="w-screen h-screen flex justify-center items-center overflow-hidden">
  <div id="container" class="w-full max-w-1200 h-full grid grid-flow-col grid-cols-[auto,1fr] 1200:border-x border-neutral-200 dark:border-neutral-800">
    <AppSidebar />  

  <div class="isolate flex flex-col overflow-hidden">
    <slot />
  </div>
</div>
