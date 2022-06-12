import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
    theme: {
        extend: {
            colors: {
                'primary': colors.blue,
            },
            fontFamily: {
                deca: '"Lexend Deca", sans-serif',
                lobster: '"Lobster", sans-serif',
                montaga: 'Montaga, sans-serif',
            },
            fontSize: {
                'xss': '0.5rem',
            }
        }
    }
})