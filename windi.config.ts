import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
    theme: {
        extend: {
            colors: {
                'primary': colors.sky,
            },
            fontFamily: {
                deca: '"Lexend Deca", sans-serif',
                lobster: '"Lobster", sans-serif',
            }
        }
    }
})
