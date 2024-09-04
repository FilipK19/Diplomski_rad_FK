<template>
  <div class="editor-container">
    <TextToolbar :editor="editor" />
    <editor-content :editor="editor" :class="{ locked: isLocked }" class="editor-content" />
  </div>
</template>

<script>
import { onMounted, ref, watch, onBeforeUnmount } from 'vue';
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
const lockingState = doc.getMap('lockingState');

export default {
  name: 'EditorComponent',
  components: {
    EditorContent,
    TextToolbar
  },
  setup() {
    const isLocked = ref(false);
    const editorId = ref(Math.random().toString(36).substring(2, 15));
    const editable = ref(true);
    let lockTimeout = null;

    // Create the editor instance
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
      editable: editable.value,
    });

    const initiateLock = () => {
      lockingState.set('lockedBy', editorId.value);
      lockingState.set('isLocked', true);
    };

    const releaseLock = () => {
      lockingState.set('isLocked', false);
      lockingState.set('lockedBy', null);
    };

    const resetLockTimeout = () => {
      if (lockTimeout) {
        clearTimeout(lockTimeout);
      }

      // Set a timeout to release the lock after a period of inactivity
      lockTimeout = setTimeout(() => {
        releaseLock();
      }, 3000);
    };

    const handleTypingStart = () => {
      if (!isLocked.value) {
        initiateLock();
      }

      resetLockTimeout();
    };

    onMounted(() => {
      new TiptapCollabProvider({
        name: 'document.locking',
        appId: '7j9y6m10',
        token: 'notoken',
        document: doc,
      });

      // Listen to 'beforeInput' and 'keydown' to catch when the user starts typing
      editor.value.view.dom.addEventListener('beforeinput', handleTypingStart);
      editor.value.view.dom.addEventListener('keydown', handleTypingStart);

      // Watch for changes in the locking state
      lockingState.observe(() => {
        const lockedByOther = lockingState.get('lockedBy') !== editorId.value;
        const lockedState = lockingState.get('isLocked') || false;

        isLocked.value = lockedState && lockedByOther;
        editable.value = !lockedState || (lockedState && !lockedByOther);
      });

      watch(editable, (newEditable) => {
        if (editor.value) {
          editor.value.setEditable(newEditable);
        }
      });
    });

    onBeforeUnmount(() => {
      if (lockTimeout) clearTimeout(lockTimeout);

      releaseLock();
    });

    return { editor, isLocked };
  }
}
</script>

<style lang="scss">
/* Basic editor container styles */
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Style for the editor content area */
.editor-content {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 600px;
  padding: 10px;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
}

/* Style for when the editor is locked */
.locked {
  pointer-events: none;
  background-color: #e0e0e0;
  cursor: not-allowed;
}

/* Overlay to cover the editor content when locked */
.editor-content.locked::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(224, 224, 224, 0.5); 
  z-index: 1;
}
</style>
