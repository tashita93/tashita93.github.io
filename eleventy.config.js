import yaml from "js-yaml";
import pluginFilesMinifier from "@sherby/eleventy-plugin-files-minifier";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
    "global.out.css": "global.css",
  });

  eleventyConfig.addDataExtension("yml,yaml", (contents) =>
    yaml.load(contents)
  );

  eleventyConfig.addPlugin(pluginFilesMinifier);
}

export const config = {
  // Control which files Eleventy will process
  // e.g.: *.md, *.njk, *.html, *.liquid
  templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

  // These are all optional:
  dir: {
    input: "content", // default: "."
    includes: "../_includes", // default: "_includes" (`input` relative)
    data: "../_data", // default: "_data" (`input` relative)
    output: "_site",
  },
};
