<template>
  <div class="quill-main">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @focus="onEditorFocus($event)"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; // 调用富文本编辑器
import "quill/dist/quill.snow.css"; // 富文本编辑器外部引用样式  三种样式三选一引入即可
import * as Quill from "quill"; // 富文本基于quill
export default {
  name: "quill",
  props:{
    content: String
  },
  components: {
    quillEditor
  },

  data() {
    return {
      // content: ``, // 富文本编辑器默认内容
      editorOption: {
        minHeight: "200px",
         language: "zh",
      }
    };
  },
  methods: {
    onEditorFocus(editor) {},
    onEditorBlur(editor) {},
    onEditorChange(editor) {}
  }
};
</script>

<style lang='scss' scoped>
</style>
