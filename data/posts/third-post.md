---
title: "Leveraging Instagram Photos API"
author: Vincent B.
date: 2020-02-09
img: https://i.redd.it/8a1z5un6z1741.jpg
---

# Showcasing An Instagram Business Account Photos

Have you found yourself in a position where you want, or need, to show photos of a given instagram business account? Well, me too! (checkout my photos [here](https://vwbthree.me/photos)). So, lets figure this out together, and hopefully by the time this is live, we will be able to see the photos rendered on that tab above.

## Getting an API Key

The new process to get an access token for a given instagram account is particularly frustrating and there does not seem to be a straightforward way to get an application token.

So, in the meantime, I've simply scraped the media URL of every image on my profile page leveraging this script ran from the developer console of my profile's page:

```js
// Posted in the developer console (sketch I know)

formattedImagePaths = [...document.getElementsByTagName("a")]
    .filter(link => link.pathname.indexOf("/p/") > -1)
    .map(link => "https://instagram.com" + link.pathname + "media");
```

Not an ideal solution by any means, but at least provides me with a source of data until I figure out a more permanent image hosting solution.
