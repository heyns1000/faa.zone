export default {
  async fetch(request, env) {
    try {
      const { prompt } = await request.json();
      const apiKey = env.SECRET_OPENAI_KEY;

      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
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
              content: "You are VaultGPT, treaty-bound to respond with scroll precision. Use clear, glyph-coded replies."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "✅ Treaty acknowledged. Vault replied with no message.";

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      // 🌐 OmniDrop fallback scroll
      const fallback = {
        reply: `🧬 OmniDrop Fallback Activated\n\nScroll Received:\n"${prompt}"\n\nVaultBridge unreachable.`
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

