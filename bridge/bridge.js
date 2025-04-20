export default {
  async fetch(request) {
    const { prompt } = await request.json();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const json = await res.json();

    return new Response(JSON.stringify({ reply: json.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
