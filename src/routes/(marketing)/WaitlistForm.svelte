<script lang="ts">
	import { ArrowRight } from "lucide-svelte";

</script>

<form action="POST" class="form" on:submit|preventDefault>
  <input type="email" class="input emailInput" placeholder="youremail@example.com" />
  <button class="button solid submit">
    <ArrowRight />
  </button>
</form>

<style>
  .form {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding-top: 24px;

    & > .emailInput {
      max-width: 480px;
    }

    & > .submit {
      padding-block: 12px;
      padding-inline: 12px;
    }
  }
</style>