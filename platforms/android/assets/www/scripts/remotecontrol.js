!function(e){function n(e,n){var t=MediaController.getPlayerInfo().id,i=e.ids||e.items.map(function(e){return e.Id}),o={ItemIds:i.join(","),PlayCommand:n};e.startPositionTicks&&(o.startPositionTicks=e.startPositionTicks),ApiClient.sendPlayCommand(t,o)}function t(e,n){var t=MediaController.getPlayerInfo().id;ApiClient.sendPlayStateCommand(t,e,n)}function i(){function i(e,n){var t={Name:e};n&&(t.Arguments=n),u.sendCommand(t)}function a(){if(!ApiClient.isWebSocketOpen()){var n=e.ApiClient;n&&n.getSessions().then(s)}}function r(){u.isUpdating=!0,ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SessionsStop"),l&&(clearInterval(l),l=null)}var u=this;u.name="Remote Control",u.sendCommand=function(e){var n=MediaController.getPlayerInfo().id;ApiClient.sendCommand(n,e)},u.play=function(e){n(e,"PlayNow")},u.shuffle=function(e){n({ids:[e]},"PlayShuffle")},u.instantMix=function(e){n({ids:[e]},"PlayInstantMix")},u.queue=function(e){n(e,"PlayNext")},u.queueNext=function(e){n(e,"PlayLast")},u.canQueueMediaType=function(e){return"Audio"==e||"Video"==e},u.stop=function(){t("stop")},u.nextTrack=function(){t("nextTrack")},u.previousTrack=function(){t("previousTrack")},u.seek=function(e){t("seek",{SeekPositionTicks:e})},u.pause=function(){t("Pause")},u.unpause=function(){t("Unpause")},u.mute=function(){i("Mute")},u.unMute=function(){i("Unmute")},u.toggleMute=function(){i("ToggleMute")},u.setVolume=function(e){i("SetVolume",{Volume:e})},u.volumeUp=function(){i("VolumeUp")},u.volumeDown=function(){i("VolumeDown")},u.toggleFullscreen=function(){i("ToggleFullscreen")},u.setAudioStreamIndex=function(e){i("SetAudioStreamIndex",{Index:e})},u.setSubtitleStreamIndex=function(e){i("SetSubtitleStreamIndex",{Index:e})},u.setRepeatMode=function(e){i("SetRepeatMode",{RepeatMode:e})},u.displayContent=function(e){i("DisplayContent",e)},u.getPlayerState=function(){return new Promise(function(n){var t=e.ApiClient;t?t.getSessions().then(function(e){var t=MediaController.getPlayerInfo().id,i=e.filter(function(e){return e.Id==t})[0];i&&(i=o(i)),n(i)}):n({})})};var l;u.subscribeToPlayerUpdates=function(){u.isUpdating=!0,ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SessionsStart","100,800"),l&&(clearInterval(l),l=null),l=setInterval(a,5e3)};var c=0;u.beginPlayerUpdates=function(){0>=c&&(c=0,u.subscribeToPlayerUpdates()),c++},u.endPlayerUpdates=function(){c--,0>=c&&(r(),c=0)},u.getTargets=function(){return new Promise(function(n,t){var i={ControllableByUserId:Dashboard.getCurrentUserId()},o=e.ApiClient;o?o.getSessions(i).then(function(e){var t=e.filter(function(e){return e.DeviceId!=o.deviceId()}).map(function(e){return{name:e.DeviceName,deviceName:e.DeviceName,id:e.Id,playerName:u.name,appName:e.Client,playableMediaTypes:e.PlayableMediaTypes,isLocalPlayer:!1,supportedCommands:e.SupportedCommands}});n(t)},function(){t()}):n([])})},u.tryPair=function(){return new Promise(function(e){e()})}}function o(e){return e}function a(e,n){Events.trigger(c,e,[o(n)])}function r(){c.isUpdating&&c.subscribeToPlayerUpdates()}function s(e){var n=MediaController.getPlayerInfo().id,t=e.filter(function(e){return e.Id==n})[0];t&&a("playstatechange",t)}function u(e,n){var t=this;"Sessions"===n.MessageType?s(n.Data):"SessionEnded"===n.MessageType?MediaController.getPlayerInfo().id==n.Data.Id&&MediaController.setDefaultPlayerActive():"PlaybackStart"===n.MessageType?n.Data.DeviceId!=t.deviceId()&&MediaController.getPlayerInfo().id==n.Data.Id&&a("playbackstart",n.Data):"PlaybackStopped"===n.MessageType&&n.Data.DeviceId!=t.deviceId()&&MediaController.getPlayerInfo().id==n.Data.Id&&a("playbackstop",n.Data)}function l(e){Events.on(e,"websocketmessage",u),Events.on(e,"websocketopen",r)}var c=new i;MediaController.registerPlayer(c),e.ApiClient&&l(e.ApiClient),Events.on(ConnectionManager,"apiclientcreated",function(e,n){l(n)})}(window,document);