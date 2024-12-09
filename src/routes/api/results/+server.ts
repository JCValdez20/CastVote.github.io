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

  // Define the winners object
  const winners: Record<string, { candidate: string; voteCount: number }> = {};

  // Determine the winner for each position
  for (const result of results) {
    if (
      !winners[result.position] || // No winner yet for this position
      winners[result.position].voteCount < result.voteCount // New candidate has more votes
    ) {
      winners[result.position] = {
        candidate: result.candidate,
        voteCount: result.voteCount,
      };
    }
  }

  return new Response(JSON.stringify(Object.values(winners)), {
    headers: { "Content-Type": "application/json" },
  });
}
