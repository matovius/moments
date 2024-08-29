<script lang="ts">
  import { page } from "$app/stores";
  import Logo from "$lib/components/Logo.svelte";
	import { Button } from "bits-ui";
	import { BookOpenIcon, NotepadTextIcon, PlusIcon, SettingsIcon } from "lucide-svelte";

  type NavItem = {
    label: string;
    url: string;
    keyShortcut?: string;
  };

  const navList: NavItem[] = [
    {
      label: 'Journal',
      url: '/demo/journal',
      keyShortcut: 'Ctrl+J'
    },
    {
      label: 'Notepad',
      url: '/demo/notepad',
      keyShortcut: 'Ctrl+P'
    },
    {
      label: 'Settings',
      url: '/demo/settings',
      keyShortcut: 'Ctrl+T'
    },
  ]
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
    <nav id="app-navigation" class="w-full">
      <ul id="nav-list" class="w-full flex flex-col gap-4">
        <li>
          <Button.Root class="btn btn-primary w-full [--pad-x:24px] [--pad-y:12px]" aria-label="New entry" accesskey="Ctrl+N" title="New entry - Ctrl+N">
            <div class="w-full flex flex-row justify-start items-center gap-12">
              <PlusIcon aria-hidden="true" />
              <span aria-hidden="true">New entry</span>
            </div>
          </Button.Root>
        </li>

        <li>
          <Button.Root href="/demo/journal" class="btn {$page.url.pathname === '/demo/journal' ? 'btn-default' : 'btn-ghost'} w-full [--pad-x:24px] [--pad-y:12px]"
            aria-label="Journal" title="Journal - Ctrl+J">
            <div class="w-full flex flex-row justify-start items-center gap-12">
              <BookOpenIcon aria-hidden="true" />
              <span aria-hidden="true">Journal</span>
            </div>
          </Button.Root>
        </li>

        <li>
          <Button.Root href="/demo/notepad" class="btn {$page.url.pathname === '/demo/notepad' ? 'btn-default' : 'btn-ghost'} w-full [--pad-x:24px] [--pad-y:12px]"
            aria-label="Notepad" title="Notepad - Ctrl+P">
            <div class="w-full flex flex-row justify-start items-center gap-12">
              <NotepadTextIcon aria-hidden="true" />
              <span aria-hidden="true">Notepad</span>
            </div>
          </Button.Root>
        </li>

        <li>
          <Button.Root href="/demo/settings" class="btn {$page.url.pathname === '/demo/settings' ? 'btn-default' : 'btn-ghost'} w-full [--pad-x:24px] [--pad-y:12px]"
            aria-label="Settings" title="Settings - Ctrl+T">
            <div class="w-full flex flex-row justify-start items-center gap-12">
              <SettingsIcon aria-hidden="true" />
              <span aria-hidden="true">Settings</span>
            </div>
          </Button.Root>
        </li>

      </ul>
    </nav>

  </main>
</aside>
