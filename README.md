# dispatch-proxy

A minimal CORS proxy for the Dispatch dashboard. Fetches `?url=` server-side
and returns it with `Access-Control-Allow-Origin: *`, which is what lets a
browser-based page read Reddit/RSS responses that those hosts won't hand over
directly to a cross-origin fetch.

## Deploy via GitHub + Vercel (no CLI)

1. Unzip this folder, then in it run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new empty repo on GitHub (no README/license — you already have files),
   then push:
   ```
   git remote add origin https://github.com/<your-username>/dispatch-proxy.git
   git branch -M main
   git push -u origin main
   ```
3. Go to https://vercel.com/new, click **Import** next to this repo (Vercel
   lists your GitHub repos automatically once your GitHub account is connected).
4. Leave all settings on default (Framework Preset: "Other" is fine — this has
   no frontend, just an `api/` function) and click **Deploy**.
5. Once deployed, Vercel gives you a URL like `https://dispatch-proxy-xxxx.vercel.app`.
   Your function lives at that URL + `/api/proxy`.
6. Test it: open `https://<your-url>/api/proxy?url=https://api.github.com/zen`
   in a browser tab. You should see a short quote as plain text.
7. In `dispatch.html`, set:
   ```js
   const OWN_PROXY_URL = "https://<your-url>/api/proxy";
   ```
