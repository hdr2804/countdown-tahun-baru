// api/frame.js
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // --- Jika meminta gambar OG ---
  if (path === '/api/og') {
    const { searchParams } = url;
    const text = searchParams.get('text') || '🎉 COUNTDOWN TAHUN BARU 2026';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0c0a09',
            backgroundImage: 'radial-gradient(circle at 30% 30%, #7c2d12 0%, #0c0a09 100%)',
            padding: 40,
            color: 'white',
            fontFamily: '"Arial Black", sans-serif',
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            fontSize: 56,
            lineHeight: 1.3,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
            🎆 COUNTDOWN
          </div>
          <div style={{ textShadow: '0 0 20px #ff4500' }}>
            {text}
          </div>
          <div style={{ marginTop: 40, fontSize: 24, opacity: 0.8 }}>
            Menuju 1 Januari 2026
          </div>
        </div>
      ),
      { width: 1120, height: 630 }
    );
  }

  // --- Jika meminta HTML Frame (/api/frame) ---
  const now = new Date();
  const target = new Date(Date.UTC(2026, 0, 1, 17, 0, 0)); // 1 Jan 2026 00:00 WIB
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

  const baseUrl = url.origin;
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
