<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
	import { Button } from "bits-ui";
	import { BookOpenIcon, NotepadTextIcon, UserCircleIcon } from "lucide-svelte";
</script>

<div id="app" class="w-screen h-screen grid grid-flow-col grid-cols-[auto,1fr] overflow-hidden">
  <aside id="sidebar" class="w-[300px] isolate grid grid-flow-row grid-rows-[auto,1fr,auto]
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

    <main class="flex justify-center items-center px-24">
      <nav id="app-navigation" class="w-full">
        <ul id="nav-list" class="w-full flex flex-col gap-4">
          <li>
            <Button.Root href="/demo/journal" class="btn btn-ghost w-full [--pad-x:24px] [--pad-y:12px]">
              <div class="w-full flex flex-row justify-start items-center gap-12">
                <BookOpenIcon aria-hidden="true" />
                <span>Journal</span>
              </div>
            </Button.Root>
          </li>
          <li>
            <Button.Root href="/demo/notepad" class="btn btn-ghost w-full [--pad-x:24px] [--pad-y:12px]">
              <div class="w-full flex flex-row justify-start items-center gap-12">
                <NotepadTextIcon aria-hidden="true" />
                <span>Notepad</span>
              </div>
            </Button.Root>
          </li>
        </ul>
      </nav>
    </main>

    <footer class="flex justify-center items-center px-24 pb-12">
      <Button.Root class="btn btn-ghost w-full [--pad-x:24px] [--pad-y:12px]">
        <div class="w-full flex flex-row justify-start items-center gap-12">
          <UserCircleIcon aria-hidden="true" />
          <span>Account</span>
        </div>
      </Button.Root>
    </footer>
  </aside>

  <div class="isolate flex flex-col overflow-hidden">
    <slot />
  </div>
</div>
