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
    }
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
})(document, 'script');

// Listen for the Voiceflow widget's close event to hide the launcher
window.addEventListener('message', function(event) {
  try {
    var data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    if (data && data.type === 'voiceflow:close') {
      var vf = window.voiceflow && window.voiceflow.chat;
      if (vf) vf.hide();
      document.body.classList.remove('vf-chat-open');
      var el = document.getElementById('voiceflow-chat');
      if (el) el.style.setProperty('display', 'none', 'important');
    }
  } catch (e) {
    // ignore non-JSON messages
  }
});

// Opens the Voiceflow chat when the user clicks "Try It"
window.openVoiceflowChat = function() {
  var vf = window.voiceflow && window.voiceflow.chat;
  if (!vf) return;

  var el = document.getElementById('voiceflow-chat');
  if (el) el.style.removeProperty('display');

  document.body.classList.add('vf-chat-open');
  vf.show();
  vf.open();
};
