# NFT Metaverse Game Website Documentation <a id="contacts" href="#contacts">#</a>

![The Street Metaverse Game (v2 2 2) - Important Updates](https://user-images.githubusercontent.com/8299759/173297752-e5551c00-27f8-4b69-86e1-2abdd96f9d3e.png)


**Created:** June 13, 2022<br />

### Contents

- [Contacts](#contacts)
- [Configuration](#configuration)
- [Deploy (installation) guide](#deploy)
- [Sources and Credits](#credits)



## Configuration <a id="configuration" href="#configuration">#</a> 



### Application name, description & Collection link

**File:** `utils/configuration.ts`

The configuration file is used to set seo parameters and link to the collection.

The project supports two marketplaces:

- OpenSea: https://opensea.io/collection/monstershelter
  ```js
  collection: {
    type: 'opensea',
    slug: 'monstershelter',
    // 🚨 You must request your API key on the page https://docs.opensea.io/reference/request-an-api-key
    // 🚨 But at the time of its release, you can use my (I don't guarantee its stability)
    apiToken: 'e8aee6c785c043f09c7cc9337e333e61',
  }
  ```
- OpenSea (Matic, Polygon): https://opensea.io/collection/gooncats
  ```js
  collection: {
    type: 'opensea',
    protocol: 'matic',
    slug: 'gooncats',
    // 🚨 You must request your API key on the page https://docs.opensea.io/reference/request-an-api-key
    // 🚨 But at the time of its release, you can use my (I don't guarantee its stability)
    apiToken: 'e8aee6c785c043f09c7cc9337e333e61'
  }
  ```
- Rarible: https://rarible.com/collection/0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d/items
  ```js
  collection: {
    type: 'rarible',
    blockchain: 'ETHEREUM',
    address: '0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d'
  }
  ```



### Content components

**Path:** `components/stories`

You can easily change all the content displayed on the site in the stories react components.

For your convenience, I have already filled the stories with example content.



### Color theme

**File:** `styles/variables.module.scss`

You can easily choose the colors for the site by editing the SCSS variables (`$primary-color`, `$accent-color`). Be aware of accessibility and set colors that are contrasting enough for white text.



### Fonts

**Files:** `styles/globals.scss`, `pages/_document.tsx`

First of all, connect the fonts you need in the file `pages/_document.tsx`.

Next, you need to update CSS variables (`--base-font`, `--accent-font`) by specifying font information in the file `styles/globals.scss`



## Deploy (installation) guide <a id="deploy" href="#deploy">#</a> 

**Requirements:** 
    Node.js 12.22.0 or later; 
    MacOS, Windows (including WSL), and Linux are supported;

Below is the documentation from the official website Next.js <a href="https://nextjs.org/docs/deployment">(see original)</a>.

### Vercel (Recommended)

The easiest way to deploy Next.js to production is to use the <a href="https://vercel.com/">Vercel platform</a> from the creators of Next.js. Vercel is a cloud platform for static sites, hybrid apps, and Serverless Functions.

#### Getting started

If you haven’t already done so, push your app to a Git provider of your choice: GitHub, GitLab, or BitBucket. Your repository can be private or public.


Then, follow these steps:

1. Sign up to Vercel (no credit card is required).
1. After signing up, you’ll arrive on the “Import Project” page. Under “From Git Repository”, choose the Git provider you use and set up an integration. (Instructions: GitHub / GitLab / BitBucket).
1. Once that’s set up, click “Import Project From …” and import your app. It auto-detects that your app is using Next.js and sets up the build configuration for you. No need to change anything — everything should work fine!
1. After importing, it’ll deploy your app and provide you with a deployment URL. Click “Visit” to see your app in production.

Congratulations! You’ve deployed your app! If you have questions, take a look at the Vercel documentation.


### Static website generation

To generate a static HTML site run commands:

```bash
yarn install;
echo "UNOPTIMIZED_IMAGES=true" >> .env;
yarn build;
yarn export;
```

The "out" folder will be generated.

### Node.js Server

`next build` builds the production application in the .next folder. After building, `next start` starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages.




### Docker Image

Next.js can be deployed to any hosting provider that supports Docker containers. You can use this approach when deploying to container orchestrators such as Kubernetes or HashiCorp Nomad, or when running inside a single node in any cloud provider.

Dockerfile is already included in the project

You can build your container with `docker build . -t my-next-js-app` and run it with `docker run -p 3000:3000 my-next-js-app`.



## Sources and Credits <a id="credits" href="#credits">#</a>

Thanks to all great people who are developing open source software.

- [next](https://www.npmjs.com/package/next) (MIT) — The React Framework;
- [react](https://www.npmjs.com/package/react) (MIT) — JS library 4 building UI;
- [sass](https://www.npmjs.com/package/sass) (MIT) — CSS preprocessor;
- [web-platform](https://www.npmjs.com/package/web-platform-alpha) (MPL-2.0) — React SDK 4 build modern & accessible interfaces;
- [react-icons](https://www.npmjs.com/package/react-icons) (MIT) — SVG icons;
- [markdown-it](https://www.npmjs.com/package/markdown-it) (MIT) — Markdown parser;
- [husky](https://www.npmjs.com/package/husky) (MIT) — A tool for working with commits during development;

