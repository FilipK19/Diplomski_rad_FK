<template>
  <editor-content :editor="editor" />
</template>


<script>
import { onMounted } from 'vue'
// If you don't have a styles.scss file, remove this line
//import './styles.scss'

// Tiptap and Yjs imports
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'

// Hocuspocus provider import
import { TiptapCollabProvider } from '@hocuspocus/provider'

const doc = new Y.Doc()

export default {
  name: 'TextTest',
  setup() {
    const editor = useEditor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Collaboration.configure({
          document: doc,
        }),
      ],
      content: `
        <p>
          This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
        </p>
        <p>
          The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
        </p>
      `,
    })

    onMounted(() => {
      new TiptapCollabProvider({
        name: 'document.name', // Unique document identifier for syncing. This is your document name.
        appId: '7j9y6m10', // Your Cloud Dashboard AppID or `baseURL` for on-premises
        token: 'notoken', // Your JWT token
        document: doc,
      })
    })

    return { editor }
  },
  components: {
    EditorContent,
  },
}
</script>


<style lang="scss">
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }
}
</style>

