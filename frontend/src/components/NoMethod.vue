<template>
  <div class="editor-container">
    <TextToolbar :editor="editor" />
    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextToolbar from './TextToolbar.vue';

export default {
  components: {
    EditorContent,
    TextToolbar,
  },

  data() {
    return {
      editor: null,
      socket: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      content: `
        <p>
          Hello
        </p>
      `,
      extensions: [StarterKit],
      onUpdate: ({ editor }) => {
        const json = editor.getJSON();
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(json));
        }
      },
    });

    this.socket = new WebSocket('ws://localhost:8000/ws');
    this.socket.onmessage = (event) => {
      const json = JSON.parse(event.data);
      this.editor.commands.setContent(json);
    };

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  },

  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
    if (this.socket) {
      this.socket.close();
    }
  },
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
}

.editor-content .ProseMirror {
  min-height: 100%;
}
</style>
