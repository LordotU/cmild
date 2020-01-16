import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'


const isProd = process.env.NODE_ENV === 'production'
const isBrowser = !! process.env.CMILD_BROWSER

const plugins = [
  resolve({
    browser: true,
    jsnext: true,
  }),
  replace({
    'process.browser': isBrowser,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: isBrowser ? { browsers: 'last 2 versions' } : { node: true },
          modules: false,
        },
      ],
    ],
  }),
]

if (isProd) {
  plugins.push(terser())
}

export default {
  input: 'src/index.js',
  output: {
    file: `build/${isBrowser ? 'browser' : 'node'}.js`,
    format: 'cjs',
  },
  plugins,
}
