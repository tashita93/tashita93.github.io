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

  eleventyConfig.addShortcode(
    "projectCard",
    function (url, title, imageName = null) {
      const imagePath = imageName
        ? `./projects/${imageName}.png`
        : `./projects/${title}.png`;
      return `
      <div class="relative bg-brand-900 rounded-md h-[40vh] overflow-hidden group">
        <a class="block w-full h-full" href="${url}">
          <img src="${imagePath}" alt="${title}" class="w-full h-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-50"/>
          <div class="absolute inset-0 flex items-center justify-center p-4 bg-brand-300 bg-opacity-95 text-white text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 uppercase font-bold">
            ${title}
          </div>
        </a>
      </div>
    `;
    }
  );
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
