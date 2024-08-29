<script lang="ts">
  import { page } from "$app/stores";
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
