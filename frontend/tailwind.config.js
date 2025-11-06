// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class', // Manual dark mode toggle
//   theme: {
//     extend: {
//       colors: {
//         // Primary Teal Shades
//         primary: {
//           50: '#E6F5F7',
//           100: '#CCE9ED',
//           200: '#99D4DB',
//           300: '#66BEC9',
//           400: '#33A9B7',
//           500: '#21808D', // Main primary
//           600: '#1D7481',
//           700: '#1A6873',
//           800: '#165C65',
//           900: '#134E56',
//         },
//         // Warm Brown/Gray (Secondary)
//         secondary: {
//           50: '#F7F6F5',
//           100: '#EDECEA',
//           200: '#DBD9D5',
//           300: '#C9C6C0',
//           400: '#B7B3AB',
//           500: '#5E5240', // Main secondary
//           600: '#544939',
//           700: '#4A4033',
//           800: '#40372C',
//           900: '#362E26',
//         },
//         // Accent Bright Teal
//         accent: {
//           400: '#45D4E0',
//           500: '#32B8C6', // Main accent
//           600: '#2DA6B2',
//         },
//         // Backgrounds
//         background: {
//           light: '#FCFCF9',
//           dark: '#1F2121',
//         },
//         surface: {
//           light: '#FFFFFE',
//           dark: '#262828',
//         },
//         // Text
//         text: {
//           primary: {
//             light: '#13343B',
//             dark: '#F5F5F5',
//           },
//           secondary: {
//             light: '#626C71',
//             dark: '#A7A9A9',
//           }
//         },
//         // Status colors
//         success: '#21808D',
//         error: '#C0152F',
//         warning: '#A84B2F',
//         info: '#626C71',
//       },
//       fontFamily: {
//         sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
//       },
//       fontSize: {
//         'xs': '11px',
//         'sm': '12px',
//         'base': '14px',
//         'md': '14px',
//         'lg': '16px',
//         'xl': '18px',
//         '2xl': '20px',
//         '3xl': '24px',
//         '4xl': '30px',
//       },
//       spacing: {
//         '18': '4.5rem',
//         '88': '22rem',
//       },
//       borderRadius: {
//         'base': '8px',
//         'md': '10px',
//         'lg': '12px',
//       },
//       boxShadow: {
//         'xs': '0 1px 2px rgba(0, 0, 0, 0.02)',
//         'sm': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
//         'md': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
//         'card': '0 1px 3px rgba(0, 0, 0, 0.03)',
//         'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06)',
//       },
//       animation: {
//         'fade-in': 'fadeIn 0.3s ease-in',
//         'slide-up': 'slideUp 0.4s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(10px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Teal Shades (adjusted for better dark mode)
        primary: {
          50: '#E6F5F7',
          100: '#CCE9ED',
          200: '#99D4DB',
          300: '#66BEC9',
          400: '#33A9B7',
          500: '#21808D',
          600: '#1D7481',
          700: '#1A6873',
          800: '#165C65',
          900: '#134E56',
          950: '#0F3F45', // Darker shade for dark mode
        },
        // Secondary/Neutral (improved for dark mode)
        secondary: {
          50: '#F7F6F5',
          100: '#EDECEA',
          200: '#DBD9D5',
          300: '#C9C6C0',
          400: '#B7B3AB',
          500: '#5E5240',
          600: '#544939',
          700: '#4A4033',
          800: '#40372C',
          900: '#362E26',
        },
        // Accent (toned down for dark mode)
        accent: {
          400: '#45D4E0',
          500: '#32B8C6',
          600: '#2DA6B2',
          700: '#258B96', // New: Better for dark mode backgrounds
        },
        // Backgrounds
        background: {
          light: '#FCFCF9',
          dark: '#0F1415', // Darker, less gray
        },
        surface: {
          light: '#FFFFFE',
          dark: '#1A1D1E', // Darker surface
        },
       // Text colors (improved contrast)
text: {
  primary: {
    light: '#13343B',
    dark: '#F5F5F5', // Changed: Brighter white
  },
  secondary: {
    light: '#626C71',
    dark: '#A1A7AC', // Changed: Lighter gray
  }
},

        // Status colors (dark mode friendly)
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': '11px',
        'sm': '12px',
        'base': '14px',
        'md': '14px',
        'lg': '16px',
        'xl': '18px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '30px',
      },
      borderRadius: {
        'base': '8px',
        'md': '10px',
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
