// A minimal CORS proxy: fetches ?url=... server-side (no browser CORS rules apply
// server-to-server) and returns it with a permissive Access-Control-Allow-Origin
// header, which is the thing Reddit/RSS hosts refuse to set for browser requests.
module.exports = async function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    res.status(400).send("Missing ?url= parameter");
    return;
  }

  let targetUrl;
  try {
    targetUrl = new URL(target);
  } catch {
    res.status(400).send("Invalid url parameter");
    return;
  }

  try {
    const upstream = await fetch(targetUrl.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DispatchProxy/1.0)" },
      redirect: "follow"
    });
    const contentType = upstream.headers.get("content-type") || "text/plain; charset=utf-8";
    const body = await upstream.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType);
    res.status(upstream.status).send(body);
  } catch (e) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(502).send("Proxy fetch failed: " + e.message);
  }
}
