import data from './csvjson.json'

interface Story {
  [key: string]: any;
}

const stories = data as Story[];

const server = Bun.serve({
  port: process.env.PORT ?? 3000,
  fetch(request) {
    const ip = request.headers.get('x-forwarded-for')
    const url = request.url
    const method = request.method
    console.log(`Received request from ${ip} ${url} ${method}`)

    const story = stories[Math.floor(Math.random() * stories.length)]
    const index = stories.indexOf(story)
    const total = stories.length
    return new Response(JSON.stringify({
      status: 200,
      data: {
        story,
        index,
        total,
      },
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  },
});

console.log(`Listening on http://localhost:${server.port}`);
