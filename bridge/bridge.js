import { serveStatic } from 'wrangler/serve-static';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/bridge") {
      try {
        const { prompt } = await request.json();
        const apiKey = env.SECRET_OPENAI_KEY;
        const endpoint = env.VAULT_API_PROXY || "https://api.openai.com/v1/chat/completions";

        const openaiRes = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              { role: "system", content: "You are VaultGPT, treaty-bound to scroll precision." },
              { role: "user", content: prompt }
            ]
          })
        });

        const data = await openaiRes.json();
        const reply = data.choices?.[0]?.message?.content || "✅ Vault replied with no content.";

        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });

      } catch (err) {
        return new Response(JSON.stringify({
          reply: `❌ Scroll failed.\n\n"${typeof prompt !== 'undefined' ? prompt : '[undefined]'}"`
        }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }

    // Static fallback for everything else
    return serveStatic(request);
  }
}
