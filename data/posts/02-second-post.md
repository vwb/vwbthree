---
title: "Responsive Design with Next.js and Styled JSX"
author: Vincent B.
date: 2020-01-09
---

# Responsive Design with Next.js and Styled JSX

If you go to the [homepage](https://vwbthree.me) and play with the screen width, the content will properly update accordingly. While this was relatively straight forward there was a gotcha or two I ran into while implementing. What I came up with may not be the best option in terms of scalability but it is working well enough for me so figured could be worth sharing.

## Using a JS Solution

My first thought was to leverage an in JS solution to determine the screen breakpoint, assign the proper classes, and render the properly styled component. A pattern I've used with many applications in the past.

```js
render() {
    const matches = window.mediaMatch('max-width: 400px');
    const classes = matches ? 'mobile' : 'desktop';

    return (<div className={classes}>App</div>)
}
```

Likely, you already see what the issue is with an approach like the one above. It goes against the exact reason why to use Next.js in the first place. Since Next.js leverages [SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering) (server side rendering) or [static rendering](https://nextjs.org/docs/basic-features/pages#static-generation) browser based APIs such as `window` will always be undefined.

It is possible to wrap the check in an `if`, but going that direction only digs a deeper hole into a style of usage that is not inline with how we should be using NextJS in the first place.

## Leverage Pure CSS

Lets keep it simple.

Instead of determining the screen with with a check in Javascript lets let CSS do the heavy lifting here with classic media queries.

```js
render() {
    return (
        <>
            <div className=".nav-card">Stuff</div>
            <style jsx>{`
                @media screen and (max-width: 400px) {
                    .nav-card {
                        //mobile styles
                    }
                }
                @media screen and (min-width: 400px) {
                    .nav-card {
                        //desktopstyles
                    }
                }
            `}</style>
        </>
    )
}
```

However, after doing the above I was still coming across an interesting error where the screen was not rendering my content in a responsive fashion. That is when I came across this [github issue](https://github.com/zeit/next.js/issues/5122) that outlines the problem.

Essentially now that Next.js has given us complete control over the `head` of our application, there are certain `<meta>` tags that we are responsible for adding ourselves. The key one here is:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Insert the above to whereever you have defined the `<head>` of your application. For me, I included it in the `Layout.js` of my application. Check the Next.js [docs](https://nextjs.org/docs/api-reference/next/head) populating the head if you need help.

This updates the `<head>` of our page to include basic device media data such that our css can do its thing, and tada! Everything looks beautiful.
