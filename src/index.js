//@ts-check

import { config } from './config';
import { KurentoNode } from './kurento-node.class';
import { ui } from './ui'; // eslint-disable-line
import './files';

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
// const autoStart = document.getElementById('autostart');
// const record = document.getElementById('record');
const recordButton = document.getElementById('dorecord');

const videoInput = document.getElementById('videoInput');
const videoOutput = document.getElementById('videoOutput');


// config.resolved.then(main);
config.resolved.then(mainNode);

// function main() { // eslint-disable-line
  // const kurento = new Kurento({
  //   videoInput,
  //   videoOutput,
  // });

  // const actions = {
  //   startVideo() {
  //     startButton.classList.add('active');
  //     stopButton.classList.remove('active');

  //     kurento.createPipeline()
  //       .then(() => kurento.createRecorder());
  //   },

  //   stopVideo() {
  //     startButton.classList.remove('active');
  //     stopButton.classList.add('active');

  //     kurento.stop();
  //   },
  //   setAutostart() {
  //     config.set('isAutostart', this.checked);
  //   },
  //   setRecord() {
  //     config.set('isRecord', this.checked);
  //   },
  //   startRecord() {
  //     const dt = kurento.record();
  //     console.log(dt);

  //   },
  // };

  // startButton.addEventListener('click', actions.startVideo);
  // stopButton.addEventListener('click', actions.stopVideo);
  // recordButton.addEventListener('click', actions.startRecord);

  // autoStart.addEventListener('change', actions.setAutostart);
  // record.addEventListener('change', actions.setRecord);
// }

function mainNode() { // eslint-disable-line
  const kurento = new KurentoNode({
    videoInput,
    videoOutput,
  });
  //@ts-ignore
  window.kurento = kurento;

  const actions = {
    startVideo() {
      startButton.classList.add('active');
      kurento.start();
    },

    stopVideo() {
      startButton.classList.remove('active');
      recordButton.classList.remove('active');
      kurento.stop();
    },
    setAutostart() {
      config.set('isAutostart', this.checked);
    },
    setRecord() {
      config.set('isRecord', this.checked);
    },
    toggleRecord() {
      kurento.toggleRecord();
      if (kurento.isRecording) {
        recordButton.classList.add('active');
      } else {
        recordButton.classList.remove('active');
        ui.reset('recordButton');
      }
    },
  };

  startButton.addEventListener('click', actions.startVideo);
  stopButton.addEventListener('click', actions.stopVideo);
  recordButton.addEventListener('click', actions.toggleRecord);
}
