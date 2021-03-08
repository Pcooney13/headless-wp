module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  	theme: {
  		screens: {
			'xs': '320px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
    	},
  		colors: {
			'white': '#FFFFFF',
			'black-100': '#F2F2F2',
			'black-200': '#DDDDDD',
			'black-300': '#C9C9C9',
			'black-400': '#B4B4B4',
			'black-500': '#A0A0A0',
			'black-600': '#8B8B8B',
			'black-700': '#777777',
			'black-800': '#636363',
			'black-900': '#4E4E4E',
    		'black': '#252525',
			'absolute-black': '#000',
			"purple": '#3e0d85',
			"blue": '#039fda',
			"green": '#126b4c',
			"orange": '#e09b3d',
			"red": '#f6511d',
			"purple-200": '#d8d0e7',
			"blue-200": '#d0ecf7',
			"green-200": '#e5f2da',
			"orange-200": '#f9ebd9',
			"red-200": '#fcdcd3',
			"bright-blue": '#0abeff',
    		'transparent' : 'transparent'
    	},
  		fontFamily: {
			'serif': ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
			'gotham': ['GothamPro'],
			'gotham-light':['GothamProLight'],
			'gotham-medium': ['GothamProMedium'],
			'gotham-bold': ['GothamProBold'],
			'gotham-black': ['GothamProBlack'],
  		},
    	extend: {
			stroke: {
				'white': '#ffffff',
			},
    		height: {
    			'72' : '18rem',
    			'88' : '22rem',
    			'96' : '24rem',
    			'112' : '28rem',
    			'128' : '32rem',
    			'144' : '36rem',
			},
			width: {
				'72' : '18rem',
			},
			maxHeight: {
				'0' : '0',
			},
	    	fontSize: {
	    		'empty': '0',
	    		'8xl' : '8rem',
	    	},
    		lineHeight: {
    			'empty': '0',
				'extra-loose': '2.5',
      		},
    	},
    	alphaValues: [0.10, 0.20, 0.25, 0.50, 0.60, 0.69, 0.75, 0.90],
  	},
  	variants:  
	  	['group-focus', 'responsive', 'hover', 'active', 'focus'],
  	corePlugins: {
  		gridColumn: false,
  		gridColumnStart: false,
  		gridColumnStartEnd: false,
  		gridRow: false,
  		gridRowStart: false,
  		gridRowStartEnd: false,
  	},
  	plugins: [],
}
