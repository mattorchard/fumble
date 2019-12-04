const Bundler = require("parcel-bundler");
const Path = require("path");
const fs = require("fs");

const resolvePath = relativePath => Path.join(__dirname, relativePath);

const entryFiles = [
  "./src/background.js",
  "./src/content.js",
  "./src/options.html",
  "./src/popup.html",
].map(resolvePath);

const options = { hmr: false };

const bundler = new Bundler(entryFiles, options);

const copyManifest = () => {
  const manifestContent = fs.readFileSync(resolvePath("./manifest.json"));
  fs.writeFileSync(resolvePath("./dist/manifest.json"), manifestContent);
};

bundler.on("buildEnd", copyManifest);

bundler.bundle();
