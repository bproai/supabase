import { serve } from "https://deno.land/std@0.122.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // Example of routing based on the path
  if (path === "/hello") {
    return new Response(
      JSON.stringify({ message: "Hello from Supabase Edge Function!" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } else if (path === "/apple-signin") {
    try {
      const { identityToken } = await req.json();

      // Verify the token, for example, by logging or further processing
      console.log("Received Apple identity token:", identityToken);

      return new Response(
        JSON.stringify({ message: "Apple Sign-In verified successfully" }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Apple Sign-In error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to verify Apple Sign-In" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Default 404 response
  return new Response(
    JSON.stringify({ error: "Not found" }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
});




// curl -L -X POST 'https://egmevtkgegomstnmkoym.supabase.co/functions/v1/hello-world' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnbWV2dGtnZWdvbXN0bm1rb3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODAzMjUsImV4cCI6MjA0NzA1NjMyNX0.xukPqT1TpQCUonBYuSkZmyEfsNWatAl-DazH8gQSYkM' --data '{"name":"Functions"}'

// curl -L -X POST 'https://egmevtkgegomstnmkoym.supabase.co/functions/v1/apple-signin-test' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnbWV2dGtnZWdvbXN0bm1rb3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODAzMjUsImV4cCI6MjA0NzA1NjMyNX0.xukPqT1TpQCUonBYuSkZmyEfsNWatAl-DazH8gQSYkM'
// https://egmevtkgegomstnmkoym.supabase.co/functions/v1/apple-signin-test