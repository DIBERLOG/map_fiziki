// Feedback forms of phys-lab.ru (the contact section and the map's "Сообщить об ошибке").
// They post to the author's server on diberlog.ru, which stores the message and notifies the author by e-mail
// and Telegram. Both consent boxes are required here and checked again on the server; on any error the typed
// text stays in the form.
(function () {
  var ENDPOINT = "https://diberlog.ru/api/messages";

  function wire(form) {
    var button = form.querySelector("button[type=submit]");
    var status = form.querySelector("[data-feedback-status]");
    var field = function (name) { return form.elements.namedItem(name); };
    var show = function (text, kind) { status.textContent = text; status.dataset.kind = kind || ""; };

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var email = field("email").value;
      var body = {
        name: field("name").value, email: email, message: field("message").value,
        topic: field("topic") ? field("topic").value : "", website: field("website").value,
        terms: field("terms").checked, consent: field("consent").checked, page: location.pathname,
      };
      button.disabled = true;
      show("Отправляем…");
      fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (result) {
            if (response.ok) {
              form.reset();
              show("Сообщение принято" + (result.id ? ", номер " + String(result.id).slice(0, 8) : "") + ". Ответ придёт на " + email + ".", "ok");
            } else if (response.status === 400 || response.status === 429) {
              show(result.error || "Проверьте поля формы.", "error");
            } else {
              show("Сервер не принял сообщение. Текст сохранён — попробуйте ещё раз или напишите на workbook.ea@mail.ru.", "error");
            }
          });
        })
        .catch(function () {
          show("Нет связи с сервером. Текст сохранён — попробуйте позже или напишите на workbook.ea@mail.ru.", "error");
        })
        .then(function () { button.disabled = false; });
    });
  }

  document.querySelectorAll("form[data-feedback]").forEach(wire);
})();
