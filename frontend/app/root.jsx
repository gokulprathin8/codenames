import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import 'semantic-ui-css/semantic.min.css';
import globalStyles from "./styles/global.css";
import {red} from "@remix-run/dev/dist/colors";
import {redirect} from "@remix-run/node";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
          <title>681 - Final Project</title>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
    return [{ rel: 'stylesheet', href: globalStyles}]
}

export function loader({ request }) {
    let url = new URL(request.url);
    let hostname = url.hostname;
    let proto = request.headers.get("X-Forwarded-Proto") ?? url.protocol;

    url.host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host") ?? url.host;
    url.protocol = "https:";

    if (proto === "http") {
        return redirect(url.toString(), {
            headers: {
                "X-Forwarded-Proto": "https",
            },
        })
    }
    return {};
}
