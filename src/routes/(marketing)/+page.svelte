<script lang="ts">
  import { Button } from 'bits-ui';
  import Header from './header.svelte';
</script>

<svelte:head>
  <title>Moments - Capture your thoughts</title>
</svelte:head>

<Header />

<main class="main">
  <section id="hero-section" class="hero">
    <div class="container">
      <h1 class="h-display">
        Capture your
        <span style="color: hsl(var(--clr-primary-500));">thoughts</span>
      </h1>
      <div class="cta">
        <Button.Root
          href="/#"
          class="btn btn-primary"
          style="--pad-x: 24px; --pad-y: 12px;"
        >
          <span>Get early access</span>
        </Button.Root>
        <Button.Root
          href="/demo"
          class="btn btn-outlined"
          style="--pad-x: 24px; --pad-y: 12px;"
        >
          <span>Try the demo</span>
        </Button.Root>
      </div>
      <div class="img-wrapper"></div>
    </div>
  </section>
  <section id="features-section" class="features">
    <div class="container">
      <div class="feature">
        <div class="content">
          <h3 class="h-lg">Take notes like you were texting someone</h3>
          <p class="p">Be more natural and less structured, and allow yourself to put down whatever is on your mind.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-lg">Expand your notes with rich media</h3>
          <p class="p">Add images, videos and file attachments to give greater context to your notes, making them more comprehensive.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-lg">Make journals and tags for better organization</h3>
          <p class="p">Encapsulate related entries into journals, and connect multiple entries using tags and references.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-lg">
            Use
            <span style="color: hsl(var(--clr-primary-500));">Zen Mode</span>
            for fewer distractions
          </h3>
          <p class="p">Want to write something in greater details with fewer distractions? Enter Zen Mode and type away.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
    </div>
  </section>
  <section id="call-to-action" class="call-to-action">
    <div class="container">
      <div class="card">
        <h2 class="h-xl">Ready to change your life?</h2>
        <div class="cta">
          <Button.Root
            href="/#"
            class="btn btn-default"
            style="--pad-x: 24px; --pad-y: 12px;"
          >
            <span>Get early access</span>
          </Button.Root>
          <Button.Root
            href="/demo"
            class="btn btn-inverse"
            style="--pad-x: 24px; --pad-y: 12px;"
          >
            <span>Try the demo</span>
          </Button.Root>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="copyright-statement">
    <small class="small">Copyright 2024 - Moments - All rights reserved.</small>
  </div>
</footer>


<style>
  .main {
    padding-bottom: 48px;

    & > section {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-inline: 24px;

      & > .container {
        width: 100%;
        max-width: 960px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 48px;
        padding-top: 96px;
      }
    }
  }

  .hero h1 {
    text-align: center;
    color: hsl(var(--clr-neutral-950));
  }
  .hero .cta {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media screen and (min-width: 480px) {
      flex-direction: row;
    }
  }
  .hero .img-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 1px solid hsl(var(--clr-neutral-200));
    border-radius: 12px;
    background-color: hsl(var(--clr-neutral-50));
  }

  .feature {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    & > .content p {
      padding-top: 24px;
    }

    & > .img-wrapper {
      width: 100%;
      max-width: 360px;
      height: auto;
      aspect-ratio: 16 / 9;
      border: 1px solid hsl(var(--clr-neutral-200));
      border-radius: 12px;
      background-color: hsl(var(--clr-neutral-50));

      @media screen and (min-width: 600px) {
        min-width: 360px;
      }
    }

    @media screen and (min-width: 600px) {
      flex-direction: row;

      &:is(:nth-child(2n)) {
        flex-direction: row-reverse;
      }
    }
  }

  .call-to-action .card {
    padding: 24px;
    border-radius: 24px;
    background: hsl(var(--clr-primary-500));

    & > .h-xl {
      color: hsl(var(--clr-white));
      text-align: center;

      &::selection {
        color: hsl(var(--clr-white));
        background-color: hsl(var(--clr-neutral-950));
      }
    }

    & > .cta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      padding-top: 24px;

      @media screen and (min-width: 480px) {
        flex-direction: row;
      }
    }
  }

  .footer {
    padding-inline: 24px;
    padding-block: 48px;
    border-top: 1px solid hsl(var(--clr-neutral-200));

    & > .copyright-statement {
      color: hsl(var(--clr-neutral-600));
      text-align: center;
    }
  }
</style>
