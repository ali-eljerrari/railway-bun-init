import data from './csvjson.json'

interface Story {
  [key: string]: any;
}

const stories = data as Story[];

const server = Bun.serve({
  port: process.env.PORT ?? 3000,
  fetch(req) {
    const url = new URL(req.url);
    const ip = req.headers.get('x-forwarded-for')
    const userAgent = req.headers.get('user-agent')
    const referer = req.headers.get('referer')

    console.log(`Received request from ${ip} ${url.pathname} ${userAgent} ${referer}`)
    
    switch (url.pathname) {
      case "/api/health-check":
        return Response.json({ status: "200", message: "Server is running..." });
      case "/api/story/random":
        const story = stories[Math.floor(Math.random() * stories.length)];
        const index = stories.indexOf(story);
        const total = stories.length;

        return Response.json({ status: "200", message: { story, index, total } });
      default:
        return new Response("Not Found", { status: 404 });
    }
  },
});

console.log(`Listening on http://localhost:${server.port}`);
