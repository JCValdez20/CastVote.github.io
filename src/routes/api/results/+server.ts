import { db } from "$lib/server/db"; // Your database connection
import { votes } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  // Fetch aggregated results for each position and candidate
  const results = db
    .select({
      position: votes.position,
      candidate: votes.candidate,
      voteCount: sql<number>`COUNT(*)`, // Use raw SQL for the count
    })
    .from(votes)
    .groupBy(votes.position, votes.candidate)
    .all(); // Fetch all results

  // Define an array to hold the winners
  const winners: Array<{
    position: string;
    candidate: string;
    voteCount: number;
  }> = [];

  // Determine the winner for each position
  const winnerMap: Record<string, { candidate: string; voteCount: number }> = {};

  for (const result of results) {
    if (
      !winnerMap[result.position] || // No winner yet for this position
      winnerMap[result.position].voteCount < result.voteCount // New candidate has more votes
    ) {
      winnerMap[result.position] = {
        candidate: result.candidate,
        voteCount: result.voteCount,
      };
    }
  }

  // Convert winnerMap to an array of objects
  for (const [position, winner] of Object.entries(winnerMap)) {
    winners.push({ position, candidate: winner.candidate, voteCount: winner.voteCount });
  }

  return new Response(JSON.stringify(winners), {
    headers: { "Content-Type": "application/json" },
  });
}
