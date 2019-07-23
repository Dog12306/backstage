<template>
  <div class="tui-main">
    <editor
      :value="editorText"
      :options="editorOptions"
      :html="editorHtml"
      :visible="editorVisible"
      previewStyle="vertical"
      height="500px"
      mode="markdown"
    ></editor>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
export default {
  name: "tui",
  props:{
    editorText: String
  },
  components: {
    Editor
  },

  data() {
    return {
      // editorText: "",
      editorOptions: {
        minHeight: "200px",
        previewStyle: "vertical",
        language: "zh",
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: false,
        hideModeSwitch: false,
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
          "image",
          "link",
          "divider",
          "code",
          "codeblock"
        ]
      },
      editorHtml: "",
      editorVisible: true
    };
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
</style>
