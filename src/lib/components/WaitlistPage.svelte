<script lang="ts">
	import { enhance } from "$app/forms";
  import { Button, Checkbox, Label } from 'bits-ui';
	import { CheckIcon } from "lucide-svelte";
	import { scale } from "svelte/transition";
	import { quadOut } from "svelte/easing";

  interface FormData {
    email: string;
    name: string;
    allowEmailUpdates: boolean;
  }

  let EmailInput: HTMLInputElement;
  let emailErrorMessage: string = '';

  let formData: FormData = {
    email: '',
    name: '',
    allowEmailUpdates: false,
  }
  let isCtaDisabled: boolean = true;

  function validateEmail() {
    let inputValidity = EmailInput.validity;

    if (inputValidity.valueMissing) {
      emailErrorMessage = "Please enter an email address";
      EmailInput.setCustomValidity(emailErrorMessage);
    } else if (!EmailInput.checkValidity()) {
      emailErrorMessage = "Please enter a valid email address in the format email@example.com";
      EmailInput.setCustomValidity(emailErrorMessage);
    } else {
      emailErrorMessage = '';
      EmailInput.setCustomValidity(emailErrorMessage);
    }
  }
</script>

<main class="w-full max-w-full min-h-screen pb-48">
  <section id="hero" class="flex justify-center items-center px-24 py-96">
    <div id="container" class="w-full max-w-960 flex flex-col justify-center items-center gap-48">
      <h1 class="h-lg text-center text-neutral-950 dark:text-white">
        Join the waitlist, and get super-early access
      </h1>
      <p class="p text-center max-w-600">
        While Moments is pre-alpha, we want to have users like you propel us forward
        and build the product that <strong>you</strong> want the most. If you want to be a part
        of this super early community and dictate our future, join in below.
      </p>
    </div>
  </section>

  <section id="waitlist-form" class="flex justify-center items-center px-24 pb-96">
    <h2 class="h-xs text-center sr-only">The waitlist</h2>

    <div id="container" class="w-full max-w-960 flex flex-col justify-center items-center gap-48">
      <form
        method="post" use:enhance
        class="w-full flex flex-col justify-center items-center gap-24"
        on:submit|preventDefault
      >
        <label for="email" class="w-full max-w-600 grid grid-flow-row gap-12">
          <span class="p">Enter your email address</span>
          <input type="email" id="email" name="email" class="input"
            placeholder="email@example.com" required
            bind:this={EmailInput} bind:value={formData.email}
          />
          {#if emailErrorMessage !== '' && emailErrorMessage.length > 0}
            <span class="small text-danger-500" role="alert" id="email-error" aria-live="polite">{emailErrorMessage}</span>
          {/if}
        </label>
        
        <div class="w-full max-w-600 flex flex-row justify-start items-center gap-12">
          <Checkbox.Root
            id="allow-email-updates-checkbox"
            aria-label="Get product updates in your inbox (optional)"
            class="text-white size-fit p-4 inline-flex justify-center items-center rounded-full
            border border-neutral-200 dark:border-neutral-800 bg-transparent
            outline outline-2 outline-transparent outline-offset-2
            focus-visible:outline-black dark:focus-visible:outline-white
            data-[state=checked]:border-transparent data-[state=checked]:bg-primary-500
            data-[state=checked]:hover:bg-primary-700"
            on:click={() => { formData.allowEmailUpdates === true ? false : true; }}
            bind:checked={formData.allowEmailUpdates}>
            <Checkbox.Indicator class="size-16">
              {#if formData.allowEmailUpdates}
                <div class="size-fit" transition:scale={{ duration: 100, easing: quadOut, start: 0.95, opacity: 0 }}>
                  <CheckIcon size="16" />
                </div>
              {/if}
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Label.Root id="allow-email-updates-label" for="allow-email-updates-checkbox" class="flex flex-col">
            <p class="p">Get product updates straight to your inbox (optional)</p>
            <small class="small text-neutral-600 dark:text-neutral-400">
              You will still get an email when the aplha is published or when you need to take actions
            </small>
          </Label.Root>
        </div>
        <div class="w-full max-w-600">
          <Button.Root
            class="btn btn-primary"
            style="--pad-x: 48px; --pad-y: 12px;"
          >Join the waitlist</Button.Root>
        </div>
      </form>
    </div>
  </section>
</main>


