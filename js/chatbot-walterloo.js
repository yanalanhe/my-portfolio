(function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '697a459ccb2e0f53f3e96646' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com"
        }
      });
      // Hide the widget launcher so it only appears via "Try It" button
      setTimeout(function() { window.voiceflow.chat.hide(); }, 1000);
    }
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
})(document, 'script');

// Opens the Voiceflow chat and hides the widget again when the user closes it
window.openVoiceflowChat = function() {
  var vf = window.voiceflow && window.voiceflow.chat;
  if (!vf) return;
  vf.show();
  vf.open();

  // Poll to detect when the chat dialog is closed, then hide the launcher
  var opened = false;
  var pollId = setInterval(function() {
    var el = document.getElementById('voiceflow-chat');
    if (!el) { clearInterval(pollId); return; }
    var rect = el.getBoundingClientRect();
    if (rect.height > 200) {
      opened = true;
    } else if (opened && rect.height < 100) {
      vf.hide();
      clearInterval(pollId);
    }
  }, 300);
};
