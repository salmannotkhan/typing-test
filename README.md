# typing-test

![Deployment CI](https://github.com/salmannotkhan/typing-test/actions/workflows/node.js.yml/badge.svg)

![typing-test(test)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dv44pfwm7qsud43xheei.png)

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

## Got new ideas?

Did you know? You can add your theme and wordlist ideas into typing-test.

Here is how you can do it:

### **To add new theme:**

-   Add theme colors into `src/stylesheets/themes.scss` in following format:

```scss
.theme-name {
    --bg-color: background-color;
    --font-color: font-color;
    --hl-color: highlight-color;
    --fg-color: forground-color;
}
```

> **Note:**  
> `highlight-color` is used for caret, wrong characters, timer, selected and onhover colors  
> `forground-color` is used for correctly typed characters  
> _Using hex codes for colors is recommended_

### **To add new wordlist:**

-   Rename your wordlist as `<wordlist-name>.json` and place it inside `src/wordlists`.

> **Important:**  
> The JSON file should only contain single array of words/sentences.

### **Adding entry to options**

1. Add your theme/wordlist name into `src/components/Header.tsx` in options:

```tsx
export const options: Options = {
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
	type: ["words", "sentences", <wordlist-name>],
};
```

> **Important:**  
> The following should be always same:
>
> -   wordlist-name in `Header.tsx` and your wordlist file name
> -   theme-name in `themes.scss` and `Header.tsx`
>
> should always match otherwise themes won't work

2. Make a pull request

3. If it's good enough to merge, I'll merge it
