<template src="./template.html"></template>

<script>
//Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js';
//Import third party plugins
import 'froala-editor/js/languages/zh_tw';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg';
import Vue from 'vue';
Vue.use(VueFroala);
Vue.config.productionTip = false;

export default {
  props: {
    value: {
      require: true,
    },
  },
  data() {
    return {
      config: {
        events: {
          'image.uploaded': function(response) {
            // Parse response to get image url.
            console.log(response);
            console.log(response.link);
            var img_url =
              'https://api.yaowenfruit.com/' + JSON.parse(response).link;

            // Insert image.
            this.image.insert(img_url, false, null, this.image.get(), response);

            return false;
          },
          'image.inserted': function($img, response) {
            console.log($img, response);
            // Image was inserted in the editor.
          },
          'image.error': function(error, response) {
            console.log(error, response);
          },
        },
        imageUploadRemoteUrls: true,
        imageDefaultWidth: 0,
        language: 'zh_tw',
        pastePlain: true,
        toolbarButtons: [
          [
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'fontSize',
            'textColor',
            'backgroundColor',
            'emoticons',
            'paragraphFormat',
            'align',
            'formatOL',
            'formatUL',
            'insertHR',
            'insertLink',
            'insertImage',
            'insertVideo',
            'insertTable',
            'html',
            'clearFormatting',
          ],
        ],
        toolbarButtonsMD: [
          [
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'fontSize',
            'textColor',
            'backgroundColor',
            'paragraphFormat',
            'align',
            'formatOL',
            'formatUL',
            'insertLink',
            'insertImage',
            'insertVideo',
            'insertTable',
            'html',
            'clearFormatting',
          ],
        ],
        heightMin: 200,
        heightMax: 600,
        imageUploadURL: process.env.VUE_APP_BASE_API + 'editor/upload',
        imageUploadMethod: 'POST',
        imageStyles: {
          class1: 'Class 1',
          class2: 'Class 2',
        },
        requestHeaders: {
          Authorization: `${this.$cookie.get('account_token')}`,
          'Access-Control-Allow-Origin-Type': '*',
        },
      },
      model: 'Edit Your Content Here!',
    };
  },
  computed: {
    content: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  mounted() {},
};
</script>

<style>
.fr-toolbar .fr-command.fr-btn,
.fr-popup .fr-command.fr-btn,
.fr-modal .fr-command.fr-btn {
  height: 30px;
}

.fr-toolbar .fr-command.fr-btn i,
.fr-toolbar .fr-command.fr-btn svg,
.fr-popup .fr-command.fr-btn i,
.fr-popup .fr-command.fr-btn svg,
.fr-modal .fr-command.fr-btn i,
.fr-modal .fr-command.fr-btn svg {
  width: 18px;
  height: 18px;
  margin: 4px;
}

.fr-toolbar.fr-top {
  border-radius: 5px 5px 0 0;
}
.fr-second-toolbar {
  display: none;
}
.fr-wrapper {
  border-bottom: 1px solid #cccccc !important;
  border-radius: 0 0 5px 5px;
}
.fr-btn-grp .fr-float-left {
  margin: 0;
}

.fr-popup.fr-hidden.fr-active {
  opacity: 1;
}

/* .fr-fic {
  width: 100% !important;
} */
</style>
