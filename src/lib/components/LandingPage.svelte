<script lang="ts">
  import { Button } from 'bits-ui';
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<any>();

  function closeLanding() {
    dispatch("close");
  }
</script>

<div class="w-full max-w-full pb-48">
  <section id="hero-section" class="hero">
    <div id="container">
      <h1 class="h-display text-center text-neutral-950 dark:text-white">
        Capture your
        <span class="text-primary-500">thoughts</span>
      </h1>
      <h5 class="h-xs text-center text-neutral-600 dark:text-neutral-400 max-w-600">
        Moments helps you keep track of your daily happenings
        and make sure you don't forget stuff.
      </h5>
      <div class="flex flex-col 480:flex-row gap-12">
        <Button.Root
          class="btn btn-primary"
          style="--pad-x: 48px; --pad-y: 12px;"
          on:click={closeLanding}
        >
          <span>Open the demo</span>
        </Button.Root>
      </div>
    </div>
  </section>
  
  <!-- <section id="features-section" class="features">
    <div id="container">
      <div class="feature">
        <div class="content">
          <h3 class="h-lg">Take notes like you're texting someone</h3>
          <p class="p">Be more natural and less structured, and allow yourself to put down whatever is on your mind.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-lg">Expand your notes with rich media</h3>
          <p class="p">Add audio notes, images, videos and file attachments to give greater context to your notes, making them more comprehensive.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature" style="display: none;">
        <div class="content">
          <h3 class="h-lg">Create journals for better organization</h3>
          <p class="p">Encapsulate related entries into journals, and and handle multiple aspects of your life at once.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
      <div class="feature">
        <div class="content">
          <h3 class="h-lg">
            Use
            <span class="text-primary-500">Zen Mode</span>
            for fewer distractions
          </h3>
          <p class="p">Want to write something in greater details with fewer distractions? Enter Zen Mode and type away.</p>
        </div>
        <div class="img-wrapper"></div>
      </div>
    </div>
  </section> -->

  <!-- <section id="call-to-action" class="call-to-action">
    <div id="container">
      <div class="p-24 rounded-24 bg-primary-500">
        <h2 class="h-xl text-white text-center selection:bg-neutral-950">Ready to change your life?</h2>
        <div class="flex flex-col justify-center items-center gap-12 pt-24 480:flex-row">
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
  </section> -->

</div>

<!-- <footer class="px-24 py-48 border-t border-solid border-neutral-200">
  <div class="text-neutral-600 text-center">
    <small class="small">Copyright {new Date().getFullYear() | 2024} - Moments - All rights reserved.</small>
  </div>
</footer> -->


<style lang="postcss">
  section {
    @apply flex justify-center items-center px-24;

    & > #container {
      @apply w-full max-w-960 flex flex-col justify-center items-center gap-48 pt-96;
    }
  }

  /* .feature {
    @apply w-full flex flex-col gap-24 600:flex-row 600:even:flex-row-reverse;

    & > .content p {
      @apply pt-24;
    }

    & > .img-wrapper {
      @apply w-full max-w-360 aspect-video border border-solid border-neutral-200 rounded-12 bg-neutral-50;
    }
  } */
</style>
