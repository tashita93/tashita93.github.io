import yaml from "js-yaml";
import pluginFilesMinifier from "@sherby/eleventy-plugin-files-minifier";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
    "./_includes/css/global.out.css": "global.css",
    "./_includes/js/main.js": "main.js",
  });

  eleventyConfig.addDataExtension("yml,yaml", (contents) =>
    yaml.load(contents)
  );

  eleventyConfig.addPlugin(pluginFilesMinifier);

  eleventyConfig.addShortcode(
    "projectCard",
    function (url, title, imagePath, mobileImagePath, offset = 0) {
      return `
      <div class="hidden md:block relative bg-brand-900 rounded-md h-[40vh] md:h-[50vh] overflow-hidden group duration-[300ms] taos:translate-y-[200px] taos:opacity-0" data-taos-offset="${
        offset * 25
      }">
        <a class="block w-full h-full" href="${url}">
          <img src="${imagePath}" alt="${title}" class="w-full h-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-50"/>
          <div class="absolute inset-0 flex items-center justify-center p-4 bg-brand-300 bg-opacity-95 text-white text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 uppercase font-bold">
            ${title}
          </div>
        </a>
      </div>
       <div class="block md:hidden relative bg-brand-900 rounded-md h-[40vh] md:h-[50vh] overflow-hidden group duration-[300ms] taos:translate-y-[200px] taos:opacity-0" data-taos-offset="${
         offset * 25
       }">
        <a class="block relative w-full h-full bg-cover bg-center" href="${url}" style="background-image: url('${imagePath}');">
          <div class="absolute h-12 bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-brand-300 text-white uppercase font-bold text-center">
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
