import { useEffect, useRef } from "react";
import { splitText } from "../utils/splitText";

/**
 * React hook wrapper for the custom splitText utility.
 * Splits the DOM element's text content into chars, words, or lines upon mounting.
 * 
 * @param {string} type - 'chars' | 'words' | 'lines'
 * @returns {React.RefObject} - Element reference to be attached
 */
export const useSplitText = (type = "chars") => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      splitText(element, type);
    }
  }, [type]);

  return ref;
};

export default useSplitText;
