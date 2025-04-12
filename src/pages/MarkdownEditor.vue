<template>
  <div class="q-pa-md">
    <div>
      <div align="center">
        <q-btn
          class="q-mr-sm"
          :color="mode === 'both' ? 'primary' : 'grey'"
          icon="format_indent_increase"
          @click="modeChange('both')"
          ><q-tooltip class="bg-teal shadow-4" :offset="[10, 10]">
            Tümü
          </q-tooltip></q-btn
        >
        <q-btn
          class="q-mr-sm"
          :color="mode === 'edit' ? 'primary' : 'grey'"
          icon="edit"
          @click="modeChange('edit')"
          ><q-tooltip class="bg-teal shadow-4" :offset="[10, 10]">
            Düzenleme
          </q-tooltip></q-btn
        >
        <q-btn
          :color="mode === 'preview' ? 'primary' : 'grey'"
          icon="preview"
          @click="modeChange('preview')"
        >
          <q-tooltip class="bg-teal shadow-4" :offset="[10, 10]">
            Önizleme
          </q-tooltip></q-btn
        >
      </div>
      <q-splitter
        v-show="mode === 'both'"
        v-model="splitterModel"
        style="height: 700px"
      >
        <template v-slot:before>
          <div class="q-pa-md">
            <div class="text-h4 q-mb-md">
              <q-badge
                outline
                :color="mode === 'edit' || mode === 'both' ? 'primary' : 'grey'"
                label="Düzenleme"
              />
            </div>
            <div class="q-my-md">
              <q-markup-table class="no-shadow">
                <thead>
                  <tr>
                    <th class="text-left">
                      <q-btn
                        size="sm"
                        icon="format_bold"
                        flat
                        @click="applyFormat('bold')"
                      />
                      <q-btn
                        size="sm"
                        icon="format_italic"
                        flat
                        @click="applyFormat('italic')"
                      />
                      <q-btn
                        size="sm"
                        icon="format_list_bulleted"
                        flat
                        @click="applyFormat('ul')"
                      />
                      <q-btn
                        size="sm"
                        icon="format_list_numbered"
                        flat
                        @click="applyFormat('ol')"
                      />
                      <q-btn
                        size="sm"
                        label="yorum"
                        flat
                        @click="applyFormat('quote')"
                      />
                      <q-btn
                        size="sm"
                        label="code"
                        flat
                        @click="applyFormat('code')"
                      />
                      <q-btn
                        size="sm"
                        label="tablo"
                        flat
                        @click="applyFormat('table')"
                      />
                      <q-btn
                        size="sm"
                        label="mark"
                        flat
                        @click="applyFormat('mark')"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">
                      <q-input
                        style="
                          height: auto;
                          border-bottom: none;

                          resize: vertical;
                        "
                        rows="28"
                        type="textarea"
                        v-model="markdownText"
                        ref="inputField"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </template>

        <template v-slot:separator>
          <q-avatar
            color="primary"
            text-color="white"
            size="40px"
            icon="drag_indicator"
          />
        </template>

        <template v-slot:after>
          <div class="q-pa-md">
            <div class="text-h4 q-mb-md">
              <q-badge
                outline
                :color="
                  mode === 'preview' || mode === 'both' ? 'primary' : 'grey'
                "
                label="Önizleme"
              />
            </div>
            <div class="q-my-md">
              <q-markdown :plugins="plugins" :src="markdownText" />
            </div>
          </div>
        </template>
      </q-splitter>
      <div class="q-pa-md" v-show="mode === 'edit'">
        <div class="text-h4 q-mb-md">
          <q-badge
            outline
            :color="mode === 'edit' || mode === 'both' ? 'primary' : 'grey'"
            label="Düzenleme"
          />
        </div>
        <div class="q-my-md">
          <q-markup-table class="no-shadow">
            <thead>
              <tr>
                <th class="text-left">
                  <q-btn
                    size="sm"
                    icon="format_bold"
                    flat
                    @click="applyFormat('bold')"
                  />
                  <q-btn
                    size="sm"
                    icon="format_italic"
                    flat
                    @click="applyFormat('italic')"
                  />
                  <q-btn
                    size="sm"
                    icon="format_list_bulleted"
                    flat
                    @click="applyFormat('ul')"
                  />
                  <q-btn
                    size="sm"
                    icon="format_list_numbered"
                    flat
                    @click="applyFormat('ol')"
                  />
                  <q-btn
                    size="sm"
                    label="yorum"
                    flat
                    @click="applyFormat('quote')"
                  />
                  <q-btn
                    size="sm"
                    label="code"
                    flat
                    @click="applyFormat('code')"
                  />
                  <q-btn
                    size="sm"
                    label="tablo"
                    flat
                    @click="applyFormat('table')"
                  />
                  <q-btn
                    size="sm"
                    label="mark"
                    flat
                    @click="applyFormat('mark')"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">
                  <q-input
                    style="
                      height: auto;
                      border-bottom: none;

                      resize: vertical;
                    "
                    rows="28"
                    type="textarea"
                    v-model="markdownText"
                    ref="inputField"
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
      <div class="q-pa-md" v-show="mode === 'preview'">
        <div class="text-h4 q-mb-md">
          <q-badge
            outline
            :color="mode === 'preview' || mode === 'both' ? 'primary' : 'grey'"
            label="Önizleme"
          />
        </div>
        <div class="q-my-md">
          <q-markdown :plugins="plugins" :src="markdownText" />
        </div>
      </div>
    </div>

    <!-- 

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

    <q-markdown :plugins="plugins" :src="markdownText" show-copy /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import abbreviation from "markdown-it-abbr";
