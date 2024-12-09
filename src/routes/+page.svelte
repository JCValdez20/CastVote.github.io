<script>
    import { goto } from "$app/navigation"; // For programmatic navigation

    // Function to redirect to the /vote page
    const redirectToVote = () => {
        goto("/vote");
    };
</script>

<div class="body">
    <div class="welcome-container">
        <h1>Welcome to the CastVote</h1>
        <p>Make your voice heard! Click below to cast your vote.</p>
        
        <button on:click={redirectToVote}>Start Voting</button>
        
    </div>
</div>

<style>
    .body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #ffecd2, #fcb69f); /* Warm gradient */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        color: #333;
    }

    .welcome-container {
        text-align: center;
        background: #fff;
        padding: 30px 20px;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        animation: fadeIn 0.8s ease-in-out;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #030303; /* Warm color for the header */
        font-weight: bold;
    }

    p {
        font-size: 1.2rem;
        color: #555;
        margin-bottom: 30px;
    }

    button {
        background: linear-gradient(90deg, #ff6f61, #ffd700); /* Gradient button */
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        font-weight: bold;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(255, 111, 97, 0.3);
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
