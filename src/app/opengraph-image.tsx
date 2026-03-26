import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Skissify — AI-Powered Hand-Drawn Sketches'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf6ed',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Hand-drawn style border */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <path
            d="M 20,20 Q 600,15 1180,20 Q 1185,315 1180,610 Q 600,615 20,610 Q 15,315 20,20"
            fill="none"
            stroke="#bbb"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>

        {/* Logo / Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#333',
              letterSpacing: '-2px',
            }}
          >
            Skissify
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#777',
              marginTop: '-8px',
            }}
          >
            AI-Powered Hand-Drawn Sketches
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#999',
              marginTop: '24px',
              padding: '12px 32px',
              border: '1px dashed #ccc',
              borderRadius: '8px',
            }}
          >
            JSON in, beautiful sketches out
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
