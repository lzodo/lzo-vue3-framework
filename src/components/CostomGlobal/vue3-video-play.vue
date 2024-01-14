<template>
  <div>
    <vue3VideoPlay
      v-bind="options"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @canplay="onCanplay"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
// 将package.json中 "module": "./dist/index.es.js"改为"module": "./dist/index.mjs"
import vue3VideoPlay from 'vue3-video-play'; // 引入组件
import 'vue3-video-play/dist/style.css'; // 引入css

const options = reactive({
  width: '800px', //播放器高度
  height: '450px', //播放器高度
  color: '#409eff', //主题色
  title: '', //视频名称
  src: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4', //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'], //显示所有按钮,
});

const onPlay = ev => {
  console.log('播放');
};
const onPause = ev => {
  console.log(ev, '暂停');
};

const onTimeupdate = ev => {
  console.log(ev, '时间更新');
};
const onCanplay = ev => {
  console.log(ev, '可以播放');
};
</script>

<style scoped></style>

<!-- 
<template>
  <div>
    <vue3videoPlay v-bind="options" poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const options = reactive({
  width: '800px', //播放器高度
  height: '450px', //播放器高度
  color: '#409eff', //主题色
  title: '', //视频名称
  src: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4', //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'], //显示所有按钮,
});
</script>

<style scoped></style> -->
