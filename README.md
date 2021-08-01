# typing-test

![Deployment CI](https://github.com/salmannotkhan/typing-test/actions/workflows/node.js.yml/badge.svg)

NOTE: This is my recreation of already existing [monkeytype](https://monkeytype.com)

This site is currently live: [Visit Here](https://salmannotkhan.github.io/Typing-Test)

## How to run locally

1. Clone the repo
2. `cd typing-test`
3. Run `npm install` to install dependencies
4. To run `npm start`, this will start local server at `localhost:3000`
5. To create production build run `npm run build`

## Got new theme ideas?

I'll be happy to merge your theme ideas into typing-test. To add new theme:

1. Add theme colors into `src/App.scss` in following format:

```css
.theme-name {
	--bg-color: <background-color here> !important;
	--font-color: <font-color here> !important;
	--hl-color: <highlight-color here> !important;
	--fg-color: <forground-color here> !important;
}
```

> **Note:**  
> `highlight-color` is used for caret, wrong characters, timer, selected and onhover colors  
> `forground-color` is used for correctly typed characters  
> <i>Using hex codes for colors is recommended</i>

2.  Add theme name into `src/App.tsx` in options:

```tsx
const options: Options = {
	time: [15, 30, 45, 60],
	theme: ["default", "mkbhd", "coral", "ocean", "azure", "forest", <theme-name>],
};
```

> **Important:**  
> theme-name in `App.scss` and `App.tsx` should always match otherwise themes won't work

3. Make a pull request

4. If it's good enough to merge, I'll merge it
