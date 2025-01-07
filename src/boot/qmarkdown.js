import { defineBoot } from '#q-app/wrappers'
import Plugin from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'


export default defineBoot(({ app }) => {
  app.use(Plugin)
})