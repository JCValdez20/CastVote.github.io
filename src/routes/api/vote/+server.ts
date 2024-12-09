import { db } from "$lib/server/db"; // Your database connection
import { votes, students } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST({ request }: { request: Request }) {
  try {
    const { studentId, votes: submittedVotes } = await request.json();

    // Check if the student has already voted
    const alreadyVoted = await db
      .select()
      .from(students)
      .where(eq(students.studentId, studentId))
      .get();

    if (alreadyVoted) {
      return new Response(JSON.stringify({ error: "You have already voted!" }), {
        status: 400,
      });
    }

    // Insert votes into the database
    for (const position in submittedVotes) {
      await db.insert(votes).values({
        studentId,
        position,
        candidate: submittedVotes[position],
      }).run();
    }

    // Mark the student as having voted
    await db.insert(students).values({ studentId }).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred." }), { status: 500 });
  }
}
