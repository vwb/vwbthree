---
title: "Showcasing Instagram Photos"
author: Vincent B.
date: 2020-02-09
img: https://i.redd.it/8a1z5un6z1741.jpg
---

# Showcasing An Instagram Business Account Photos

There are plenty of hoops to hop through in order to showcase a given instagram account's photos on a web app. Just to get a token there were more hoops than getting my driver license renewed. So, I just want some photos to render on my [photos page](https://vwbthree.me/photos) to start. Additionally, not planning on having instagram be my long term photo storage solution! So, lets figure out an easy way to render some photos.

## Requirements

-   Display photos from [my instagram](https://instagram.com/vwbthree) on my [photos page](https://vwbthree.me/photos).
-   Fairly static is okay
-   Should be doable in under half an hour
-   Should be relatively performant

## Scrape Town

Doing some digging into the instagram API and URL structure, I found that direct links to photos are represented as `/p/{photo_id}` and also that you can access the image directly by appending `/media` to the end of the url.

You can try it with this link if you like: https://www.instagram.com/p/B7tQgGNpHM1/

After appending `/media` to the above, you'll see that the url changes to a very different style of url:

```
https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s320x320/82134480_869603846825991_4862962703971096138_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=yRaYLRDGfv4AX-R6wKh&oh=d4893c9295c7b94f2a269188df1bf344&oe=5EFA9AF9
```

This is great for us, primarily because we can see that it is being served directly via the Instagram CDN, this means that it will be performant anywhere instagram is! Hooray!

So, lets put together a script to grab and format every link on my profile page:

```js
// Posted in the developer console (sketch I know)

formattedImagePaths = [...document.getElementsByTagName("a")]
    .filter(link => link.pathname.indexOf("/p/") > -1)
    .map(link => "https://instagram.com" + link.pathname + "media");
```

Not an ideal solution by any means, but at least provides me with a source of data until I figure out a more permanent image hosting solution!
