const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = function(env, argv) {
  
  // default to the server configuration
  const base = {
    entry: './src/server/index.ts',
    output: {
      filename: 'server/server.js',
      // path needs to be an ABSOLUTE file path
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'cheap-module-eval-source-map',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
            }
          ]
        },
      ]
    },
  }
  
  // server-specific configuration
  if (env.platform === 'server') {
    base.target = 'node';
    base.externals = [nodeExternals()];
  }

  // client-specific configurations
  if (env.platform === 'web') {
    base.entry = './src/client/App.tsx';
    base.output.filename = 'client/client.js';
  }

  return base;
}