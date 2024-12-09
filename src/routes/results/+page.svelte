<script>
    import { onMount } from "svelte";

    /**
	 * @type {any[]}
	 */
    let results = [];

    onMount(async () => {
        const res = await fetch("/api/results");
        results = await res.json();
    });
</script>

<div>
    <h1>Results</h1>
    {#each results as result}
        <div>
            <h2>{result.position}</h2>
            <p>Winner: {result.candidate} with {result.voteCount} votes</p>
        </div>
    {/each}
</div>
