import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    sourcemap: !isProduction
  },
  plugins: [!isProduction && sourcemaps(), isProduction && terser()]
}
