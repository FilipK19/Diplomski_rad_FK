<template>
    <div>
      <editor-content :editor="editor" :class="{ locked: isLocked }" />
    </div>
  </template>
  
  <script>
  import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
  import Document from '@tiptap/extension-document'
  import Paragraph from '@tiptap/extension-paragraph'
  import Text from '@tiptap/extension-text'
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import Collaboration from '@tiptap/extension-collaboration'
  import * as Y from 'yjs'
  import { TiptapCollabProvider } from '@hocuspocus/provider'
  
  const doc = new Y.Doc()
  const lockingState = doc.getMap('lockingState')
  
  export default {
    name: 'TextTest',
    setup() {
      const isLocked = ref(false)
      const editorId = ref(Math.random().toString(36).substring(2, 15))
      const editable = ref(true)
      let lockTimeout = null
  
      // Create the editor instance
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
        editable: editable.value,
      })
  
      const initiateLock = () => {
        lockingState.set('lockedBy', editorId.value)
        lockingState.set('isLocked', true)
      }
  
      const releaseLock = () => {
        lockingState.set('isLocked', false)
        lockingState.set('lockedBy', null)
      }
  
      const resetLockTimeout = () => {
        if (lockTimeout) {
          clearTimeout(lockTimeout)
        }
  
        // Set a timeout to release the lock after a period of inactivity
        lockTimeout = setTimeout(() => {
          releaseLock()
        }, 3000)
      }
  
      const handleTypingStart = () => {
        if (!isLocked.value) {
          initiateLock()
        }
  
        resetLockTimeout()
      }
  
      onMounted(() => {
        new TiptapCollabProvider({
          name: 'document.name',
          appId: '7j9y6m10',
          token: 'notoken',
          document: doc,
        })
  
        // Listen to 'beforeInput' to catch when the user starts typing
        editor.value.view.dom.addEventListener('beforeinput', handleTypingStart)
        editor.value.view.dom.addEventListener('keydown', handleTypingStart)
  
        // Watch for changes in the locking state
        lockingState.observe(() => {
          const lockedByOther = lockingState.get('lockedBy') !== editorId.value
          const lockedState = lockingState.get('isLocked') || false
  
          isLocked.value = lockedState && lockedByOther
          editable.value = !lockedState || (lockedState && !lockedByOther)
        })
  
        watch(editable, (newEditable) => {
          if (editor.value) {
            editor.value.setEditable(newEditable)
          }
        })
      })
  
      onBeforeUnmount(() => {
        if (lockTimeout) clearTimeout(lockTimeout)
  
        releaseLock()
      })
  
      return { editor, isLocked }
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
  
  /* Add styles for when the editor is locked */
  .locked {
    pointer-events: none;
    background-color: #e0e0e0; /* Greyed out */
    cursor: not-allowed;
  }
  </style>
  