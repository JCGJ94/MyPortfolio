import { ImageResponse } from 'next/og';

export const alt = 'Jose Carlos González — Full Stack · Backend Python & AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#09090b',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700 }}>Jose Carlos González</div>
        <div style={{ fontSize: 40, marginTop: 24, color: '#a1a1aa' }}>Full Stack · Backend Python & AI</div>
        <div style={{ fontSize: 32, marginTop: 64, color: '#60a5fa' }}>jccode.dev</div>
      </div>
    ),
    size,
  );
}
