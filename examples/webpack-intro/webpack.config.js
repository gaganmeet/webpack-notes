const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Determine if we're in development or production mode
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  // Define the entry point(s) of your application
  // 'app' is the chunk name, entry.js is the starting file
  entry: { app: "./entry.jsx" },

  // Configure how and where webpack outputs bundles
  output: {
    // Output files will go to ./dist directory (absolute path)
    path: path.join(__dirname, "dist"),
    // Use the chunk name from entry (app -> app.js)
    // [name] is replaced with the chunk name
    filename: "[name].js",
    // Use different publicPath for development and production
    publicPath: path.join(__dirname, 'dist')
  },

  // Configure how different file types are processed
  module: {
    rules: [
      // Process CSS files
      { 
        test: /\.css$/, // Match any .css files
        // Use these loaders from right to left:
        // 1. css-loader: processes CSS files, resolves imports
        // 2. style-loader: injects CSS into the DOM
        use: ["style-loader", "css-loader"] 
      },
      
      // Process JavaScript/JSX files using SWC (faster alternative to Babel)
      { 
        test: /\.jsx?$/, // Match any .js files
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              // Configure JavaScript/JSX parsing
              parser: {
                syntax: "ecmascript", // Parse modern JavaScript
                jsx: true             // Enable JSX parsing
              },
              // Configure JSX transformation for Preact
              transform: {
                react: {
                  pragma: "h",          // Use Preact's h function for JSX
                  pragmaFrag: "Fragment", // Use Preact's Fragment
                  throwIfNamespace: true,  // Error on XML namespaces (React doesn't support them)
                  development: false,      // Don't include development-only code
                  useBuiltins: true       // Use built-in helpers when possible
                }
              }
            }
          }
        },
        exclude: /node_modules/ // Don't process node_modules files
      },
    ],
  },

  // Configure additional processing and optimizations
  plugins: [
    // Generate an HTML file with all your bundles included
    new HtmlWebpackPlugin({
      title: 'Webpack Example',    // Set the HTML title
      template: './index.html',     // Use this HTML as a template
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],

  // Configure how modules are resolved
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },

  // Development server configuration
  devServer: {
    // Serve static files from the dist directory
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,              // Enable gzip compression
    port: 8080,                 // Dev server port
    hot: true,                  // Enable Hot Module Replacement (live reload)
  }
}; 