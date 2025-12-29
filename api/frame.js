// api/frame.js
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Hitung waktu ke 1 Januari 2026, 00:00 WIB (UTC+7 = UTC 17:00)
  const now = new Date();
  const target = new Date(Date.UTC(2026, 0, 1, 17, 0, 0)); // bulan 0 = Januari
  const diff = target - now;

  let displayText;
  if (diff <= 0) {
    displayText = "🎉 SELAMAT TAHUN BARU 2026! 🎆";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    displayText = `${days} HARI\n${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const baseUrl = new URL(request.url).origin;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/api/og?text=${encodeURIComponent(displayText)}" />
      <meta property="fc:frame:button:1" content="🔁 Refresh Waktu" />
      <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
    </head>
    <body></body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
