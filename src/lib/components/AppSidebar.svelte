<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import AppSidebarNav from '$lib/components/AppSidebarNav.svelte';
</script>

<aside id="sidebar" class="w-240 isolate grid grid-flow-row grid-rows-[auto,1fr,auto]
  border-r border-solid border-neutral-200 dark:border-neutral-800">
  <header class="flex justify-start items-start px-24 pt-24">
    <div class="flex flex-row justify-start items-center gap-12">
      <a
        href="/demo"
        class="home-link text-neutral-800 dark:text-neutral-200 rounded-full
        outline-dashed outline-2 outline-transparent outline-offset-4
        hover:text-primary-500 focus:text-primary-500
        focus-visible:outline-primary-500"
        aria-labelledby="back-to-homepage-link">
        <div class="size-24 aspect-square">
          <Logo />
        </div>
        <span id="back-to-homepage-link" class="sr-only">Go to homepage</span>
      </a>

      <div id="page-title" class="text-[16px] font-extrabold text-neutral-600 dark:text-neutral-400" role="heading" aria-level="1">
        <span>Moments</span>
      </div>
    </div>
    
  </header>

  <main class="flex justify-start items-start px-24 pt-48 pb-12">
    <AppSidebarNav />
  </main>
</aside>
