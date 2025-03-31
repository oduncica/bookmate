export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // ou 'class'
  theme: {
    extend: {
      fontFamily: {
        platypi: ['Platypi', 'sans-serif'], // Définissez une clé pour la typo Platypi
        nunito: ['Nunito', 'sans-serif'],  // Définissez une clé pour la typo Nunito
      },
      colors: {
        // primary colors
        'custom-blue': '#8dace5',
        'custom-orange': '#f0743e',
        'custom-yellow': '#feb737',
        'custom-green': '#aad59f',
        'custom-green2':'#2A621C',
        'custom-turquoise':'#2e6168',
        'custom-darker-orange':'#d25c28',
        
        // secondary colors
        'light-blue': '#d4e0f0',
        'light-yellow': '#fde9ad',
        'light-pink': '#f6c3ae',
        'soft-pink': '#f9b1b2',
        'lavender': '#cdbcdc',
        'blue-light': '#9ab2d4',
        'custom-dark-blue':'#3A3A64',
        'violet': '#543787',
        'dark-green': '#526049',
        'orange': '#f29b3a',
        'rouge': '#EF476F',
        'lavande':'#B57EDC',  
        'menthe':'#06D6A0',
        'magic-blue':'#6D72C3',
        'jaune':'#FFD166',

        //couleur boutons
        'lu-color':'#67AAB3',
        'aLire-color':'#4D9F38',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
