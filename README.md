# typing-test

![Deployment CI](https://github.com/salmannotkhan/typing-test/actions/workflows/node.js.yml/badge.svg)

![typing-test(test)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mp6aje5tpqodn23wac2y.png)

NOTE: This is my recreation of already existing [monkeytype](https://monkeytype.com)

This site is currently live: [Visit Here](https://salmannotkhan.github.io/typing-test)

## How to run locally

```zsh
git clone https://github.com/salmannotkhan/typing-test.git
cd typing-test
npm install
npm start     # to start local server at `localhost:3000`
npm run build # to create production build run
```

## Got new theme ideas?

I'll be happy to merge your theme ideas into typing-test. To add new theme:

1. Add theme colors into `src/stylesheets/themes.scss` in following format:

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

2.  Add theme name into `src/components/Header.tsx` in options:

```tsx
const options: Options = {
	time: [15, 30, 45, 60, 120],
	theme: [
		"default",
		"mkbhd",
		"mocha",
		"coral",
		"ocean",
		"azure",
		"forest",
		"rose-milk",
		<theme-name>
	],
};
```

> **Important:**  
> theme-name in `themes.scss` and `Header.tsx` should always match otherwise themes won't work

3. Make a pull request

4. If it's good enough to merge, I'll merge it
