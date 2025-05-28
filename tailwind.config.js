/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		gridTemplateColumns: {
  			song: '60px 4fr 1fr',
  			songMobileS: '50px 4fr 1fr',
  			album: '100px 1fr',
  			songPageLg: '120px 1fr'
  		},
  		fontSize: {
  			xxs: [
  				'1.5rem',
  				{
  					lineHeight: '0.5rem',
  					letterSpacing: '-0.01em',
  					fontWeight: '0.75rem'
  				}
  			]
  		},
  		screens: {
  			tablet: '768px',
  			mobileL: '425px',
  			mobileM: '375px',
  			mobileS: '340px'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
  			JUP00: '#42DB42',
  			JUP01: '#F14A4A',
  			JUP02: '#87C010',
  			JUP03: '#4757C9',
  			DRS00: '#FFA90A',
  			DRS01: '#CC313B',
  			DRS02: '#1767D9',
  			DRS03: '#24AA2C',
  			ALT00: '#F6F45E',
  			ALT01: '#A584E5',
  			ALT02: '#225B9D',
  			BEI00: '#26D4FF',
  			BEI01: '#309AC1',
  			BEI02: '#54BC26',
  			BEI03: '#E86D85',
  			DBL00: '#F7D828',
  			DBL01: '#F4BA07',
  			DBL02: '#3BA12E',
  			FRM00: '#338033',
  			FRM01: '#3696D0',
  			FRM02: '#EF7A30',
  			FRM03: '#7F9D1E',
  			SAI00: '#7E31CC',
  			SAI01: '#E7B12C',
  			SAI02: '#834DBD',
  			SAI03: '#4C8DD0',
  			HIJ00: '#FF0000',
  			HIJ01: '#EC7B23',
  			HIJ02: '#1B66CF',
  			HIJ03: '#25B1BC',
  			HIJ04: '#58C038',
  			HIJ05: '#BF48A7',
  			SSK00: '#ced2d6',
  			SSK01: '#E13E33',
  			SSK02: '#334ABA',
  			CFP00: '#CC66CC',
  			CFP01: '#D1594C',
  			CFP02: '#12967F',
  			CFP03: '#6664C6',
  			CFP04: '#CD9D2F',
  			CFP05: '#EB64A0',
  			MFM00: '#FF99D6',
  			MFM01: '#484393',
  			MFM02: '#E44635',
  			MFM03: '#F28198',
  			SEM00: '#FF70E2',
  			SEM01: '#3B6FBC',
  			SEM02: '#E1B21F',
  			SEM03: '#EE8D2B',
  			KGD00: '#4A4A4A',
  			KGD01: '#344DCB',
  			KGD02: '#EE972F',
  			KGD03: '#CB3546',
  			FLG00: '#3D51FF',
  			FLG01: '#59C13B',
  			FLG02: '#E34238',
  			FLG03: '#D2931B',
  			LGN00: '#6880A0',
  			LGN01: '#192F5D',
  			LGN02: '#3A782E',
  			LGN03: '#21A1B4',
  			CLF00: '#00CCBB',
  			CLF01: '#2A92CF',
  			CLF02: '#91BE1C',
  			CLF03: '#D03743',
  			maroon: '#8D2828',
  			cyan: 'colors.cyan',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
