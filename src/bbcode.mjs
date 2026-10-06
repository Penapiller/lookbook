// Turns a small set of BBCode into safe HTML, for the plain-text
// Information boxes on pet and item pages.
//
// The text is escaped FIRST, before any BBCode is converted. That means
// stray brackets, or someone typing real HTML like <script>, can never
// create a working tag or break the page — only the exact BBCode patterns
// below are turned into real HTML; everything else stays as plain text.
//
// Supported: [b]bold[/b]  [i]italic[/i]  [u]underline[/u]  [s]strikethrough[/s]
//            [url=https://example.com]link text[/url]
//            [url]https://example.com[/url]

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function bbcodeToHtml(raw) {
  let s = escapeHtml(raw ?? '');

  s = s.replace(/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/gi, (_, href, text) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  );
  s = s.replace(/\[url\]([\s\S]*?)\[\/url\]/gi, (_, href) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer">${href}</a>`
  );

  s = s.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<b>$1</b>');
  s = s.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<i>$1</i>');
  s = s.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1</u>');
  s = s.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, '<s>$1</s>');

  return s;
}
