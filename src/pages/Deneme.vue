<template>
  <div>

    <q-markdown :plugins="plugins" :src="body" >

      
    </q-markdown>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown/src/QMarkdown.js";
import abbreviation from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
import emoji from 'markdown-it-emoji/dist/markdown-it-emoji.js'
import footnote from 'markdown-it-footnote'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import taskLists from 'markdown-it-task-lists'
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

const plugins= [abbreviation,deflist,emoji,footnote,insert,mark,subscript,superscript,taskLists,markdownItMermaid];
const body = ref(null);
onMounted(() => {
  body.value = `


\`\`\`mermaid

graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhone]
C -->|Three| F[Car]


\`\`\`

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!...

!!!!!! ???? ,,  -- ---

Smartypants: "double quotes" and 'single quotes'

[External Link](https://github.com/quasarframework/quasar)

[local link](/demo)

[anchor link](#example-Containers)

[link with title](https://github.com/quasarframework/quasar/ "title text!")

Auto-converted link: https://github.com/quasarframework/quasar



Max fixed size image: 200x200; responsive
![Minion](https://octodex.github.com/images/minion.png =200x200)

==This sentence is marked.==

This is ==marked== in the middle of a sentence.

- 19^th^
- H~2~O


> Sen Ne Dedin

## Hello Canım

Ben seni severim

1st way

___

2nd way

---

3rd way

***



1st way (with text)
___

2nd way (with text, becomes an anchor link)
---

3rd way (with text)
***

:::
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: info
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: info With Custom Title
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: tip
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::


::: danger Embedable
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
  ::: warning
  here be **dragons**
  with a \`token\` and a [link](https://quasar.dev)
::::::

\`\`\`js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`



> This is a Blockquote
> with a \`token\` and a [link](https://quasar.dev)

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.



Ordered

1. Create an ordered list by starting a line with a number (ie: '1.')
2. Lorem ipsum dolor sit amet
3. Consectetur adipiscing elit
4. Integer molestie lorem at massa
---

1. You can use sequential numbers...
1. ...or keep all the numbers as '1.'
indented
1. List with a container
    ::: info
    use 3 or more spaces
    :::

- 19^th^
- H~2~O


Left aligned columns

| Option | Description |
| :----- | :---------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
    


### Solar System Exploration, 1950s – 1960s

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley

Titles become anchor links

Top-Level Title
===

Second-Level Title
---


Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum: :sunny:

Shortcuts (emoticons): :-) :-( 8-) ;)


Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have \`markup\`**
  and multiple paragraphs.

[^second]: Footnote text.




`;
});
</script>
