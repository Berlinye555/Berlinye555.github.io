// Language switch: EN <-> 中文 via Google Translate
(function() {
  var currentLang = 'zh-CN';
  var switchBtn = document.createElement('div');
  switchBtn.className = 'lang-switch-btn';
  switchBtn.title = 'Switch to English';
  switchBtn.innerHTML = '<i class=\"fas fa-language\"></i> <span>EN</span>';
  switchBtn.style.cssText = 'cursor:pointer;text-align:center;padding:8px 0;font-size:14px;color:var(--font-color);opacity:0.7;transition:opacity 0.3s';
  switchBtn.onmouseenter = function() { this.style.opacity = '1'; };
  switchBtn.onmouseleave = function() { this.style.opacity = '0.7'; };

  function loadGoogleTranslate() {
    if (document.getElementById('google-translate-script')) return;
    var script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
    document.body.appendChild(script);
  }

  window.googleTranslateInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'zh-CN',
      includedLanguages: 'zh-CN,en',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_hidden');
  };

  switchBtn.onclick = function() {
    var hidden = document.getElementById('google_translate_hidden');
    if (!hidden) {
      hidden = document.createElement('div');
      hidden.id = 'google_translate_hidden';
      hidden.style.display = 'none';
      document.body.appendChild(hidden);
      loadGoogleTranslate();
    }

    if (currentLang === 'zh-CN') {
      // Switch to English - trigger Google Translate
      var select = document.querySelector('#google_translate_hidden select');
      if (select) { select.value = 'en'; select.dispatchEvent(new Event('change')); }
      switchBtn.querySelector('span').textContent = '中';
      switchBtn.title = '切换到中文';
      currentLang = 'en';
    } else {
      // Switch back to Chinese - reload page
      window.location.reload();
    }
  };

  // Insert into rightside menu after page load
  function insertBtn() {
    var rightside = document.getElementById('rightside');
    if (rightside) {
      rightside.insertBefore(switchBtn, rightside.firstChild);
    } else {
      setTimeout(insertBtn, 500);
    }
  }
  document.addEventListener('DOMContentLoaded', insertBtn);
})();
