/**
 * Builds the srcdoc HTML for the sandboxed HTML/CSS/JS runner iframe.
 *
 * Security model (see docs/SECURITY.md):
 * - The iframe is loaded via `srcdoc` with `sandbox="allow-scripts allow-forms"` —
 *   deliberately WITHOUT `allow-same-origin`, so it always executes with an opaque
 *   origin. It cannot read cookies/localStorage/parent DOM, and top-level
 *   navigation / popups are impossible because those sandbox tokens are absent.
 * - `fetch`/`XMLHttpRequest`/`WebSocket`/`EventSource` are shimmed to reject
 *   immediately: no lesson or exercise in this beta legitimately needs the
 *   network, so we remove it rather than trust every code sample forever.
 */

const RUNTIME_SHIM = `
(function () {
  window.__logs = [];
  window.__testResults = [];
  window.__runtimeError = undefined;

  function serialize(arg) {
    if (typeof arg === "string") return arg;
    try { return JSON.stringify(arg); } catch (e) { return String(arg); }
  }

  ["log", "warn", "error", "info"].forEach(function (level) {
    var original = console[level] ? console[level].bind(console) : function () {};
    console[level] = function () {
      var args = Array.prototype.slice.call(arguments);
      window.__logs.push({ level: level, text: args.map(serialize).join(" ") });
      try { original.apply(console, args); } catch (e) {}
    };
  });

  window.__report = function (id, passed, message) {
    window.__testResults.push({ id: id, passed: Boolean(passed), message: message || "" });
  };

  window.addEventListener("error", function (event) {
    if (window.__runtimeError === undefined) {
      window.__runtimeError = event.message || "Unknown runtime error";
    }
  });
  window.addEventListener("unhandledrejection", function (event) {
    if (window.__runtimeError === undefined) {
      var reason = event.reason;
      window.__runtimeError = (reason && reason.message) ? reason.message : String(reason);
    }
  });

  function blocked() {
    return Promise.reject(new Error("Network access is disabled in this sandbox."));
  }
  window.fetch = blocked;
  window.XMLHttpRequest = function () {
    throw new Error("Network access is disabled in this sandbox.");
  };
  window.WebSocket = function () {
    throw new Error("Network access is disabled in this sandbox.");
  };
  window.EventSource = function () {
    throw new Error("Network access is disabled in this sandbox.");
  };
})();
`;

function reportScript(delayMs: number) {
  return `
(function () {
  setTimeout(function () {
    try {
      window.parent.postMessage({
        type: "visasparkschools-run-result",
        logs: window.__logs || [],
        testResults: window.__testResults || [],
        error: window.__runtimeError
      }, "*");
    } catch (e) {}
  }, ${delayMs});
})();
`;
}

export interface BuildDocOptions {
  language: "html" | "javascript";
  code: string;
  harness?: string;
  /** ms to wait after code+harness run before collecting results (allows microtasks/short timers to settle). */
  settleDelayMs?: number;
}

/**
 * For "html" exercises, the learner's code IS a full document. We inject the
 * runtime shim as early as possible and the harness + result reporter as late
 * as possible, without touching the learner's own markup/scripts.
 */
function buildHtmlDoc({ code, harness, settleDelayMs = 60 }: BuildDocOptions): string {
  const shimTag = `<script>${RUNTIME_SHIM}</script>`;
  const tailScript = `<script>try{\n${harness ?? ""}\n}catch(e){window.__runtimeError = window.__runtimeError || String(e && e.message || e);}</script><script>${reportScript(settleDelayMs)}</script>`;

  let doc = code;

  if (/<html[^>]*>/i.test(doc)) {
    doc = doc.replace(/<html[^>]*>/i, (m) => `${m}${shimTag}`);
  } else {
    doc = shimTag + doc;
  }

  if (/<\/html>/i.test(doc)) {
    doc = doc.replace(/<\/html>/i, `${tailScript}</html>`);
  } else if (/<\/body>/i.test(doc)) {
    doc = doc.replace(/<\/body>/i, `${tailScript}</body>`);
  } else {
    doc = doc + tailScript;
  }

  return doc;
}

/** For plain "javascript" exercises: synthetic blank document, one <script> per stage. */
function buildJsDoc({ code, harness, settleDelayMs = 60 }: BuildDocOptions): string {
  return `<!doctype html>
<html>
<head><meta charset="utf-8" /></head>
<body>
<script>${RUNTIME_SHIM}</script>
<script>${code}</script>
<script>try{\n${harness ?? ""}\n}catch(e){window.__runtimeError = window.__runtimeError || String(e && e.message || e);}</script>
<script>${reportScript(settleDelayMs)}</script>
</body>
</html>`;
}

export function buildRunnerDoc(options: BuildDocOptions): string {
  return options.language === "html" ? buildHtmlDoc(options) : buildJsDoc(options);
}
