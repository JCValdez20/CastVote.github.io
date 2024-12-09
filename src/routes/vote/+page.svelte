<script lang="ts">
    import { goto } from "$app/navigation"

    const redirectToResults = () => {
        goto("/results");
    };
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
<div class="body">
    <div class="vote-container">
      <h2>🗳️ Cast Your Vote <button on:click={redirectToResults} class="results-button">View Results</button></h2>
      <div class="student-id">
        <label>
          Student ID:
          <input type="text" bind:value={studentId} placeholder="Enter your Student ID" />
        </label>
      </div>
      {#if responseMessage}
      <p class="response-message">{responseMessage}</p>
    {/if}
  
      {#each positions as position}
        <div class="position">
          <h3>{position.name}</h3>
          {#each position.candidates as candidate}
            <label class="candidate">
              <input type="radio" bind:group={votes[position.name]} value={candidate} />
              {candidate}
            </label>
          {/each}
        </div>
      {/each}
  
      <button on:click={submitVotes}>Submit Votes</button>
      
  
     
    </div>
  </div>
  
  <style>
    .body {
      font-family: "Roboto", sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #ffecd2, #fcb69f);
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #fffde7;
    }
  
    .vote-container {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      max-width: 700px;
      width: 100%;
      padding: 20px 30px;
      animation: fadeIn 0.8s ease-in-out;
    }
  
    h2 {
      font-size: 2.5rem;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      color: #000000; /* Bright orange for heading */
    }
  
    .student-id label {
      font-size: 1rem;
      display: block;
      margin-bottom: 15px;
      font-weight: bold;
    }
  
    input[type="text"] {
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #f77f00;
      border-radius: 8px;
      margin-top: 8px;
    }
  
    .position {
      margin-bottom: 20px;
    }
  
    h3 {
      font-size: 1.4rem;
      color: #d32020;
      margin-bottom: 10px;
      font-weight: bold;
    }
  
    .candidate {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      font-size: 1rem;
    }
  
    input[type="radio"] {
      margin-right: 10px;
    }
  
    button {
      background: linear-gradient(90deg, #f77f00, #ffba08);
      color: white;
      border: none;
      padding: 12px 20px;
      font-size: 1rem;
      border-radius: 10px;
      cursor: pointer;
      width: 100%;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      font-weight: bold;
    }
  
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(247, 127, 0, 0.3);
    }
  
    .response-message {
      margin-top: 20px;
      padding: 10px;
      border-radius: 8px;
      background: #ffe8cc;
      border: 1px solid #f77f00;
      color: #f77f00;
      text-align: center;
      font-size: 0.95rem;
    }
  
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
  