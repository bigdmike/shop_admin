import Vue from 'vue';
//Import Froala Editor
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/video.min.js';
//Import third party plugins
import 'froala-editor/js/languages/zh_tw';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/third_party/image_tui.min.css';

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg';
Vue.use(VueFroala);
