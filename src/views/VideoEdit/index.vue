<template src="./template.html"></template>
<script>
import FroalaEditor from '@/components/FroalaEditor/';
import Breadcrumb from '@/components/Breadcrumb/';
import MainImageCard from '@/components/MainImageCard/';
import DeleteDialog from '@/components/MainDeleteDialog';
import { recacheVideo } from '@/api/prerender.js';
import {
  get_all_data,
  update_video,
  create_video,
  update_video_image,
  delete_video,
} from '@/api/video';
export default {
  name: 'VideoEdit',
  components: {
    FroalaEditor,
    Breadcrumb,
    MainImageCard,
    DeleteDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '影音相簿',
          link: '/video',
        },
        {
          title: '影片編輯',
          link: '',
        },
      ],
      category_data: null,
      video_data: null,
      edit_mode: 'edit',
    };
  },
  methods: {
    GetVideoData() {
      get_all_data().then((res) => {
        this.category_data = res[0].data;
        let tmp_video_data = res[1].data.filter(
          (item) => item.VideoID == this.$route.params.id
        );
        if (tmp_video_data.length <= 0 || this.$route.params.id == 'new') {
          this.edit_mode = 'create';
          this.InitVideoData();
        } else {
          tmp_video_data = tmp_video_data[0];
          tmp_video_data.ID = tmp_video_data.VideoID;
          tmp_video_data.CategoryID = tmp_video_data.VideoCategoryID;
          tmp_video_data = this.$SetImageObj(
            tmp_video_data,
            tmp_video_data.Image1
          );
          this.video_data = tmp_video_data;
        }
      });
    },
    InitVideoData() {
      let tmp_video_data = {
        ID: 0,
        CategoryID: this.category_data[0].VideoCategoryID,
        Title: '',
        Content1: '',
        Content2: '',
        Seq: 0,
      };
      tmp_video_data = this.$SetImageObj(tmp_video_data, '');
      this.video_data = tmp_video_data;
    },
    Validate() {
      let error_msg = '';
      if (this.video_data.Title == '') {
        error_msg += '- 請輸入影片標題 <br>';
      }
      if (this.video_data.Content1 == '') {
        error_msg += '- 請輸入影片內容 <br>';
      }
      if (this.video_data.VideoCategoryID == '') {
        error_msg += '- 請選擇影片分類 <br>';
      }

      if (error_msg == '') {
        return true;
      } else {
        error_msg = '無法儲存影片請修正以下問題：<br>' + error_msg;
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          Content: error_msg,
          status: true,
        });
        return false;
      }
    },
    UpdateData() {
      let validate = this.Validate();
      if (validate) {
        if (this.edit_mode == 'edit') {
          update_video(this.video_data).then(() => {
            if (this.video_data.Image1 != null) {
              this.UpdateImage();
            } else {
              recacheVideo(this.video_data.VideoID).then(() => {
                this.$router.push('/video');
              });
            }
          });
        } else {
          create_video(this.video_data).then((res) => {
            this.video_data.VideoID = res.data.VideoID;
            this.video_data.ID = res.data.VideoID;
            if (this.video_data.Image1 != null) {
              this.UpdateImage();
            } else {
              recacheVideo(this.video_data.VideoID).then(() => {
                this.$router.push('/video');
              });
            }
          });
        }
      }
    },
    UpdateImage() {
      update_video_image(this.video_data.ID, this.video_data).then(() => {
        recacheVideo(this.video_data.VideoID).then(() => {
          this.$router.push('/video');
        });
      });
    },
    CancelEdit() {
      this.$router.push('/video');
    },
    ChangeImage(val) {
      this.$set(this.video_data, 'PreviewImage', val.preview_url);
      this.$set(this.video_data, 'Image1', val.file);
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.video_data.ID);
    },
    DeleteData(id) {
      this.$refs.DeleteDialog.Cancel();
      delete_video(id).then(() => {
        this.$router.push('/video');
      });
    },
  },
  created() {
    this.GetVideoData();
  },
};
</script>
