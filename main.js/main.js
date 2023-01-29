(() => {
  "use strict";
  (function () {
    function t(t) {
      t.preventDefault();
      const e = t.currentTarget.getAttribute("href");
      document
        .querySelector(e)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document
      .querySelectorAll('[data-menu="suave"] a[href^="#"]')
      .forEach((e) => {
        e.addEventListener("click", t);
      });
  })(),
    (function () {
      const t = document.querySelectorAll('[data-anime="scroll"]');
      function e() {
        const e = 0.6 * window.innerHeight;
        t.forEach((t) => {
          t.getBoundingClientRect().top - e < 0
            ? t.classList.add("ativo")
            : t.classList.contains("ativo") && t.classList.remove("ativo");
        });
      }
      t.length && (e(), window.addEventListener("scroll", e));
    })(),
    (function () {
      const t = document.querySelectorAll('[data-anime="accordion"] dt'),
        e = "ativo";
      function n() {
        this.classList.toggle(e), this.nextElementSibling.classList.toggle(e);
      }
      t.length &&
        (t[0].classList.add(e),
        t[0].nextElementSibling.classList.add(e),
        t.forEach((t) => {
          t.addEventListener("click", n);
        }));
    })(),
    (function () {
      const t = document.querySelectorAll('[data-tab="menu"] li'),
        e = document.querySelectorAll('[data-tab="content"] section');
      t.length &&
        e.length &&
        (e[0].classList.add("ativo"),
        t.forEach((t, n) => {
          t.addEventListener("click", () => {
            !(function (t) {
              e.forEach((t) => {
                t.classList.remove("ativo");
              });
              const n = e[t].dataset.anime;
              e[t].classList.add("ativo", n);
            })(n);
          });
        }));
    })(),
    (function () {
      const t = document.querySelector('[data-modal="abrir"]'),
        e = document.querySelector('[data-modal="fechar"]'),
        n = document.querySelector('[data-modal="container"]');
      function o(t) {
        t.preventDefault(), n.classList.toggle("ativo");
      }
      t &&
        e &&
        n &&
        (t.addEventListener("click", o),
        e.addEventListener("click", o),
        n.addEventListener("click", function (t) {
          t.target === this && o(t);
        }));
    })(),
    (function () {
      function t() {
        const t = (function (t) {
          const e = document.createElement("div"),
            n = t.getAttribute("aria-label");
          return (
            e.classList.add("tooltip"),
            (e.innerText = n),
            document.body.appendChild(e),
            e
          );
        })(this);
        (n.tooltipBox = t),
          this.addEventListener("mousemove", n),
          (e.tooltipBox = t),
          (e.element = this),
          this.addEventListener("mouseleave", e);
      }
      document.querySelectorAll("[data-tooltip]").forEach((e) => {
        e.addEventListener("mouseover", t);
      });
      const e = {
          handleEvent() {
            this.tooltipBox.remove(),
              this.element.removeEventListener("mouseleave", e),
              this.element.removeEventListener("mousemove", n);
          },
        },
        n = {
          handleEvent(t) {
            (this.tooltipBox.style.top = t.pageY + 20 + "px"),
              (this.tooltipBox.style.left = t.pageX + 20 + "px");
          },
        };
    })(),
    (function () {
      function t(t) {
        t.preventDefault(),
          this.classList.add("active"),
          (function (t, e, n) {
            const o = document.documentElement,
              a = "data-outside";
            function c(i) {
              t.contains(i.target) ||
                (t.removeAttribute(a),
                e.forEach((t) => {
                  o.removeEventListener(t, c);
                }),
                n());
            }
            t.hasAttribute(a) ||
              (e.forEach((t) => {
                setTimeout(() => o.addEventListener(t, c));
              }),
              t.setAttribute(a, ""));
          })(this, ["touchstart", "click"], () => {
            this.classList.remove("active");
          });
      }
      document.querySelectorAll("[data-dropdown]").forEach((e) => {
        ["touchstart", "click"].forEach((n) => {
          e.addEventListener(n, t);
        });
      });
    })(),
    (function () {
      const t = document.querySelector('[data-menu="button"]'),
        e = document.querySelector('[data-menu="list"]'),
        n = ["click", "touchstart"];
      function o() {
        e.classList.add("active"),
          t.classList.add("active"),
          (function (n, o) {
            const c = document.documentElement,
              i = "data-outside";
            function s(a) {
              n.contains(a.target) ||
                (n.removeAttribute(i),
                o.forEach((t) => {
                  c.removeEventListener(t, s);
                }),
                e.classList.remove("active"),
                t.classList.remove("active"));
            }
            n.hasAttribute(i) ||
              (o.forEach((t) => {
                setTimeout(() => c.addEventListener(t, s));
              }),
              n.setAttribute(i, ""));
          })(e, n);
      }
      t && n.forEach((e) => t.addEventListener(e, o));
    })(),
    (function () {
      const t = document.querySelector("[data-semana]"),
        e = t.dataset.semana.split(",").map(Number),
        n = t.dataset.horario.split(",").map(Number),
        o = new Date(),
        a = o.getDay(),
        c = o.getHours(),
        i = -1 !== e.indexOf(a),
        s = c >= n[0] && c < n[1];
      i && s && t.classList.add("aberto");
    })(),
    (async function () {
      try {
        const t = await fetch("./animaisapi.json"),
          e = await t.json(),
          n = document.querySelector(".numeros-grid");
        e.forEach((t) => {
          const e = (function (t) {
            const e = document.createElement("div");
            return (
              e.classList.add("numero-animal"),
              (e.innerHTML = `<h3>${t.specie}</h3><span data-numero>${t.total}</span>`),
              e
            );
          })(t);
          n.appendChild(e);
        }),
          (function () {
            const t = document.querySelector(".numeros"),
              e = new MutationObserver(function (t) {
                t[0].target.classList.contains("ativo") &&
                  (e.disconnect(),
                  document.querySelectorAll("[data-numero]").forEach((t) => {
                    const e = +t.innerText,
                      n = Math.floor(e / 100);
                    let o = 0;
                    const a = setInterval(() => {
                      (o += n),
                        (t.innerText = o),
                        o > e && ((t.innerText = e), clearInterval(a));
                    }, 25 * Math.random());
                  }));
              });
            e.observe(t, { attributes: !0 });
          })();
      } catch (t) {
        console.log(t);
      }
    })(),
    fetch("https://blockchain.info/ticker")
      .then((t) => t.json())
      .then((t) => {
        document.querySelector(".btc-preco").innerText = (
          1e3 / t.BRL.sell
        ).toFixed(4);
      })
      .catch((t) => {
        console.log(Error(t));
      });
})();
