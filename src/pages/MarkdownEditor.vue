<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">
            <q-btn icon="format_bold" flat @click="applyFormat('bold')" />
            <q-btn icon="format_italic" flat @click="applyFormat('italic')" />
            <q-btn
              icon="format_list_bulleted"
              flat
              @click="applyFormat('ul')"
            />
            <q-btn
              icon="format_list_numbered"
              flat
              @click="applyFormat('ol')"
            />
            <q-btn label="yorum" flat @click="applyFormat('quote')" />
            <q-btn label="code" flat @click="applyFormat('code')" />
            <q-btn label="tablo" flat @click="applyFormat('table')" />
            <q-btn label="mark" flat @click="applyFormat('mark')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            <q-input type="textarea" v-model="markdownText" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-separator spaced />

    <q-markdown :plugins="plugins" :src="markdownText" show-copy />
  </div>
</template>

<script setup>
import { ref } from "vue";
import abbreviation from "markdown-it-abbr";
import deflist from "markdown-it-deflist";
import footnote from "markdown-it-footnote";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import taskLists from "markdown-it-task-lists";
import markdownItMermaid from "@datatraccorporation/markdown-it-mermaid";

const markdownText = ref("");

const plugins = [
  abbreviation,
  deflist,
  footnote,
  insert,
  mark,
  subscript,
  superscript,
  taskLists,
  markdownItMermaid,
];

const applyFormat = (type) => {
  switch (type) {
    case "bold":
      markdownText.value += "**kalın metin**";
      break;
    case "italic":
      markdownText.value += "*italik metin*";
      break;
    case "ul":
      markdownText.value += "\n- Liste öğesi";
      break;
    case "ol":
      markdownText.value += "\n1. Sıralı liste";
      break;
    case "quote":
      markdownText.value += "\n> Yorum";
      break;
    case "code":
      markdownText.value += "\`kod\`";
      break;
    case "table":
      markdownText.value += `| Option | Description |
| :----- | :---------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |`;
      break;
    case "mark":
      markdownText.value += "==marked==";
      break;
  }
};
</script>
