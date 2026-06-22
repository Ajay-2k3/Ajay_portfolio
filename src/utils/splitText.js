/**
 * Custom SplitText utility to replicate GSAP's SplitText plugin functionality.
 * Dynamically splits target element text content into characters, words, or lines
 * and wraps them in spans for granular animation control.
 * 
 * @param {HTMLElement} element - The target DOM element.
 * @param {string} type - 'chars' | 'words' | 'lines'
 * @returns {Array<HTMLElement>} An array of the generated inner animation nodes.
 */
export const splitText = (element, type = "chars") => {
  if (!element) return [];
  const text = element.textContent.trim();
  element.innerHTML = "";

  if (type === "chars") {
    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.className = "split-char inline-block";
      // Preserving non-breaking spaces for proper layout flow
      if (char === " ") {
        span.innerHTML = "&nbsp;";
        span.style.display = "inline";
      } else {
        span.textContent = char;
      }
      return span;
    });
    chars.forEach((c) => element.appendChild(c));
    return chars;
  } 
  
  if (type === "words") {
    const words = text.split(/\s+/).map((word) => {
      // Outer wrapper prevents overflow cutoff during clip reveals
      const wrapper = document.createElement("span");
      wrapper.className = "inline-block overflow-hidden vertical-align-middle";
      
      const inner = document.createElement("span");
      inner.className = "split-word inline-block";
      inner.textContent = word;
      
      wrapper.appendChild(inner);
      return { wrapper, inner };
    });

    words.forEach((item, index) => {
      element.appendChild(item.wrapper);
      if (index < words.length - 1) {
        const space = document.createTextNode(" ");
        element.appendChild(space);
      }
    });

    return words.map(item => item.inner);
  } 
  
  if (type === "lines") {
    // Dynamic lines calculation by wrapping words, measuring layout offsets, and grouping
    const wordsList = text.split(/\s+/);
    element.innerHTML = wordsList
      .map((w) => `<span class="temp-word inline-block">${w}</span>`)
      .join(" ");

    const wordSpans = Array.from(element.querySelectorAll(".temp-word"));
    const linesMap = new Map();

    wordSpans.forEach((span) => {
      const top = span.offsetTop;
      if (!linesMap.has(top)) {
        linesMap.set(top, []);
      }
      linesMap.get(top).push(span.textContent);
    });

    element.innerHTML = "";
    const lineInners = [];

    linesMap.forEach((wordsInLine) => {
      const lineOuter = document.createElement("span");
      lineOuter.className = "split-line block overflow-hidden";
      
      const lineInner = document.createElement("span");
      lineInner.className = "split-line-inner inline-block";
      lineInner.textContent = wordsInLine.join(" ");
      
      lineOuter.appendChild(lineInner);
      element.appendChild(lineOuter);
      lineInners.push(lineInner);
    });

    return lineInners;
  }

  return [];
};
