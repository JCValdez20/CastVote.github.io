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

<div class="body">
    <div class="page-container">
        <div class="results-container">
            <h1>🎉 Results 🎉</h1>
            {#each results as result}
                <div class="result-card">
                    <div class="hehe">
                        <h2>{result.position}</h2>
                    </div>
                    <p>
                        Winner: <strong>{result.candidate}</strong>
                        <span class="trophy-icon">🏆</span>
                        with {result.voteCount} votes
                    </p>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* Page background */
    .body {
        background-color: #fffde7; /* Soft yellow for a celebratory feel */
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    /* Outer container styling */
    .page-container {
        background: #ffffff; /* White background for contrast */
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Box shadow for depth */
        padding: 30px;
        max-width: 700px;
        width: 90%;
    }

    /* General container styling */
    .results-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: "Roboto", sans-serif;
        text-align: center;
    }

    /* Styling for the main title */
    h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #4caf50; /* Festive green */
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }

    /* Styling for each result card */
    .result-card {
        background: linear-gradient(135deg, #ffcc80, #ffab91); /* Warm gradient */
        padding: 15px;
        margin: 15px 0;
        border-radius: 10px;
        color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .result-card:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    /* Styling for position titles */
    h2 {
        font-size: 1.8rem;
        color: #ffffff; /* Bright white */
        margin: 0 0 10px;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    }

    /* Styling for winner details */
    p {
        font-size: 1.2rem;
        color: #212121; /* Dark text for contrast */
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center; /* Center-align text */
    }

    /* Styling for the trophy icon */
    .trophy-icon {
        font-size: 1.5rem;
        margin-left: 8px;
        color: #ffd700; /* Bright gold for the trophy */
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    }

    /* Highlighting the winner's name */
    p strong {
        color: #fd0404; /* Bold orange for emphasis */
        font-weight: bold;
        margin-right: 5px;
    }
</style>
