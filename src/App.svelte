<script>
  import { onMount } from 'svelte';
  import Button from '@material-ui/core/Button';

  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<main>
  <h1>Hello Svelte + Material UI!</h1>
  <p>Count: {count}</p>
  <Button variant="contained" color="primary" on:click={increment}>
    Increment
  </Button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 2em;
  }

  p {
    font-size: 1.2em;
  }
</style>
