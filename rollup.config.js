import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'


export default {
  input: 'src/index.js',
  output: {
    file: `build/${!! process.env.CMILD_BROWSER ? 'browser' : 'node'}.js`,
    format: 'cjs',
  },
  plugins: [
    resolve({
      browser: true,
      jsnext: true,
    }),
    replace({
      'process.browser': !! process.env.CMILD_BROWSER,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: !! process.env.CMILD_BROWSER ? { browsers: 'last 2 versions' } : { node: true },
            modules: false,
          },
        ],
      ],
    }),
  ],
}
