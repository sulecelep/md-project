<template>
  <div class="q-pa-md">
    <q-card class="no-shadow">
      <q-card-section>
        <div class="text-h6">Text Editor</div>
      </q-card-section>

      <q-card-section>
        <!-- Özel Toolbar -->
        <div class="custom-toolbar q-mb-md">
          <q-btn flat dense round icon="image" @click="showImageModal = true" />
        </div>

        <!-- Kullanıcı Markdown Bilmeden İçeriği Şekillendirir -->
        <q-editor
          v-model="editorContent"
          :toolbar="[
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify'],
              },
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                options: ['left', 'center', 'right', 'justify'],
              },
            ],
            [
              'bold',
              'italic',
              'strike',
              'underline',
              'subscript',
              'superscript',
            ],
            ['token', 'hr', 'link', 'custom_btn'],
            ['print', 'fullscreen'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7',
                ],
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana',
                ],
              },
              'removeFormat',
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo'],
            ['viewsource'],
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana',
          }"
          min-height="200px"
          @update:model-value="handleEditorUpdate"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="İptal" v-close-popup />
        <q-btn
          flat
          label="Kaydet"
          color="primary"
          @click="convertToMarkdown"
          v-close-popup
        />
      </q-card-actions>
    </q-card>

    <!-- Kullanıcıya URL soran modal -->
    <q-dialog v-model="showImageModal">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Resim URL'si Ekle</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="imageUrl" label="Resim URL'si" filled />
          <q-input
            v-model="imageWidth"
            label="Genişlik (px veya %)"
            filled
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" v-close-popup />
          <q-btn
            flat
            label="Ekle"
            color="primary"
            @click="insertImage"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div v-html="editorContent"></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const showModal = ref(false);
const editorContent = ref(""); // Kullanıcının girdiği zengin metin
const markdownText = ref(""); // Markdown formatında metin
// Özel Toolbar Tanımı
const showImageModal = ref(false); // Resim ekleme modalı
const imageUrl = ref(""); // Kullanıcının girdiği resim URL'si

// Özel Toolbar Tanımı (Görünmeyen "image" butonu için özel işlem gerekir)
const customToolbar = [
  ["bold", "italic", "underline"], // Metin stilleri
  [{ header: 1 }, { header: 2 }], // Başlık seviyeleri
  ["link"], // Quasar'da varsayılan olarak desteklenen butonlar
  [
    {
      icon: "image", // Quasar icon kullanımı
      handler: () => (showImageModal.value = true), // Modalı aç
    },
  ],
];
const imageWidth = ref(null);
// Resim ekleme fonksiyonu
const insertImage = () => {
  if (imageUrl.value.trim()) {
    let style = `max-width: 100%; height: auto;`;

    // Kullanıcı genişlik belirttiyse ekle
    if (imageWidth.value.trim()) {
      style += ` width: ${imageWidth.value.trim()};`;
    }

    // Resmi editöre ekle
    const imgTag = `<img src="${imageUrl.value}" style="${style}" />`;
    editorContent.value += imgTag;

    // Inputları temizle
    imageUrl.value = "";
    imageWidth.value = "100%"; // Varsayılan geri dön
  }
};

// Quill'in toolbar butonlarını güncellemek için bir işlev
const handleEditorUpdate = (value) => {
  editorContent.value = value;
};
// HTML içeriğini Markdown'a çeviren fonksiyon
const convertToMarkdown = () => {
  markdownText.value = editorContent.value;
  console.log("markdownText.value", markdownText.value);
};

watch(
  () => editorContent.value,
  (newValue) => {
    console.log("newValue", newValue);
  }
);
</script>

<style scoped>
/* Özel toolbar için stil */
.custom-toolbar {
  display: flex;
  gap: 8px;
}
</style>
