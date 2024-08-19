import React from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleClick = (event: { target: any }) => {
      // console.log(event.target)
      // console.log(ref.current && !ref.current.contains(event.target)&& event.target.getAttribute('data-name')!=='noteModel' && event.target.getAttribute('data-name')!=='paint' && event.target.getAttribute('data-name')!=='title' && event.target.getAttribute('data-name')!=='description')
      if (ref.current && !ref.current.contains(event.target) && event.target.getAttribute('data-name')!=='create-note' && event.target.getAttribute('data-name')!=='close' && event.target.getAttribute('data-name')!=='noteModel' && event.target.getAttribute('data-name')!=='paint' && event.target.getAttribute('data-name')!=='title' && event.target.getAttribute('data-name')!=='description') {
        // console.log(callback())
        callback();
      }
    };

    document.addEventListener("click", handleClick,true);

    return () => {
      document.removeEventListener("click", handleClick,true);
    };
  }, [ref]);

  return ref;
};
