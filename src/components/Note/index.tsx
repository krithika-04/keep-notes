import React, { useEffect, useRef, useState } from "react";
import styles from "./Note.module.css";
import BackgroundOptionsModel from "../BackgroundOptionsModel";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../../store/notesSlice";
function Note({
  isOpen,
  onClose,
  note,
}: {
  isOpen: boolean;
  onClose: () => void;
  note:
    | {
        id: string;
        title: string;
        content: string;
        isPinned: boolean;
        background?: string;
      }
    | undefined;
}) {
  const modalRef = useRef<HTMLInputElement>(null);
  const pinRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<HTMLDivElement>(null);
  const [pinned, setpinned] = useState(false);
  const [isOptionModelOpen, setisOptionModelOpen] = useState(false);
  const [color, setColor] = useState("");
  const [text, setText] = useState("");
  const [titleText, setTitleText] = useState("");
  const dispatch = useDispatch();
  const handlePin = () => {
    setpinned(!pinned);
  };
  const handleDelete = (noteId: string) => {
    console.log(noteId);
    dispatch(deleteNote(noteId));
    onClose();
  };
  const handleColor = (color: string) => {
    setColor(color);
  };
  const handlePaint = (e: any) => {
    console.log(e.target.getAttribute("data-name"));
    setisOptionModelOpen(true);
  };
  const handleClose = () => {
    console.log({
      id: note?.id,
      title: titleText,
      content: text.endsWith('\n') ? text.slice(0, -1) : text,
      isPinned: pinned,
      background: color,
    });
    if (note?.id)
      dispatch(
        updateNote({
          id: note.id,
          title: titleText,
          content: text.endsWith('\n') ? text.slice(0, -1) : text,
          isPinned: pinned,
          background: color,
        })
      );
    setColor("");
    setpinned(false);
    setisOptionModelOpen(false);
    onClose();
  };
  const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
    setTitleText(event.currentTarget.innerText.replace(/<[^>]+>/g, ''));
  };
  const handleDescChange = (event: React.FormEvent<HTMLDivElement>) => {
    setText(event.currentTarget.innerText.replace(/<[^>]+>/g, ""));
  };
  useEffect(() => {
    // Event listener logic
    const handleClickOutside = (event: { target: any }) => {
      const title = titleRef.current?.innerText.replace(/<[^>]+>/g, '') || "";
      const originalContent = ref.current?.innerText.replace(/<[^>]+>/g, '') || "";
      const content = originalContent.endsWith('\n') ? originalContent.slice(0, -1) : originalContent;
      const colorVal = paintRef.current?.getAttribute("data-value") || "";
      const pinVal =
        pinRef.current?.getAttribute("data-value") === "true" || false;

      if (event.target.innerText === "Close") {
        console.log({
          id: note?.id,
          title,
          content,
          isPinned: pinVal,
          background: colorVal,
        });
        if (note?.id)
          dispatch(
            updateNote({
              id: note.id,
              title,
              content,
              isPinned: pinVal,
              background: colorVal,
            })
          );
        setisOptionModelOpen(false);
        setColor("");
        setpinned(false);
        onClose();
        return;
      }
      console.log(modalRef.current);
      console.log(event.target);
      console.log(modalRef?.current?.contains(event.target));
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        console.log({
          id: note?.id,
          title,
          content,
          isPinned: pinVal,
          background: colorVal,
        });
        if (note?.id && (note.content !== title || note?.title != content)) {
          dispatch(
            updateNote({
              id: note.id,
              title,
              content,
              isPinned: pinVal,
              background: colorVal,
            })
          );
          setisOptionModelOpen(false);
          setColor("");
          setpinned(false);
        }
        setisOptionModelOpen(false);
        setColor("");
        setpinned(false);
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  useEffect(() => {
    const handleEscape = (event: { key: string }) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className={styles.noteContainer} data-name="noteModel">
      <div className={styles.noteWrapper} ref={modalRef}>
        <div className={styles.note}>
          <div
            className={styles.noteContent}
            ref={paintRef}
            data-value={color || note?.background || " #202124"}
            style={
              color
                ? { backgroundColor: color }
                : note?.background
                ? { backgroundColor: note.background }
                : {}
            }
          >
            {isOptionModelOpen && (
              <BackgroundOptionsModel getColor={handleColor} />
            )}
            <div className={styles.titleDescContainer}>
              <div
                className={styles.pinIcon}
                data-value={pinned}
                ref={pinRef}
                style={
                  pinned
                    ? {
                        backgroundImage:
                          "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE3IDRhMiAyIDAgMCAwLTItMkg5Yy0xLjEgMC0yIC45LTIgMnY3bC0yIDN2Mmg2djVsMSAxIDEtMXYtNWg2di0ybC0yLTNWNHoiLz4KPC9zdmc+Cg==)",
                      }
                    : {}
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handlePin();
                }}
              ></div>
              <div
                role="textbox"
                onInput={handleTitleChange}
                contentEditable="true"
                aria-multiline="true"
                className={styles.title}
                ref={titleRef}
              >
                {note?.title}
              </div>
              <div
                role="textbox"
                onInput={handleDescChange}
                contentEditable="true"
                aria-multiline="true"
                className={styles.description}
                ref={ref}
              >
                {note?.content.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br/>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className={styles.iconContainer}>
              <button
                className={styles.closeIcon}
                onClick={(e) => {
                  console.log("handle");
                  e.stopPropagation();
                  handleClose();
                }}
              >
                Close
              </button>
              <div className={styles.iconList}>
                <div className={styles.notificationIcon}></div>
                <div className={styles.userIcon}></div>
                <div
                  //   ref={ref}
                  data-name="paint"
                  className={styles.paintIcon}
                  onClick={(e) => {
                    console.log("inside paint");
                    e.stopPropagation();
                    handlePaint(e);
                  }}
                ></div>
                <div className={styles.imgIcon}></div>
                <div
                  className={styles.archieveIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (note?.id) handleDelete(note.id);
                  }}
                ></div>
                <div className={styles.ellipsesIcon}></div>
                <div className={styles.undoIcon}></div>
                <div className={styles.redoIcon}></div>
              </div>
            </div>
          </div>
          {/* {isOptionModelOpen && <BackgroundOptionsModel />} */}
        </div>
      </div>
    </div>
  );
}

export default Note;
