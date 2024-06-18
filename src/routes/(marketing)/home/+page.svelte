<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import AnimatedProcessText from "../AnimatedProcessText.svelte";
	import WaitlistForm from "../WaitlistForm.svelte";
</script>

<svelte:head>
  <title>Moments</title>
</svelte:head>

<Header />

<main class="main">
  <section class="hero">
    <div class="container">
      <h1 class="heading">The simplest way to put down your thoughts</h1>
      <div class="cta">
        <a href="/demo" class="button solid">
          <span>Open the demo</span>
        </a>
      </div>
    </div>
  </section>
  <section class="process">
    <div class="container">
      <h2 class="heading">A process as simple as:</h2>
      <AnimatedProcessText />
      <p class="explanation">
        Just tap the text box, type what's on your mind,
        press enter, and BOOM! Done.
      </p>
    </div>
  </section>
  <section class="waitlist">
    <div class="container">
      <h2 class="heading">
        If you're interested in seeing the full product, be sure to join the waitlist
      </h2>
      <WaitlistForm />
    </div>
  </section>
</main>

<footer class="footer">
  <div class="container">
    <small class="attribution">
      2024 - Under construction by Martin Matovu
    </small>
    <div></div>
  </div>
</footer>


<style>
  .main {
    width: 100%;
    padding-inline: 12px;

    & > section {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      & > .container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
  
  .hero {
    padding-block: 120px 60px;

    & .heading {
      width: 100%;
      font-size: 60px;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      max-width: 720px;
    }

    & .cta {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 48px;

      & > .button {
        padding-inline: 48px;
        padding-block: 12px;
      }
    }
  }

  .process {
    & .heading {
      font-size: 36px;
      font-weight: 600;
      line-height: 1.2;
      color: hsl(var(--clr-neutral-600));
      text-align: center;
      width: 100%;

      @media (prefers-color-scheme: dark) {
        color: hsl(var(--clr-neutral-400));
      }
    }

    & .explanation {
      text-align: center;
      width: 100%;
      max-width: 600px;
      padding-top: 48px;
    }
  }

  .waitlist {
    padding-block: 96px 48px;

    & .heading {
      font-size: 36px;
      font-weight: 600;
      line-height: 1.2;
      color: hsl(var(--clr-neutral-600));
      text-align: center;
      width: 100%;
      max-width: 600px;

      @media (prefers-color-scheme: dark) {
        color: hsl(var(--clr-neutral-400));
      }
    }
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 12px;
    border-top: 1px solid hsl(var(--clr-neutral-100));

    @media (prefers-color-scheme: dark) {
      border-color: hsl(var(--clr-neutral-900));
    }
    
    & > .container {
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      padding-block: 24px;

      & > .attribution {
        font-size: 12px;
        text-align: center;
        color: hsl(var(--clr-neutral-400));

        @media (prefers-color-scheme: dark) {
          color: hsl(var(--clr-neutral-600));
        }
      }
    }
  }
</style>
