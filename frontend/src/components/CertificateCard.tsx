import React from 'react';

interface CertificateCardProps {
  type: 'astrology' | 'vastu';
  className?: string;
}

/**
 * HTML/CSS rendered certificate cards matching the Vastu Shikhar certificates exactly.
 * No dates are shown. All info from the originals is preserved.
 */
export default function CertificateCard({ type, className = '' }: CertificateCardProps) {
  const isAstrology = type === 'astrology';

  return (
    <div
      className={`relative w-full select-none ${className}`}
      style={{
        background: 'linear-gradient(135deg, #fff 0%, #fdf8f0 50%, #fff 100%)',
        border: '3px solid #c9a84c',
        borderRadius: '4px',
        fontFamily: 'Georgia, "Times New Roman", serif',
        overflow: 'hidden',
        aspectRatio: '1.41 / 1',
        boxShadow: '0 4px 32px rgba(0,0,0,0.18), inset 0 0 60px rgba(201,168,76,0.06)',
      }}
    >
      {/* Corner decorations - top left */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '80px 80px 0 0',
          borderColor: '#1a1a1a transparent transparent transparent',
        }} />
        <div style={{
          position: 'absolute', top: 6, left: 6,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '60px 60px 0 0',
          borderColor: '#c9a84c transparent transparent transparent',
        }} />
      </div>

      {/* Corner decorations - top right */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 80px 80px 0',
          borderColor: 'transparent #1a1a1a transparent transparent',
        }} />
        <div style={{
          position: 'absolute', top: 6, right: 6,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 60px 60px 0',
          borderColor: 'transparent #c9a84c transparent transparent',
        }} />
      </div>

      {/* Corner decorations - bottom left */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 80, height: 80, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '80px 0 0 80px',
          borderColor: 'transparent transparent transparent #1a1a1a',
        }} />
        <div style={{
          position: 'absolute', bottom: 6, left: 6,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '60px 0 0 60px',
          borderColor: 'transparent transparent transparent #c9a84c',
        }} />
      </div>

      {/* Corner decorations - bottom right */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 0 80px 80px',
          borderColor: 'transparent transparent #1a1a1a transparent',
        }} />
        <div style={{
          position: 'absolute', bottom: 6, right: 6,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 0 60px 60px',
          borderColor: 'transparent transparent #c9a84c transparent',
        }} />
      </div>

      {/* Inner gold border frame */}
      <div style={{
        position: 'absolute',
        inset: 12,
        border: '1.5px solid #c9a84c',
        borderRadius: 2,
        pointerEvents: 'none',
      }} />

      {/* Watermark logo text */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <span style={{
          fontSize: '7vw',
          fontWeight: 900,
          color: 'rgba(201,168,76,0.07)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          VASTU SHIKHAR
        </span>
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '5% 8%',
        boxSizing: 'border-box',
      }}>
        {/* Top: Title */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{
            fontSize: 'clamp(22px, 4.5vw, 52px)',
            fontWeight: 900,
            color: '#1a1a1a',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            fontFamily: '"Georgia", serif',
            textTransform: 'uppercase',
          }}>
            CERTIFICATE
          </div>
          <div style={{
            fontSize: 'clamp(14px, 2.5vw, 30px)',
            fontWeight: 700,
            color: '#c9a84c',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}>
            OF COMPLETION
          </div>

          {/* Divider ornament */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '8px 0 6px' }}>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
            <div style={{ width: 6, height: 6, background: '#c9a84c', transform: 'rotate(45deg)' }} />
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to left, transparent, #c9a84c)' }} />
          </div>

          {/* Given to label */}
          <div style={{
            fontSize: 'clamp(8px, 1.2vw, 14px)',
            color: '#555',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            THE CERTIFICATE IS GIVEN TO
          </div>

          {/* Recipient name */}
          <div style={{
            fontSize: 'clamp(18px, 3.2vw, 38px)',
            fontWeight: 800,
            color: '#1a1a1a',
            fontFamily: '"Georgia", serif',
            letterSpacing: '0.02em',
          }}>
            Vijay Ramdas Sawkar
          </div>

          {/* Thin rule */}
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #c9a84c80, transparent)', margin: '6px auto', width: '60%' }} />

          {/* For successfully completing */}
          <div style={{
            fontSize: 'clamp(8px, 1.1vw, 13px)',
            color: '#555',
            letterSpacing: '0.1em',
            marginBottom: 4,
          }}>
            For Successfully Completing
          </div>

          {/* Course name */}
          {isAstrology ? (
            <div style={{
              fontSize: 'clamp(12px, 2vw, 22px)',
              fontWeight: 800,
              color: '#c9a84c',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              ASTROLOGY ADVANCE COURSE (VEDIC+KP+NADI)
            </div>
          ) : (
            <div style={{
              fontSize: 'clamp(16px, 2.8vw, 32px)',
              fontWeight: 800,
              color: '#c9a84c',
              letterSpacing: '0.04em',
            }}>
              Vastu Advance Course
            </div>
          )}
        </div>

        {/* Bottom: Decorative elements + signature */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 8,
        }}>
          {/* Left decoration */}
          {isAstrology ? (
            <AstrologyWheel size="clamp(48px, 8vw, 90px)" />
          ) : (
            <CompassRose size="clamp(40px, 7vw, 80px)" />
          )}

          {/* Center: Vastu Shikhar logo + laurel */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <LaurelWreath />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid #c9a84c60',
              borderRadius: 6,
              padding: '4px 10px',
            }}>
              <div style={{
                fontSize: 'clamp(7px, 1vw, 11px)',
                fontWeight: 900,
                color: '#c9a84c',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}>
                ✦ VASTU
              </div>
              <div style={{
                fontSize: 'clamp(8px, 1.1vw, 13px)',
                fontWeight: 900,
                color: '#1a1a1a',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}>
                SHIKHAR
              </div>
            </div>
          </div>

          {/* Right: Signature block */}
          <div style={{ textAlign: 'center', minWidth: 'clamp(80px, 14vw, 160px)' }}>
            {/* Signature SVG */}
            <svg viewBox="0 0 120 40" style={{ width: 'clamp(60px, 10vw, 120px)', height: 'auto', display: 'block', margin: '0 auto 2px' }}>
              <path
                d="M10,30 C20,10 30,5 45,20 C55,30 60,8 75,15 C85,20 90,28 110,22"
                fill="none"
                stroke="#333"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M70,22 C80,18 95,25 108,20"
                fill="none"
                stroke="#333"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <div style={{ height: 1, background: '#555', marginBottom: 3 }} />
            <div style={{
              fontSize: 'clamp(7px, 1.1vw, 12px)',
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              ACHARYA PANKAJ
            </div>
            <div style={{
              fontSize: 'clamp(6px, 0.9vw, 10px)',
              color: '#555',
              lineHeight: 1.4,
              marginTop: 1,
            }}>
              Founder of Vastu Shikhar &amp; Mentor
            </div>
            <div style={{
              fontSize: 'clamp(5px, 0.75vw, 9px)',
              color: '#777',
              lineHeight: 1.3,
              marginTop: 1,
            }}>
              (REG. NO. - U96906UP2023PTC188821)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Zodiac wheel SVG for astrology certificate */
function AstrologyWheel({ size }: { size: string }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, opacity: 0.85 }}>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="20" fill="rgba(201,168,76,0.15)" stroke="#c9a84c" strokeWidth="1" />
      {/* Spokes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 20 * Math.cos(rad);
        const y1 = 50 + 20 * Math.sin(rad);
        const x2 = 50 + 48 * Math.cos(rad);
        const y2 = 50 + 48 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a84c" strokeWidth="0.6" />;
      })}
      {/* Zodiac symbols */}
      {['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'].map((sym, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x = 50 + 43 * Math.cos(angle);
        const y = 50 + 43 * Math.sin(angle);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fontSize="7" fill="#c9a84c" fontFamily="serif">{sym}</text>
        );
      })}
      {/* Center star */}
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="14" fill="#c9a84c">✦</text>
    </svg>
  );
}

/** Compass rose SVG for vastu certificate */
function CompassRose({ size }: { size: string }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, opacity: 0.85 }}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="8" fill="rgba(201,168,76,0.2)" stroke="#c9a84c" strokeWidth="1" />
      {/* Cardinal directions */}
      {[
        { label: 'N', x: 50, y: 8 },
        { label: 'S', x: 50, y: 92 },
        { label: 'E', x: 92, y: 50 },
        { label: 'W', x: 8, y: 50 },
      ].map(d => (
        <text key={d.label} x={d.x} y={d.y} textAnchor="middle" dominantBaseline="central"
          fontSize="9" fontWeight="bold" fill="#c9a84c" fontFamily="serif">{d.label}</text>
      ))}
      {/* Compass arrows */}
      <polygon points="50,15 47,50 50,45 53,50" fill="#c9a84c" />
      <polygon points="50,85 47,50 50,55 53,50" fill="#c9a84c" opacity="0.5" />
      <polygon points="15,50 50,47 45,50 50,53" fill="#c9a84c" opacity="0.5" />
      <polygon points="85,50 50,47 55,50 50,53" fill="#c9a84c" />
      {/* Diagonal lines */}
      {[45, 135, 225, 315].map((angle, i) => {
        const rad = angle * Math.PI / 180;
        const x1 = 50 + 10 * Math.cos(rad);
        const y1 = 50 + 10 * Math.sin(rad);
        const x2 = 50 + 38 * Math.cos(rad);
        const y2 = 50 + 38 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="2,2" />;
      })}
    </svg>
  );
}

/** Laurel wreath SVG */
function LaurelWreath() {
  return (
    <svg viewBox="0 0 80 40" style={{ width: 'clamp(50px, 8vw, 80px)', height: 'auto' }}>
      {/* Left branch */}
      {[0, 1, 2, 3, 4].map(i => {
        const x = 8 + i * 5;
        const y = 30 - i * 3;
        return (
          <ellipse key={`l${i}`} cx={x} cy={y} rx="4" ry="2.5"
            transform={`rotate(${-30 + i * 8} ${x} ${y})`}
            fill="#c9a84c" opacity="0.85" />
        );
      })}
      {/* Right branch */}
      {[0, 1, 2, 3, 4].map(i => {
        const x = 72 - i * 5;
        const y = 30 - i * 3;
        return (
          <ellipse key={`r${i}`} cx={x} cy={y} rx="4" ry="2.5"
            transform={`rotate(${30 - i * 8} ${x} ${y})`}
            fill="#c9a84c" opacity="0.85" />
        );
      })}
      {/* Center star */}
      <text x="40" y="28" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#c9a84c">✦</text>
    </svg>
  );
}
