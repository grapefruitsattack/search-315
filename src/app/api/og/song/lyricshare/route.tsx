import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function count(str:string) {

    let len: number = 0;

    for (let i = 0; i < str.length; i++) {
      (str[i].match(/[ -~]/)) ? len += 1 : len += 2;
    }

    return len;

}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const songTitle = searchParams.get('songTitle') ?? '';
  const displayArtist = searchParams.get('displayArtist') ?? '';
  const artwork = searchParams.get('artwork') ?? '';

  const songTitleCount = count(songTitle);
  const displayArtistCount = count(songTitle);
  const fontSizeStr: string 
     = songTitleCount>=21?'50px'
      :songTitleCount>=16?'60px':'70px';

  // 日本語フォント
  const fontData = await fetch(
    new URL(
      '../../../../../assets/fonts/NotoSansJP-Bold-subset.ttf',
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
    `${origin}/og/ogp_lysirc_share.png`;

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

              top: '50px',
              left: '320px',
              right: '320px',

              display: 'flex',
              justifyContent: 'space-between',
            }}
          >

            {/* ====================================
                アートワーク
            ==================================== */}
            <img
              src={artworkUrl}
              width="80"
              height="80"
              style={{
                width: '80px',
                height: '80px',

                objectFit: 'cover',

                borderRadius: '12px',

                flexShrink: 0,

                marginBottom: '24px',
              }}
            />  

            {/* ====================================
                アーティスト
            ==================================== */}
            <div
              style={{
                width: '480px',

                display: 'block',
                marginLeft: '25px',
                marginRight: '25px',

                fontSize: '36px',
                fontWeight: 400,
                color: '#525252',

                lineHeight: 1.35,

                maxHeight: '110px',

                overflow: 'hidden',

                lineClamp: 2,

              }}
            >
              {displayArtist}
            </div>

          </div>


          {/* ======================================
              Main Content
          ====================================== */}
          <div
            style={{
              position: 'absolute',

              top: '150px',
              left: '320px',
              right: '320px',
              bottom: '280px',

              display: 'flex',
              flexDirection: 'column',
              
              alignItems: 'center',
              textAlign: 'center',
              
              justifyContent: 'center',

            }}
          >


            {/* ====================================
                曲名
            ==================================== */}
            <div
              style={{
                width: '560px',

                display: 'block',

                fontSize: fontSizeStr,
                fontWeight: 400,

                lineHeight: 1.25,

                maxHeight: '190px',

                overflow: 'hidden',

                lineClamp: 3,
                
                justifyContent: 'center',

                paddingLeft: '20px',
                paddingRight: '40px',

              }}
            >
              {songTitle}
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