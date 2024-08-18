<script lang="ts">
  import { Button } from 'bits-ui';
</script>

<main class="w-full max-w-full pb-48">
  <section id="hero" class="hero-section pb-96">
    <div id="container">
      <h1 class="h-display text-center text-neutral-950 dark:text-white">
        Capture your
        <span class="text-primary-500">thoughts</span>
      </h1>
      <p class="p text-center max-w-600">
        Moments helps you keep track of your daily happenings
        and make sure you don't forget stuff.
      </p>
      <div class="flex flex-col justify-center items-center gap-24">
        <Button.Root
          href="/waitlist"
          class="btn btn-primary"
          style="--pad-x: 48px; --pad-y: 12px;"
        >
          <span>Join the waitlist</span>
        </Button.Root>
        <p class="p">or <a href="/demo" class="link text-center">try out the demo first</a></p>
      </div>
    </div>
  </section>
  
  <section id="features" class="features-section">
    <div id="container">
      <div class="feature">
        <div class="content">
          <h3 class="h-md">Simplified<br />interface</h3>
          <p class="p">
            Put down your thoughts in the simplest and fastest way possible without any extra steps or hinderances.
            Don't worry about formatting or structure.
          </p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-md">Text and<br />audio entries</h3>
          <p class="p">
            No images or videos, no documents or files. Just simple text and audio.
            And if you're a premium user, you can get audio transcripts.
          </p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-md">Footnotes<br />and tags</h3>
          <p class="p">
            Add footnotes to issue clarifications or add greater context to an entry.
            And for better organization, add tags to your entries according to your liking.
          </p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-md">Journaling<br />reminders</h3>
          <p class="p">
            You can set reminders for when you want to get reminded to add to your journal.
            These reminders can help you get into the habit of journaling.
          </p>
        </div>
        <div class="img-wrapper"></div>
      </div>
    </div>
  </section>

  <section id="waitlist" class="waitlist-section">
    <div id="container">
      <div class="w-full px-24 py-48 rounded-24 bg-primary-500">
        <h4 class="h-md text-white text-center selection:bg-neutral-950">Ready to change your life?</h4>
        <div
          class="w-full flex flex-col justify-center items-center gap-12 pt-24 480:flex-row"
        >
          <Button.Root
            href="/waitlist"
            class="btn btn-default"
            style="--pad-x: 24px; --pad-y: 12px;"
          >Join the waitlist</Button.Root>
        </div>
      </div>
    </div>
  </section>

</main>

<style lang="postcss">
  section {
    @apply flex justify-center items-center px-24;

    & > #container {
      @apply w-full max-w-960 flex flex-col justify-center items-center gap-48 pt-96;
    }
  }

  .feature {
    @apply w-full flex flex-col gap-24 600:flex-row 600:even:flex-row-reverse pt-48;

    & > .content p {
      @apply pt-24;
    }

    & > .img-wrapper {
      @apply w-full max-w-360 aspect-video rounded-12 bg-neutral-50 dark:bg-neutral-800;
    }
  }
</style>
