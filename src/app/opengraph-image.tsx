import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site.config'

export const runtime = 'edge'
export const alt = `${siteConfig.name} — Luxury Villas in Lombok`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#080808',
          color: '#f5f0e8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        {/* Top: brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              border: '2px solid rgba(245, 240, 232, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 700,
            }}
          >
            J
          </div>
          <div
            style={{
              fontSize: '32px',
              letterSpacing: '0.15em',
              fontWeight: 400,
            }}
          >
            JUNGLA
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 232, 0.6)',
              fontFamily: 'sans-serif',
            }}
          >
            Lombok, Indonesia
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '76px',
              lineHeight: 1.05,
              fontWeight: 400,
              maxWidth: '900px',
            }}
          >
            <div style={{ display: 'flex' }}>Luxury Villa</div>
            <div style={{ display: 'flex' }}>Construction &amp; Management</div>
          </div>
        </div>

        {/* Bottom: tagline + URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(245, 240, 232, 0.15)',
            paddingTop: '32px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontFamily: 'sans-serif',
              fontWeight: 300,
              color: 'rgba(245, 240, 232, 0.7)',
              maxWidth: '600px',
            }}
          >
            European standards. Island soul.
          </div>
          <div
            style={{
              fontSize: '16px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
              color: 'rgba(245, 240, 232, 0.5)',
            }}
          >
            jungla.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
