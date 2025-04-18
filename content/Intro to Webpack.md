## Introduction

Bundlers take in various assets such as javascript, css and html, and transform them into a format that's convenient to consume through a browser.

Web browsers consume HTML, CSS, JS and multimedia files. As a project grows, tracking all of these files and adapting them to different targets (e.g. browsers) becomes too complicated to manage without help.

### Webpack

---

Webpack is a module bundler. It traverses the imports and constructs a **dependency graph** of the project and then generates **output** based on the configuration. Its also posibble to define **split points** to create separate bundles within the project code itself.
Internally webpack manages the bundling process using **chunks** , chunks are smaller pieces of code that are included in the bundles seen in webpack output.
Webpack supports ES2015, CommonJS, MJS, and AMD module formats out of the box. Plugins for specific tasks like minification, internationalization and HMR can be found as well.

> A dependency graph is a directed graph that describes how nodes relate to each other. In this case, the graph definition is defined through references (require, import) between files. Webpack statically traverses these without executing the source to generate the graph it needs to create bundles.

### Webpack's execution process

---

![9a2c470627b91ec9a4d48f3739fd5e5c.png](../_resources/9a2c470627b91ec9a4d48f3739fd5e5c.png)

Webpack begins its work from **entries**. Often these are JS modules where webpack begins its traversal process. During this process, webpack evaluates entry matches against **loader** configurations that tell webpack how to transform each match.

> **Example Entry Point:**
> ```javascript
> // src/index.js (Entry point)
> import { Header } from './components/Header';
> import { Footer } from './components/Footer';
> import './styles/main.scss';
> 
> const App = () => {
>   return (
>     <div>
>       <Header />
>       <main>Hello World</main>
>       <Footer />
>     </div>
>   );
> };
> ```

#### Resolution process

---

An entry itself is a module and when webpack encounters one, it tries to match the module against the file system using resolve configuration. Eg, you can tell webpack to perform the lookup against specific directories in addition to node_modules.
If the resolution pass failed, webpack will raise a runtime error. If webpack managed to resolve a file, webpack performs processing over the matched file based on the loader definition. Each loader applies a specific transformation against the module contents.
The same resolution process is performed against webpack's loaders. Webpack allows you to apply similar logic when determining which loader it should use. Loaders have resolve configurations of their own for this reason. If webpack fails to perform a loader lookup, it will raise a runtime error.

> **Example Resolution Configuration:**
> ```javascript
> // webpack.config.js
> module.exports = {
>   resolve: {
>     // Look for modules in these directories
>     modules: ['node_modules', 'src'],
>     // Automatically resolve these extensions
>     extensions: ['.js', '.jsx', '.json'],
>     // Create aliases for commonly used paths
>     alias: {
>       '@components': path.resolve(__dirname, 'src/components'),
>       '@styles': path.resolve(__dirname, 'src/styles')
>     }
>   }
> };
> ```

> To resolve, webpack relies on [enhanced-resolve](https://www.npmjs.com/package/enhanced-resolve) package underneath

#### Webpack resolves against any file type
---
Webpack will resolve each module it encounters while constructing the dependency graph. If an entry contains dependencies, the process will be performed recursively against each dependency until traversal has completed. Webpack can perform this process against any file type, unlike specialized tools like **Babel** or **Sass** compiler.

> **Example Loader Configuration:**
> ```javascript
> // webpack.config.js
> module.exports = {
>   module: {
>     rules: [
>       {
>         test: /\.jsx?$/,  // Match .js and .jsx files
>         use: 'babel-loader',
>         exclude: /node_modules/
>       },
>       {
>         test: /\.scss$/,  // Match .scss files
>         use: [
>           'style-loader',  // Injects CSS into DOM
>           'css-loader',    // Resolves CSS imports
>           'sass-loader'    // Compiles Sass to CSS
>         ]
>       }
>     ]
>   }
> };
> ```

#### Evaluation process
---
Assuming all loaders were found, webpack evaluates the matched loaders from bottom to top and right to left while running the module through each loader in turn. As a result, you get output which webpack will inject in the resulting **bundle**.
#### Finishing
---
After every module has been evaluated, webpack writes **output** that will result in a small runtime that executes in the browser and a manifest listing bundles to load. You can also define **split points** where webpack generates separate bundles that are loaded based on application logic.
