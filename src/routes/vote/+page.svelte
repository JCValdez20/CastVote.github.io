<script lang="ts">
    // Define the type for `votes`
    type Votes = Record<string, string>; // Object where keys are strings (position names) and values are strings (selected candidate)

    // Initialize the `votes` object with an appropriate type
    let votes: Votes = {};

    // Example positions data
    let positions = [
        { name: "President", candidates: ["Alice", "Bob"] },
        { name: "Vice President", candidates: ["Charlie", "Dana"] },
        { name: "Secretary", candidates: ["Eve", "Frank"] },
        { name: "Treasurer", candidates: ["Grace", "Henry"] },
        { name: "Auditor", candidates: ["Ivy", "Jack"] },
    ];

    let studentId = ""; // Placeholder for the student's ID
    let responseMessage = ""; // To store the server's response message

    // Function to submit votes
    const submitVotes = async () => {
        if (!studentId) {
            responseMessage = "Student ID is required.";
            return;
        }

        const res = await fetch("/api/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId, votes }),
        });

        const data = await res.json();
        if (res.ok) {
            responseMessage = "Your votes have been submitted successfully!";
        } else {
            responseMessage = data.error || "An error occurred.";
        }
    };
</script>

<!-- Input for Student ID -->
 <div>
    <h3>CastVote</h3>
 </div>
<div>
    <label>
        Student ID:
        <input type="text" bind:value={studentId} />
    </label>
</div>

<!-- Render positions and candidates -->
{#each positions as position}
    <div>
        <h3>{position.name}</h3>
        {#each position.candidates as candidate}
            <label>
                <input
                    type="radio"
                    bind:group={votes[position.name]} 
                    value={candidate}
                />
                {candidate}
            </label>
        {/each}
    </div>
{/each}

<!-- Submit button -->
<div>
    <button on:click={submitVotes}>Submit Votes</button>
</div>

<!-- Display the response message -->
{#if responseMessage}
    <p>{responseMessage}</p>
{/if}
