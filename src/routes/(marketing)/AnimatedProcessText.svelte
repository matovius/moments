<script lang="ts">
	import { onMount } from "svelte";

  let stepOne: HTMLElement;
  let stepTwo: HTMLElement;
  let stepThree: HTMLElement;

  function cycleSteps(step: number) {
    let nextStep: number;

    if (stepOne && stepTwo && stepThree) {
      if (step === 1) {
        stepOne.classList.add('glowing');
        nextStep = 2;
        setTimeout(() => {
          stepOne.classList.remove('glowing');
          cycleSteps(nextStep);
        }, 1000);
      } else if (step === 2) {
        stepTwo.classList.add('glowing');
        nextStep = 3;
        setTimeout(() => {
          stepTwo.classList.remove('glowing');
          cycleSteps(nextStep);
        }, 1000);
      } else if (step === 3) {
        stepThree.classList.add('glowing');
        nextStep = 1;
        setTimeout(() => {
          stepThree.classList.remove('glowing');
          cycleSteps(nextStep);
        }, 2000);
      }
    }
  }

  onMount(() => {
    console.log('Hello Moments!');
    setTimeout(() => {
      cycleSteps(1);
    }, 2000);
  });
</script>

<div class="steps">
  <h3
    class={`stepText`}
    bind:this={stepOne}
  >Tap...</h3>
  <h3
    class={`stepText`}
    bind:this={stepTwo}
  >Type...</h3>
  <h3
    class={`stepText`}
    bind:this={stepThree}
  >Go!</h3>
</div>

<style>
  .steps {
    width: 100%;
    padding-top: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    user-select: none;

    @media screen and (min-width: 600px) {
      flex-direction: row;
    }
  }

  .stepText {
    isolation: isolate;
    font-size: 60px;
    font-weight: 600;
    line-height: 1;
    color: hsl(var(--clr-neutral-200));
    position: relative;
    
    &.glowing {
      color: hsl(var(--clr-black));
    }

    @media (prefers-color-scheme: dark) {
      color: hsl(var(--clr-neutral-800));

      &.glowing {
        color: hsl(var(--clr-white));
        text-shadow: 0px 0px 16px hsl(var(--clr-white));
      }
    }
  }

</style>