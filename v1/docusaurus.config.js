/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require("path")

const isDeployPreview =
  process.env.NETLIFY && process.env.CONTEXT === "deploy-preview"

const baseUrl = process.env.BASE_URL || "/"
const isI18nStaging = process.env.I18N_STAGING === "true"

// const isVersioningDisabled = !!process.env.DISABLE_VERSIONING || isI18nStaging;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "OHIF",
  tagline: "Open-source web-based medical imaging platform",
  organizationName: "Open Health Imaging Foundation",
  projectName: "OHIF",
  baseUrl,
  baseUrlIssueBanner: true,
  url: "https://docs.ohif.org",
  i18n: {
    defaultLocale: "en",
    locales: isDeployPreview
      ? // Deploy preview: keep it fast!
        ["en"]
      : isI18nStaging
      ? // Staging locales: https://docusaurus-i18n-staging.netlify.app/
        ["en"]
      : // Production locales
        ["en"],
  },
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  // customFields: {
  //   description:
  //     'An optimized site generator in React. Docusaurus helps you to move fast and write content. Build documentation websites, blogs, marketing pages, and more.',
  // },
  themes: ["@docusaurus/theme-live-codeblock"],
  plugins: [
    "docusaurus-plugin-image-zoom", // 3rd party plugin for image click to pop
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html"],
        redirects: [
          {
            // we need this for https://cloud.google.com/healthcare/docs/how-tos/dicom-viewers
            to: "/2.0-deprecated/deployment/recipes/google-cloud-healthcare",
            from: [
              "/connecting-to-image-archives/google-cloud-healthcare",
              "/connecting-to-image-archives/google-cloud-healthcare.html",
            ],
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
  ],
  presets: [
    [
      "classic",
      {
        debug: true, // force debug plugin usage
        docs: {
          routeBasePath: "/",
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ locale, docPath }) => {
            /*if (locale !== 'en') {
              return `https://crowdin.com/project/docusaurus-v2/${locale}`;
            }*/

            // We want users to submit doc updates to the upstream/next version!
            // Otherwise we risk losing the update on the next release.
            return `https://github.com/OHIF/Viewers/edit/master/platform/docs/docs/${docPath}`
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        gtag: {
          trackingID: "G-DDBJFE34EG",
          anonymizeIP: true,
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      liveCodeBlock: {
        playgroundPosition: "bottom",
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        // respectPrefersColorScheme: true,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
      },
      algolia: {
        appId: "EFLT6YIHHZ",
        apiKey: "c220dd24fe4f86248eea3b1238a1fb60",
        indexName: "ohif",
      },
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: "OHIF Logo",
          src: "img/ohif-logo-light.svg",
          srcDark: "img/ohif-logo.svg",
        },
        items: [
          {
            href: "https://ohif.org/showcase",
            label: "Showcase",
            target: "_blank",
            position: "left",
          },
          {
            position: "left",
            to: "/",
            activeBaseRegex: "^(/next/|/)$",
            docId: "Introduction",
            label: "Docs",
          },
          {
            href: "https://ohif.org/collaborate",
            label: "Collaborate",
            target: "_blank",
            position: "left",
          },
          {
            to: "/migration-guide",
            label: "Migration Guides",
            position: "left",
            className: "new-badge",
          },
          {
            to: "/help",
            //activeBaseRegex: '(^/help$)|(/help)',
            label: "Help",
            position: "right",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              {
                type: "html",
                value: '<hr class="dropdown-separator">',
              },
              {
                to: "/versions",
                label: "All versions",
              },
            ],
          },
          {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                to: "/platform/internationalization",
                label: "Help Us Translate",
              },
            ],
          },
          {
            to: "https://github.com/OHIF/Viewers",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub Repository",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: " ",
            items: [
              {
                // This doesn't show up on dev for some reason, but displays in build
                html: `
                <a href="https://www.massgeneral.org/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/mgh-logo.png" id="mgh-logo" alt="MGH" />
                </a>
              `,
              },
            ],
          },
          {
            title: "Learn",
            items: [
              {
                label: "Introduction",
                to: "/",
              },
              {
                label: "Getting Started",
                to: "development/getting-started",
              },
              {
                label: "FAQ",
                to: "/faq",
              },
              {
                label: "Resources",
                to: "/resources",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discussion board",
                href: "https://community.ohif.org/",
              },
              {
                label: "Help",
                to: "/help",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Donate",
                href: "https://giving.massgeneral.org/ohif",
              },
              {
                label: "GitHub",
                href: "https://github.com/OHIF/Viewers",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/OHIFviewer",
              },
            ],
          },
        ],
        logo: {
          alt: "OHIF ",
          src: "img/netlify-color-accent.svg",
          href: "https://viewer.ohif.org/",
        },
        copyright: `OHIF is open source software released under the MIT license.`,
      },
    }),
}
