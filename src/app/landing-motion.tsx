"use client";

import { useEffect } from "react";

/** Progressive enhancement only: the server-rendered page needs no motion JS. */
export default function LandingMotion() {
  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".ln-site");
    if (!site) return;

    const preference = matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    );
    const revealPreference = matchMedia("(prefers-reduced-motion: no-preference)");
    const revealTargets = Array.from(site.querySelectorAll<HTMLElement>(
      ".ln-sectionHeading, .ln-feature, .ln-forecastFeature, .ln-howInner, .ln-faqInner, .ln-downloadPanel",
    ));
    let observer: IntersectionObserver | undefined;
    function configureReveals() {
      observer?.disconnect();
      revealTargets.forEach((element) => element.removeAttribute("data-ln-entered"));
      if (!revealPreference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-ln-entered", "true");
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
      revealTargets.forEach((element) => observer?.observe(element));
    }
    configureReveals();
    revealPreference.addEventListener("change", configureReveals);
    let detach = () => {};

    function configure() {
      detach();
      if (!preference.matches || !site) return;

      const states = Array.from(
        site.querySelectorAll<HTMLElement>("[data-ln-pointer]"),
        (element) => ({
          element,
          bounds: null as DOMRect | null,
          x: 0,
          y: 0,
          targetX: 0,
          targetY: 0,
          presence: 0,
          targetPresence: 0,
        }),
      );
      let frame = 0;
      let previousTime = 0;
      const cleanups: (() => void)[] = [];

      function render(time: number) {
        const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
        previousTime = time;
        let moving = false;

        for (const state of states) {
          if (state.x === state.targetX && state.y === state.targetY && state.presence === state.targetPresence) continue;
          const settling = state.targetPresence === 0;
          const response = settling ? 140 : state.element.dataset.lnPointer === "magnet" ? 65 : 95;
          const blend = 1 - Math.exp(-elapsed / response);
          state.x += (state.targetX - state.x) * blend;
          state.y += (state.targetY - state.y) * blend;
          state.presence += (state.targetPresence - state.presence) * blend;
          const unsettled = Math.max(
            Math.abs(state.targetX - state.x),
            Math.abs(state.targetY - state.y),
            Math.abs(state.targetPresence - state.presence),
          ) > 0.001;

          if (!unsettled) {
            state.x = state.targetX;
            state.y = state.targetY;
            state.presence = state.targetPresence;
          }
          state.element.style.setProperty("--ln-pointer-x", state.x.toFixed(4));
          state.element.style.setProperty("--ln-pointer-y", state.y.toFixed(4));
          state.element.style.setProperty("--ln-pointer-presence", state.presence.toFixed(4));
          moving ||= unsettled;
        }

        frame = moving ? requestAnimationFrame(render) : 0;
        if (!moving) previousTime = 0;
      }

      function schedule() {
        if (!frame) frame = requestAnimationFrame(render);
      }

      function rest() {
        for (const state of states) {
          state.bounds = null;
          state.targetX = state.targetY = state.targetPresence = 0;
        }
        schedule();
      }

      for (const state of states) {
        const { element } = state;
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || element.matches(":focus-visible")) return;
          // Cache geometry outside the frame loop; never read layout after writes.
          state.bounds ??= element.getBoundingClientRect();
          const { left, top, width, height } = state.bounds;
          if (!width || !height) return;
          state.targetX = Math.max(-1, Math.min(1, ((event.clientX - left) / width - 0.5) * 2));
          state.targetY = Math.max(-1, Math.min(1, ((event.clientY - top) / height - 0.5) * 2));
          state.targetPresence = 1;
          schedule();
        };
        const leave = () => {
          state.bounds = null;
          state.targetX = state.targetY = state.targetPresence = 0;
          schedule();
        };
        element.addEventListener("pointermove", move, { passive: true });
        element.addEventListener("pointerleave", leave);
        element.addEventListener("pointercancel", leave);
        element.addEventListener("focusin", leave);
        cleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
          element.removeEventListener("pointercancel", leave);
          element.removeEventListener("focusin", leave);
        });
      }

      window.addEventListener("blur", rest);
      window.addEventListener("resize", rest, { passive: true });
      window.addEventListener("scroll", rest, { passive: true, capture: true });
      document.addEventListener("visibilitychange", rest);

      detach = () => {
        cancelAnimationFrame(frame);
        cleanups.forEach((cleanup) => cleanup());
        window.removeEventListener("blur", rest);
        window.removeEventListener("resize", rest);
        window.removeEventListener("scroll", rest, true);
        document.removeEventListener("visibilitychange", rest);
        for (const { element } of states) {
          element.style.removeProperty("--ln-pointer-x");
          element.style.removeProperty("--ln-pointer-y");
          element.style.removeProperty("--ln-pointer-presence");
        }
      };
    }

    configure();
    preference.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      revealPreference.removeEventListener("change", configureReveals);
      revealTargets.forEach((element) => element.removeAttribute("data-ln-entered"));
      preference.removeEventListener("change", configure);
      detach();
    };
  }, []);

  return null;
}
