// api/frame.js
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const now = new Date();
  const target = new Date(Date.UTC(2026, 0, 1, 17, 0, 0)); // 1 Jan 2026 00:00 WIB
  const diff = target - now;

  let displayText;
  if (diff <= 0) {
    displayText = "SELAMAT TAHUN BARU 2026!";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    // Format satu baris agar bisa di-URL encode
    displayText = `${days} hari ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Encode untuk URL
  const encodedText = encodeURIComponent(displayText);
  const baseUrl = url.origin;

  // Gunakan placeholder publik yang support teks
  const ogImageUrl = `https://via.placeholder.com/1120x630/0c0a09/ffffff?text=🎆+COUNTDOWN%0A${encodedText.replace(/%20/g, '+')}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${ogImageUrl}" />
      <meta property="fc:frame:button:1" content="🔁 Refresh" />
      <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
    </head>
    <body></body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
