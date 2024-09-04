<!-- Toolbar.vue -->
<template>
    <div class="toolbar">
      <button @click="toggleBold">Bold</button>
      <button @click="toggleItalic">Italic</button>
      <button @click="toggleUnderline">Underline</button>
      <button @click="toggleHeading">Heading</button>
      <button @click="toggleBulletList">Bullet List</button>
      <button @click="toggleOrderedList">Ordered List</button>
      <button @click="toggleCodeBlock">Code Block</button>
      <button @click="toggleLink">Link</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      editor: Object
    },
    methods: {
      toggleBold() {
        this.editor.chain().focus().toggleBold().run();
      },
      toggleItalic() {
        this.editor.chain().focus().toggleItalic().run();
      },
      toggleUnderline() {
        this.editor.chain().focus().toggleUnderline().run();
      },
      toggleHeading() {
        this.editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
      toggleBulletList() {
        this.editor.chain().focus().toggleBulletList().run();
      },
      toggleOrderedList() {
        this.editor.chain().focus().toggleOrderedList().run();
      },
      toggleCodeBlock() {
        this.editor.chain().focus().toggleCodeBlock().run();
      },
      toggleLink() {
        const href = prompt('URL');
        if (href) {
          this.editor.chain().focus().setLink({ href }).run();
        } else {
          this.editor.chain().focus().unsetLink().run();
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Basic toolbar styles */
  .toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }
  </style>
  