import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const songTitle = searchParams.get('songTitle') ?? '';
  const displayArtist = searchParams.get('displayArtist') ?? '';
  const artwork = searchParams.get('artwork') ?? '';

  // 日本語フォント
  const fontData = await fetch(
    new URL(
      '../../../../assets/fonts/NotoSansJP-Bold-subset.woff',
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const origin = new URL(request.url).origin;

  const artworkUrl =
    `${origin}/artwork/${encodeURIComponent(artwork)}.png`;

  const logoUrl =
    `${origin}/search315_logo.svg`;

  // OGP用背景SVG
  const backgroundUrl =
    `${origin}/og/ogp.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',

          display: 'flex',

          position: 'relative',
          overflow: 'hidden',

          fontFamily: 'Noto Sans JP',
          color: '#111111',
        }}
      >

        {/* ========================================
            背景
        ======================================== */}
        <img
          src={backgroundUrl}
          width="1200"
          height="630"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '1200px',
            height: '630px',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />


        {/* ========================================
            コンテンツ
        ======================================== */}
        <div
          style={{
            position: 'absolute',

            left: 0,
            top: 0,

            width: '1200px',
            height: '630px',

            display: 'flex',
            flexDirection: 'column',

            zIndex: 1,
          }}
        >

          {/* ======================================
              Header
          ====================================== */}
          <div
            style={{
              position: 'absolute',

              top: '75px',
              left: '300px',
              right: '300px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >

            {/* 楽曲 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                padding: '12px 28px',

                borderRadius: '9999px',

                background: '#111111',
                color: '#ffffff',

                fontSize: '60px',
                fontWeight: 400,

                lineHeight: 1,
              }}
            >
              楽曲
            </div>


            {/* サイトロゴ */}
            <img
              src={logoUrl}
              width="320"
              height="80"
              style={{
                width: '320px',
                height: '80px',

                objectFit: 'contain',
              }}
            />

          </div>


          {/* ======================================
              Main Content
          ====================================== */}
          <div
            style={{
              position: 'absolute',

              top: '135px',
              left: '80px',
              right: '80px',
              bottom: '50px',

              display: 'flex',
              flexDirection: 'column',

              alignItems: 'center',
              justifyContent: 'center',

              textAlign: 'center',
            }}
          >

            {/* ====================================
                アートワーク
            ==================================== */}
            <img
              src={artworkUrl}
              width="120"
              height="120"
              style={{
                width: '120px',
                height: '120px',

                objectFit: 'cover',

                borderRadius: '12px',

                flexShrink: 0,

                marginBottom: '24px',
              }}
            />


            {/* ====================================
                曲名
            ==================================== */}
            <div
              style={{
                width: '1000px',

                display: 'block',

                fontSize: '64px',
                fontWeight: 400,

                lineHeight: 1.25,

                maxHeight: '160px',

                overflow: 'hidden',

                lineClamp: 2,

                justifyContent: 'center',
              }}
            >
              {songTitle}
            </div>


            {/* ====================================
                アーティスト
            ==================================== */}
            <div
              style={{
                width: '950px',

                display: 'block',

                marginTop: '18px',

                fontSize: '30px',
                fontWeight: 400,

                lineHeight: 1.35,

                maxHeight: '110px',

                overflow: 'hidden',

                lineClamp: 2,

                justifyContent: 'center',
              }}
            >
              {displayArtist}
            </div>

          </div>

        </div>

      </div>
    ),
    {
      width: 1200,
      height: 630,

      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],

      headers: {
        'Cache-Control':
          'public, s-maxage=31536000, stale-while-revalidate=86400',
      },
    }
  );
}