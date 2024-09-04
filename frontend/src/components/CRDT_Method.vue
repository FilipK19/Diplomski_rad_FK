<template>
  <div>
    <TextToolbar :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import Code from '@tiptap/extension-code';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import Collaboration from '@tiptap/extension-collaboration';
import * as Y from 'yjs';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import TextToolbar from './TextToolbar.vue';

const doc = new Y.Doc();

export default {
  name: 'EditorComponent',
  components: {
    EditorContent,
    TextToolbar
  },
  setup() {
    const editor = useEditor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Heading.configure({ levels: [1, 2, 3] }),
        Bold,
        Italic,
        Underline,
        BulletList,
        OrderedList,
        ListItem,
        CodeBlock,
        Code,
        Link.configure({ openOnClick: true }),
        Collaboration.configure({
          document: doc,
        }),
      ],
      content: `
        <h1>Welcome to Tiptap Editor</h1>
        `,
    });

    onMounted(() => {
      new TiptapCollabProvider({
        name: 'document.crdt',
        appId: '7j9y6m10',
        token: 'notoken',
        document: doc,
      });
    });

    return { editor };
  }
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
