// api/og.js
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
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