import deflist from "markdown-it-deflist";
import footnote from "markdown-it-footnote";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import taskLists from "markdown-it-task-lists";
import markdownItMermaid from "@datatraccorporation/markdown-it-mermaid";
onMounted(() => {
  // Set the default mode to "edit"
  mode.value = "both";
  splitterModel.value = 50;
  // Eğer sayfa yenilendiğinde daha önce kaydedilmiş veriyi almak isterseniz
if (localStorage.getItem('markdownText')) {
  markdownText.value = localStorage.getItem('markdownText');
}
});
const mode = ref("both");
const splitterModel = ref(50);
const markdownText = ref(`**ÖRNEK METİN**
> Yorum \`kod örneği\`  \`anahtar kelime\`  \`not\`  gibi metinleri burada girebilirsiniz.  ==Mark== özelliği ile önemli metinleri  işaretleyebilirsiniz.

| Option | Description |
| :----- | :---------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

`);
const inputField = ref(null);
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

const modeChange = (item) => {
  console.log("item", item);
  if (item === "edit") {
    console.log("dfsdlfhdsfj");
    mode.value = "edit";
    splitterModel.value = 100;
  } else if (item === "preview") {
    mode.value = "preview";
    splitterModel.value = 0;
  } else if (item === "both") {
    mode.value = "both";
    splitterModel.value = 50;
  }
};
// Apply formatting at the cursor position
const applyFormat = (type) => {
  const inputElement = inputField.value.$el.querySelector("textarea");
  const selectionStart = inputElement.selectionStart;
  const selectionEnd = inputElement.selectionEnd;
  let newText = "";

  switch (type) {
    case "bold":
      newText = "**kalın metin**";
      break;
    case "italic":
      newText = "*italik metin*";
      break;
    case "ul":
      newText = "\n- Liste öğesi";
      break;
    case "ol":
      newText = "\n1. Sıralı liste";
      break;
    case "quote":
      newText = "\n> Yorum";
      break;
    case "code":
      newText = " \`kod\` ";
      break;
    case "table":
      newText = `\n\n| Option | Description |
| :----- | :---------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |\n\n`;
      break;
    case "mark":
      newText = " ==marked== ";
      break;
  }

  // Insert the text at the cursor position
  const beforeText = markdownText.value.slice(0, selectionStart);
  const afterText = markdownText.value.slice(selectionEnd);
  markdownText.value = beforeText + newText + afterText;

  // Place the cursor after the inserted text
  setTimeout(() => {
    inputElement.selectionStart = inputElement.selectionEnd =
      selectionStart + newText.length;
  }, 0);
};
watch(markdownText, (newValue) => {
  localStorage.setItem('markdownText', newValue);
});
</script>
<style scoped>
/* ::v-deep(.q-textarea .q-field__native ){
  line-height: 48px;

} */
</style>
