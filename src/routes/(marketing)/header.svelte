<script lang="ts">
	import { quadOut } from "svelte/easing";
	import { fade, fly } from "svelte/transition";
	import { Button, Dialog } from "bits-ui";
	import { MenuIcon, XIcon } from "lucide-svelte";
	import Logo from "$lib/components/Logo.svelte";

  const NavLinks = [
    {
      label: "Pricing",
      url: "/#"
    },
    {
      label: "Changelog",
      url: "/#"
    },
    {
      label: "About",
      url: "/#"
    },
    {
      label: "Try demo",
      url: "/demo"
    }
  ];
</script>


<header class="header">
  <div class="container">
    <div class="side">
      <div class="logo-wrapper">
        <Logo />
      </div>
    </div>
    <div class="side">
      <nav>
        <ul class="nav-list">
          {#each NavLinks as link}
            <li><a href={link.url} class="nav-link">{link.label}</a></li>
          {/each}
        </ul>
      </nav>
      <div class="cta">
        <Button.Root class="btn btn-default" href="/#">
          <span>Get early access</span>
        </Button.Root>
      </div>
      <div class="mobile-nav">
        <Dialog.Root>
          <Dialog.Trigger class="btn btn-ghost">
            <MenuIcon />
            <span class="sr-only">Open nav drawer</span>
          </Dialog.Trigger>

          <Dialog.Portal class="dialog-portal">
            <Dialog.Overlay
              class="dialog-overlay"
              transition={fade}
              transitionConfig={{ duration: 100, easing: quadOut }}
            />
            <Dialog.Content
              class="nav-drawer"
              transition={fly}
              transitionConfig={{ duration: 100, easing: quadOut, x: "100%", y: 0, opacity: 0 }}
            >
              <div class="close-button">
                <Dialog.Close class="btn btn-inverse">
                  <XIcon />
                  <span class="sr-only">Close nav drawer</span>
                </Dialog.Close>
              </div>
              <nav>
                <ul class="nav-list">
                  {#each NavLinks as link}
                    <li><a href={link.url} class="nav-link">{link.label}</a></li>
                  {/each}
                  <li>
                    <Button.Root class="btn btn-default">
                      <span>Get early access</span>
                    </Button.Root>
                  </li>
                </ul>
              </nav>
            </Dialog.Content>

          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    width: 100dvw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 24px;
    background-color: hsl(var(--clr-white));
    position: fixed;
    top: 0;

    & > .container {
      width: 100%;
      max-width: 960px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-block: 12px;

      & > .side {
        display: flex;
        flex-direction: row;
      }
    }
  }
  .side:is(:nth-child(1)) {
    justify-content: flex-start;
    align-items: center;
  }
  .side:is(:nth-last-child(1)) {
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }
  .logo-wrapper {
    width: 36px;
    height: 36px;
    color: hsl(var(--clr-primary-500));
  }
  .side > nav {
    display: none;

    & > .nav-list {
      list-style: none;
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    @media screen and (min-width: 600px) {
      display: block;
    }
  }
  .side > .cta {
    display: none;

    @media screen and (min-width: 480px) {
      display: block;
    }
  }
  .side > .mobile-nav {
    display: block;

    @media screen and (min-width: 600px) {
      display: none;
    }
  }

  :global(.cta > .btn) {
    cursor: pointer;
  }
  
  :global(.dialog-portal > .nav-drawer) {
    width: 100%;
    max-width: calc(100% - 48px);
    height: 100dvh;
    overflow-y: hidden;
    border-radius: 24px 0 0 24px;
    background-color: hsl(var(--clr-white));
    position: fixed;
    inset-block: 0;
    right: 0;
    z-index: 50;

    & .close-button {
      position: fixed;
      top: 12px;
      right: 24px;
    }

    & > nav {
      padding: 24px;
      padding-top: 96px;

      & > .nav-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

    }

    @media screen and (min-width: 400px) {
      max-width: 360px;
    }
  }
</style>

