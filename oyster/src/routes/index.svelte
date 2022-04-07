<script>
	import { onMount } from "svelte";
	import Auth from "../lib/Auth.svelte";
	import Table from "../lib/Table.svelte";
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js"></script>
</svelte:head>

<div class="container p-10">
	<h1 class="text-blueish text-4xl font-bold flex justify-center">
		chelsea
	</h1>
	<Auth />
	<Table />
</div>
