(function () {
  "use strict";
  var config = window.VOROTA_CONFIG;
  if (!config) return;
  var company = config.company;
  var currentPath = normalizePath(window.location.pathname);
  document.documentElement.classList.add("has-js");

  function normalizePath(path) {
    var value = path || "/";
    if (value.charAt(value.length - 1) !== "/") value += "/";
    return value;
  }

  function socialLinksMarkup(className, withLabel) {
    var links = [
      { key: "telegram", label: "Telegram", mark: "TG", cls: "telegram" },
      { key: "whatsapp", label: "WhatsApp", mark: "WA", cls: "whatsapp" },
      { key: "max", label: "MAX", mark: "M", cls: "max" }
    ];
    return '<div class="' + className + '" role="group" aria-label="Написать нам">' +
      (withLabel ? '<p class="hero-socials-label">Написать нам</p>' : "") +
      links.map(function (item) {
        return '<a class="social-link social-link--' + item.cls + '" href="' + config.socials[item.key] + '" target="_blank" rel="noopener noreferrer" data-track="messenger" aria-label="Написать в ' + item.label + '">' +
          '<span class="social-mark" aria-hidden="true">' + item.mark + '</span><span>' + item.label + '</span><span aria-hidden="true">↗</span></a>';
      }).join("") +
    '</div>';
  }

  function setupSocialEntryPoints() {
    var heroActions = document.querySelector(".hero .hero-actions, .page-hero .page-actions");
    if (heroActions) heroActions.insertAdjacentHTML("afterend", socialLinksMarkup("hero-socials", true));
    var contactPanel = document.querySelector(".contact-hero-panel");
    if (contactPanel && !heroActions) contactPanel.insertAdjacentHTML("beforeend", socialLinksMarkup("hero-socials", true));
  }

  function renderShell() {
    var headerHost = document.querySelector("[data-site-header]");
    var footerHost = document.querySelector("[data-site-footer]");
    if (headerHost) {
      headerHost.innerHTML =
        '<a class="skip-link" href="#main">Перейти к содержимому</a>' +
        '<header class="site-header"><div class="header-row">' +
          '<a class="brand capsule" href="/" aria-label="Концепция Строительства — на главную">' +
            '<img src="/assets/logo-icon-orange.png" width="40" height="40" alt="" />' +
            '<span class="brand-name">КОНЦЕПЦИЯ<br /><b>СТРОИТЕЛЬСТВА</b></span>' +
          '</a>' +
          '<nav class="main-nav capsule" aria-label="Основная навигация">' +
            navLink("/otkatnye/", "Откатные") +
            navLink("/raspashnye/", "Распашные") +
            navLink("/zabory/", "Заборы") +
            navLink("/avtomatika/", "Автоматика") +
            navLink("/raboty/", "Работы") +
            navLink("/kontakty/", "Контакты") +
          '</nav>' +
          '<div class="header-actions capsule">' +
            '<a class="header-phone" href="' + company.phoneHref + '" data-track="phone">' + company.phone + '</a>' +
            '<a class="button button-small button-primary" href="/kontakty/#quick-calc" data-track="cta">Обсудить проект <span aria-hidden="true">↗</span></a>' +
            '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Открыть меню"><span></span><span></span><span></span></button>' +
          '</div>' +
          '<nav class="mobile-nav" id="mobile-nav" hidden aria-label="Мобильная навигация">' +
            navLink("/otkatnye/", "Откатные ворота") +
            navLink("/raspashnye/", "Распашные ворота") +
            navLink("/zabory/", "Заборы") +
            navLink("/avtomatika/", "Автоматика") +
            navLink("/raboty/", "Работы") +
            navLink("/kontakty/", "Контакты и заявка") +
            '<a class="mobile-nav-phone" href="' + company.phoneHref + '" data-track="phone">' + company.phone + '</a>' +
            socialLinksMarkup("mobile-nav-socials", false) +
          '</nav>' +
        '</div></header>';
    }

    if (footerHost) {
      footerHost.innerHTML =
        '<footer class="site-footer"><div class="footer-main">' +
          '<div class="footer-brand-col">' +
            '<a class="brand brand-footer" href="/" aria-label="Концепция Строительства — на главную">' +
              '<img src="/assets/logo-icon-orange.png" width="40" height="40" alt="" />' +
              '<span class="brand-name">КОНЦЕПЦИЯ<br /><b>СТРОИТЕЛЬСТВА</b></span>' +
            '</a>' +
            '<p class="footer-note">Ворота, ограждения и автоматика во Владивостоке и Приморском крае.</p>' +
          '</div>' +
          '<div class="footer-col"><p class="footer-label">Решения</p>' +
            '<a href="/otkatnye/">Откатные ворота</a><a href="/raspashnye/">Распашные ворота</a>' +
            '<a href="/zabory/">Заборы</a><a href="/avtomatika/">Автоматика</a><a href="/raboty/">Работы</a>' +
          '</div>' +
          '<div class="footer-col"><p class="footer-label">Связь</p>' +
            '<a href="' + company.phoneHref + '" data-track="phone">' + company.phone + '</a>' +
            '<a href="mailto:' + company.email + '">' + company.email + '</a>' +
            '<a href="' + config.socials.telegram + '" target="_blank" rel="noopener noreferrer" data-track="messenger">Telegram ↗</a>' +
            '<a href="' + config.socials.whatsapp + '" target="_blank" rel="noopener noreferrer" data-track="messenger">WhatsApp ↗</a>' +
            '<a href="' + config.socials.max + '" target="_blank" rel="noopener noreferrer" data-track="messenger">MAX ↗</a>' +
          '</div>' +
          '<div class="footer-col"><p class="footer-label">Компания</p><p>' + company.address + '</p>' +
            '<a href="/kontakty/">Как нас найти</a><a href="/kontakty/#quick-calc">Оставить заявку</a>' +
          '</div>' +
        '</div><div class="footer-bottom">' +
          '<span>' + company.name + ' · ИНН ' + company.inn + ' · ОГРН ' + company.ogrn + '</span>' +
          '<div class="legal-links"><a href="/privacy/">Политика</a><a href="/consent/">Согласие на обработку</a>' +
            '<a href="/cookies/">Cookies</a><button type="button" data-open-cookie-settings>Настройки cookies</button></div>' +
          '<span>Владивосток · Приморский край</span>' +
        '</div></footer>';
    }

    document.body.insertAdjacentHTML("beforeend",
      '<section class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Настройки cookies" hidden>' +
        '<div><p class="cookie-title">Настройки cookies</p><p class="cookie-copy">Необходимые настройки помогают сайту работать. Аналитика включится только по вашему выбору.</p>' +
        '<a href="/cookies/">Подробнее о cookies</a></div>' +
        '<div class="cookie-actions"><button class="button button-outline" type="button" data-cookie-settings>Настроить</button>' +
          '<button class="button button-quiet" type="button" data-cookie-essential>Только необходимые</button>' +
          '<button class="button button-primary" type="button" data-cookie-accept>Принять аналитику</button></div>' +
      '</section>' +
      '<dialog class="cookie-dialog" id="cookie-dialog" aria-labelledby="cookie-dialog-title">' +
        '<form method="dialog"><button class="dialog-close" type="button" data-cookie-close aria-label="Закрыть">×</button></form>' +
        '<p class="eyebrow">Ваш выбор</p><h2 id="cookie-dialog-title">Настройки cookies</h2>' +
        '<div class="cookie-option"><div><b>Необходимые</b><p>Сохраняют выбранные настройки сайта.</p></div><span class="always-on">Всегда включены</span></div>' +
        '<label class="cookie-option" for="analytics-consent"><span><b>Аналитические</b><small>Помогают понять, как используют сайт. Счётчик не загружается до согласия.</small></span>' +
        '<input id="analytics-consent" type="checkbox" /></label>' +
        '<div class="dialog-actions"><button class="button button-outline" type="button" data-cookie-essential>Только необходимые</button>' +
          '<button class="button button-primary" type="button" data-cookie-save>Сохранить выбор</button></div>' +
      '</dialog>'
    );
  }

  function navLink(href, text) {
    var active = currentPath === normalizePath(href);
    return '<a href="' + href + '"' + (active ? ' aria-current="page"' : "") + '>' + text + '</a>';
  }

  function setupNavigation() {
    var button = document.querySelector(".menu-toggle");
    var menu = document.querySelector("#mobile-nav");
    if (!button || !menu) return;
    button.addEventListener("click", function () {
      var isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      button.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
      button.classList.toggle("is-open", !isOpen);
      menu.hidden = isOpen;
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.hidden = true;
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Открыть меню");
        button.classList.remove("is-open");
      });
    });
  }

  var consentKey = "vorota-cookie-choice-v1";
  var analyticsAllowed = false;

  function readConsent() {
    try {
      var value = JSON.parse(window.localStorage.getItem(consentKey) || "null");
      return value && value.necessary === true ? value : null;
    } catch (_error) {
      return null;
    }
  }

  function saveConsent(analytics) {
    var previous = readConsent();
    var wasAllowed = Boolean(previous && previous.analytics);
    var value = { necessary: true, analytics: analytics === true, savedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(consentKey, JSON.stringify(value));
    } catch (_error) {
      // The banner can still be dismissed for the current page when storage is blocked.
    }
    analyticsAllowed = value.analytics;
    var banner = document.querySelector("#cookie-banner");
    if (banner) banner.hidden = true;
    if (value.analytics) enableAnalytics();
    else if (wasAllowed) window.location.reload();
  }

  function setupCookies() {
    var banner = document.querySelector("#cookie-banner");
    var dialog = document.querySelector("#cookie-dialog");
    var choice = readConsent();
    analyticsAllowed = Boolean(choice && choice.analytics);
    if (!choice && banner) banner.hidden = false;
    if (analyticsAllowed) enableAnalytics();

    document.querySelectorAll("[data-cookie-essential]").forEach(function (button) {
      button.addEventListener("click", function () { saveConsent(false); });
    });
    var accept = document.querySelector("[data-cookie-accept]");
    if (accept) accept.addEventListener("click", function () { saveConsent(true); });
    var openSettings = function () {
      var selected = readConsent();
      var checkbox = document.querySelector("#analytics-consent");
      if (checkbox) checkbox.checked = Boolean(selected && selected.analytics);
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      else if (dialog) dialog.setAttribute("open", "");
    };
    document.querySelectorAll("[data-cookie-settings], [data-open-cookie-settings]").forEach(function (button) {
      button.addEventListener("click", openSettings);
    });
    var close = document.querySelector("[data-cookie-close]");
    if (close) close.addEventListener("click", function () { dialog.close(); });
    var save = document.querySelector("[data-cookie-save]");
    if (save) save.addEventListener("click", function () {
      var checkbox = document.querySelector("#analytics-consent");
      var analytics = Boolean(checkbox && checkbox.checked);
      dialog.close();
      saveConsent(analytics);
    });
  }

  function enableAnalytics() {
    var id = String(config.metrikaId || "").trim();
    if (!analyticsAllowed || !/^\d+$/.test(id) || window.__vorotaMetrikaReady) return;
    window.__vorotaMetrikaReady = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(Number(id), "init", { clickmap: false, trackLinks: false, accurateTrackBounce: false, webvisor: false });
    window.ym(Number(id), "hit", window.location.href);
  }

  function trackGoal(name) {
    var id = String(config.metrikaId || "").trim();
    if (analyticsAllowed && /^\d+$/.test(id) && typeof window.ym === "function") {
      window.ym(Number(id), "reachGoal", name);
    }
  }

  function setupTracking() {
    document.addEventListener("click", function (event) {
      var target = event.target.closest("[data-track]");
      if (!target) return;
      var kind = target.getAttribute("data-track");
      if (kind === "cta") trackGoal("cta_click");
      if (kind === "phone") trackGoal("phone_click");
      if (kind === "messenger") trackGoal("messenger_click");
    });
    document.querySelectorAll("[data-photo-input]").forEach(function (input) {
      input.addEventListener("change", function () { trackGoal("photo_select"); });
    });
  }

  function currentAttribution() {
    var params = new URLSearchParams(window.location.search);
    var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"];
    var current = {};
    keys.forEach(function (key) {
      var value = (params.get(key) || "").trim().slice(0, 200);
      if (value) current[key] = value;
    });
    var storageKey = "vorota-campaign-v1";
    if (Object.keys(current).length) {
      try { window.sessionStorage.setItem(storageKey, JSON.stringify(current)); } catch (_error) {}
    } else {
      try { current = JSON.parse(window.sessionStorage.getItem(storageKey) || "{}") || {}; } catch (_error) {}
    }
    return current;
  }

  function safeReferrer() {
    try {
      if (!document.referrer) return "";
      var value = new URL(document.referrer);
      if (value.protocol !== "http:" && value.protocol !== "https:") return "";
      return (value.origin + value.pathname).slice(0, 2048);
    } catch (_error) {
      return "";
    }
  }

  function formMessage(form) {
    var parts = [];
    var fields = [
      ["Тип проекта", "direction"], ["Ширина проёма, м", "width"],
      ["Высота, м", "height"], ["Заполнение", "filling"],
      ["Автоматика", "automation"], ["Комментарий", "comment"]
    ];
    fields.forEach(function (pair) {
      var control = form.elements.namedItem(pair[1]);
      var value = control ? String(control.value || "").trim() : "";
      if (value) parts.push(pair[0] + ": " + value);
    });
    return parts.join("\n");
  }

  function fileToDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(String(reader.result)); };
      reader.onerror = function () { reject(new Error("Не удалось прочитать фото.")); };
      reader.readAsDataURL(file);
    });
  }

  function imageToAttachment(file) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      var sourceUrl = URL.createObjectURL(file);
      image.onload = function () {
        var maxSide = 1500;
        var scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        var canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        var context = canvas.getContext("2d");
        if (!context) {
          URL.revokeObjectURL(sourceUrl);
          reject(new Error("Браузер не смог подготовить фото."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(sourceUrl);
        var quality = 0.78;
        function encode() {
          canvas.toBlob(function (blob) {
            if (!blob) {
              reject(new Error("Не удалось подготовить фото."));
              return;
            }
            if (blob.size > 760 * 1024 && quality > 0.4) {
              quality -= 0.1;
              encode();
              return;
            }
            if (blob.size > 800 * 1024 || blob.type !== "image/webp") {
              reject(new Error("Не удалось уменьшить фото до допустимого размера. Выберите другое изображение."));
              return;
            }
            var reader = new FileReader();
            reader.onload = function () {
              resolve({
                fileName: file.name.replace(/[^\w.\-а-яёА-ЯЁ]/g, "_").slice(0, 160) || "photo.webp",
                contentType: "image/webp",
                fileData: String(reader.result)
              });
            };
            reader.onerror = function () { reject(new Error("Не удалось подготовить фото.")); };
            reader.readAsDataURL(blob);
          }, "image/webp", quality);
        }
        encode();
      };
      image.onerror = function () {
        URL.revokeObjectURL(sourceUrl);
        reject(new Error("Выберите изображение JPG, PNG или WebP."));
      };
      image.src = sourceUrl;
    });
  }

  function setFormStatus(form, message, isError) {
    var status = form.querySelector("[data-form-status]");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
    status.classList.toggle("is-success", !isError);
  }

  function setupForms() {
    document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;
        var submit = form.querySelector('[type="submit"]');
        var originalText = submit ? submit.textContent : "";
        if (submit) {
          submit.disabled = true;
          submit.textContent = "Отправляем…";
        }
        setFormStatus(form, "Готовим данные заявки…", false);
        try {
          var photoInput = form.querySelector("[data-photo-input]");
          var chosenFiles = photoInput ? Array.from(photoInput.files || []) : [];
          if (chosenFiles.length > 2) throw new Error("Можно приложить не более двух фотографий.");
          if (chosenFiles.some(function (file) { return !["image/jpeg", "image/png", "image/webp"].includes(file.type); })) {
            throw new Error("Прикрепите фото в формате JPG, PNG или WebP.");
          }
          if (chosenFiles.some(function (file) { return file.size > 8 * 1024 * 1024; })) {
            throw new Error("Размер одного фото не должен превышать 8 МБ.");
          }
          var attachments = [];
          for (var index = 0; index < chosenFiles.length; index += 1) {
            attachments.push(await imageToAttachment(chosenFiles[index]));
          }
          var data = new FormData(form);
          var message = formMessage(form);
          var typedComment = String(data.get("comment") || "").trim();
          if (typedComment && !message.includes("Комментарий:")) message = [message, "Комментарий: " + typedComment].filter(Boolean).join("\n");
          if (attachments.length) message = [message, "Фотографии объекта приложены к заявке."].filter(Boolean).join("\n");
          var attribution = currentAttribution();
          var payload = {
            name: String(data.get("name") || "").trim(),
            phone: String(data.get("phone") || "").trim(),
            message: message.slice(0, 4800),
            direction: String(data.get("direction") || "Ворота / заборы / автоматика").trim().slice(0, 160),
            consent: Boolean(data.get("consent")),
            consent_version: config.privacyVersion,
            submission_id: "vorota-vl:" + (window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : Date.now() + "-" + Math.random().toString(36).slice(2)),
            site_id: "vorota-vl.ru",
            source_domain: "vorota-vl.ru",
            direction_id: "gates",
            form_type: String(form.dataset.formType || "request").slice(0, 80),
            page_url: window.location.origin + window.location.pathname,
            referrer: safeReferrer(),
            attachments: attachments,
            website: String(data.get("website") || "")
          };
          ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"].forEach(function (key) {
            if (attribution[key]) payload[key] = attribution[key];
          });
          var isLocal = ["localhost", "127.0.0.1"].indexOf(window.location.hostname) !== -1;
          var endpoint = isLocal ? "/__preview/website-lead" : config.crmLeadUrl;
          if (!endpoint) throw new Error("Не настроен адрес приёма заявок CRM.");
          var controller = new AbortController();
          var timeout = window.setTimeout(function () { controller.abort(); }, 25000);
          var response;
          try {
            response = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
              signal: controller.signal
            });
          } finally {
            window.clearTimeout(timeout);
          }
          var result = {};
          try { result = await response.json(); } catch (_error) {}
          if (!response.ok || result.ok !== true) {
            if (response.status === 422) throw new Error("Подтвердите согласие на обработку персональных данных.");
            if (response.status === 413) throw new Error("Файлы слишком большие. Удалите фото или отправьте заявку без него.");
            if (response.status === 403) throw new Error("CRM пока не разрешила приём заявок с этого домена.");
            if (response.status === 501 || response.status === 503) throw new Error("Приём фото в CRM пока не включён. Отправьте заявку без фотографии или позвоните нам.");
            throw new Error("Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону.");
          }
          trackGoal("form_submit");
          form.reset();
          setFormStatus(form, result.preview === true
            ? "Локальный предпросмотр: данные не передавались в CRM и не сохранялись."
            : "Заявка отправлена в CRM. Мы свяжемся с вами по указанному телефону.", false);
        } catch (error) {
          var messageText = error && error.name === "AbortError"
            ? "Истекло время ожидания CRM. Повторите отправку или позвоните нам."
            : (error instanceof Error ? error.message : "Не удалось отправить заявку.");
          setFormStatus(form, messageText, true);
        } finally {
          if (submit) {
            submit.disabled = false;
            submit.textContent = originalText;
          }
        }
      });
    });
  }

  function setupQueryPrefill() {
    var params = new URLSearchParams(window.location.search);
    var type = params.get("type");
    var select = document.querySelector('select[name="direction"]');
    if (!type || !select) return;
    var aliases = {
      otkatnye: "Откатные ворота",
      raspashnye: "Распашные ворота",
      zabory: "Забор",
      avtomatika: "Автоматика"
    };
    var target = aliases[type];
    if (target && Array.from(select.options).some(function (option) { return option.value === target; })) select.value = target;
  }

  function setupGalleryFilters() {
    var controls = Array.from(document.querySelectorAll('[data-gallery-filter]'));
    var items = Array.from(document.querySelectorAll('[data-work-card]'));
    if (!controls.length || !items.length) return;
    controls.forEach(function (control) {
      control.addEventListener('click', function () {
        var selected = control.getAttribute('data-gallery-filter') || 'all';
        controls.forEach(function (button) {
          var active = button === control;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        items.forEach(function (item) {
          var visible = selected === 'all' || item.getAttribute('data-work-card') === selected;
          item.hidden = !visible;
          if (visible) item.classList.add('is-visible');
        });
      });
    });
  }
  function setupReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -4% 0px", threshold: 0.08 });
    items.forEach(function (item) {
      observer.observe(item);
      var bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        item.classList.add("is-visible");
        observer.unobserve(item);
      }
    });
  }

  renderShell();
  setupSocialEntryPoints();
  setupNavigation();
  setupCookies();
  setupTracking();
  setupForms();
  setupQueryPrefill();
  setupGalleryFilters();
  setupReveals();
})();
