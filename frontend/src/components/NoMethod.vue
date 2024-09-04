<template>
    <div>
    <TextToolbar :editor="editor" />
    <editor-content :editor="editor" />
  </div>
  </template>
  
  <script>
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import TextToolbar from './TextToolbar.vue';
  
  export default {
    components: {
      EditorContent,
      TextToolbar
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
              This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
            </p>
            <p>
              The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
            </p>
          `,
        extensions: [StarterKit],
        onUpdate: ({ editor }) => {
          const json = editor.getJSON()
          if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(json))
          }
        },
      })
  
      this.socket = new WebSocket('ws://localhost:8000/ws')
      this.socket.onmessage = (event) => {
        const json = JSON.parse(event.data)
        this.editor.commands.setContent(json)
      }
  
      this.socket.onopen = () => {
        console.log('WebSocket connection established')
      }
  
      this.socket.onclose = () => {
        console.log('WebSocket connection closed')
      }
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    },
  
    beforeUnmount() {
      this.editor.destroy()
      if (this.socket) {
        this.socket.close()
      }
    },
  }
  </script>
  