module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            xs: "320px",
            sm: "640px",
            md: "768px",
            lg: "960px",
            xl: "1024px",
        },
        colors: {
            white: "#FFFFFF",
            "black-100": "#F2F2F2",
            "black-200": "#DDDDDD",
            "black-300": "#C9C9C9",
            "black-400": "#B4B4B4",
            "black-500": "#a0aec0",
            "black-600": "#8B8B8B",
            "black-700": "#777777",
            "black-800": "#636363",
            "black-900": "#4E4E4E",
            black: "#252525",
            "absolute-black": "#000",
            "bright-green": "#1DAC79",
            green: "#126b4c",
            "dark-green": "#284b3e",
            "green-100": "#dfe6e3",
            "green-200": "#cbd8d3",
            transparent: "transparent",
        },
        fontFamily: {
            serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
            gotham: ["GothamPro"],
            "gotham-light": ["GothamProLight"],
            "gotham-medium": ["GothamProMedium"],
            "gotham-bold": ["GothamProBold"],
            "gotham-black": ["GothamProBlack"],
        },
        extend: {
            stroke: {
                white: "#ffffff",
            },
            height: {
                72: "18rem",
                88: "22rem",
                96: "24rem",
                112: "28rem",
                128: "32rem",
                144: "36rem",
            },
            width: {
                72: "18rem",
                88: "22rem",
            },
            maxHeight: {
                0: "0",
            },
            maxWidth: {
                128: "32rem",
            },
            fontSize: {
                "8xl": "8rem",
            },
            lineHeight: {
                empty: "0",
                "extra-loose": "2.5",
            },
        },
        alphaValues: [0.1, 0.2, 0.25, 0.5, 0.6, 0.69, 0.75, 0.9],
    },
    variants: ["group-focus", "responsive", "hover", "active", "focus"],
    corePlugins: {
        gridColumn: false,
        gridColumnStart: false,
        gridColumnStartEnd: false,
        gridRow: false,
        gridRowStart: false,
        gridRowStartEnd: false,
        gradientColorStops: false,
    },
    plugins: [],
};
