export default {
  async fetch(request, env) {
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
            {
              role: "system",
              content: "You are VaultGPT, treaty-bound to respond with scroll precision. Always reply with clarity and acknowledge terminal glyphs."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "✅ VaultGPT is sealed but responded with no content.";

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      const fallback = {
        reply: `❌ Vault fallback triggered.\n\nScroll received:\n"${prompt}"\n\nBridge connection failed or GPT is unreachable.`
      };

      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
}
