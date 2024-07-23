<script lang="ts">
	import Logo from "$lib/components/Logo.svelte";
	import { Button } from "bits-ui";
	import { MenuIcon } from "lucide-svelte";

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
        <Button.Root class="btn btn-ghost">
          <MenuIcon />
          <span class="sr-only">Open nav drawer</span>
        </Button.Root>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 24px;
    background-color: hsl(var(--clr-white));
    position: sticky;
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
</style>

