import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import styles from "./Home.module.css";
import NotesList from "../components/NoteList";
import { useOutsideClick } from "../hooks/outsideClickHook";
import { useDispatch } from "react-redux";
import { addNote, pinNote } from "../store/notesSlice";
import { v4 as uuidv4 } from "uuid";
import BackgroundOptionsModel from "../components/BackgroundOptionsModel";
function Home() {
  const [isExpanded, setisExpanded] = useState(false);
  const [color, setColor] = useState("");
  const [pinned, setpinned] = useState(false);
  const [isOptionModelOpen, setisOptionModelOpen] = useState(false);
  const [text, setText] = useState("");
  const [titleText, setTitleText] = useState("");
  const dispatch = useDispatch();
  const handleDescChange = (event: React.FormEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.textContent)
    if(event.currentTarget.textContent)
    setText(event.currentTarget.innerText.replace(/<[^>]+>/g, ''));
  };
  const handlePaint = (e: any) => {
    console.log(e.target.getAttribute("data-name"));
    setisOptionModelOpen(true);
  };

  const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
    setTitleText(event.currentTarget.innerText);
  };
  const handleClickOutside = () => {
    const content = ref.current?.innerText || "";
    const title = titleRef.current?.innerText || "";
    const colorVal = paintRef.current?.getAttribute("data-value") || "";
    const pinVal = pinRef.current?.getAttribute("data-value") === "true" || false;
    console.log("color", colorVal);
    console.log("pin", pinVal);
    // console.log("text",title)
    // console.log("tex2",content)
    console.log(color);
    if (title || content) {
      console.log("addnote1");
      dispatch(
        addNote({
          id: uuidv4(),
          title,
          content,
          isPinned: pinVal,
          background: colorVal,
        })
      );
      setTitleText("");
      setText("");
      setColor("");
      if (ref.current) ref.current.textContent = "";
    }
    setColor("");
    setpinned(false);
    setisExpanded(false);
    setisOptionModelOpen(false);
  };

  const ref = useOutsideClick(handleClickOutside);
  const paintRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const expand = () => {
    setisExpanded(true);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      ref.current?.focus();
    }
  };
  const handleColor = (color: string) => {
    setColor(color);
  };
  const handleSubmit = () => {
    console.log("inside submit");
    console.log("addnote2");
    console.log(color);
    dispatch(
      addNote({
        id: uuidv4(),
        title: titleText,
        content: text,
        isPinned: pinned,
        background: color,
      })
    );
    setTitleText("");
    setText("");
    setColor("");
    setisExpanded(false);
    setisOptionModelOpen(false);
    if (ref.current) ref.current.textContent = "";
  };
  const handlePin = () => {
    setpinned(!pinned);
  };
  return (
    <>
      <div className={styles.homeContainer}>
        <SideBar />

        <div className={styles.notesContainer}>
          <div className={styles.createNotesContainer}>
            <div
              ref={paintRef}
              className={styles.createNotes}
              data-name="create-note"
              data-value={color}
              style={color ? { backgroundColor: color } : {}}
            >
              {isOptionModelOpen && (
                <BackgroundOptionsModel getColor={handleColor} />
              )}

              {isExpanded && (
                <div>
                  <div
                    className={styles.placeHolder}
                    style={
                      titleText && titleText.length !== 0
                        ? { display: "none" }
                        : {}
                    }
                  >
                    Title
                  </div>
                  <div
                    className={styles.input}
                    onInput={handleTitleChange}
                    data-name="title"
                    ref={titleRef}
                    role="textbox"
                    aria-valuetext={titleText}
                    onKeyDown={handleKeyDown}
                    contentEditable="true"
                    aria-multiline="true"
                    defaultValue={titleText}
                  />
                </div>
              )}
              <div>
                <div
                  className={styles.placeHolder}
                  style={text ? { display: "none" } : {}}
                >
                  Take a note...
                </div>
                <div
                  ref={ref}
                  onInput={handleDescChange}
                  className={styles.input}
                  data-name="descripiton"
                  role="textbox"
                  contentEditable="true"
                  aria-multiline="true"
                  onClick={expand}
                ></div>
              </div>
              {!isExpanded ? (
                <div className={styles.toolsContainer}>
                  <div className={`${styles.iconStyle} ${styles.image1}`}></div>
                  <div className={`${styles.iconStyle} ${styles.image2}`}></div>
                  <div className={`${styles.iconStyle} ${styles.image3}`}></div>
                </div>
              ) : (
                <div
                  data-name="create-note"
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
                  className={styles.pinIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePin();
                  }}
                ></div>
              )}

              {isExpanded && (
                <div className={styles.iconContainer} data-name="close">
                  <button
                    className={styles.closeIcon}
                    data-name="close"
                    onClick={handleSubmit}
                  >
                    Close
                  </button>
                  <div className={styles.iconList} data-name="close">
                    <div
                      className={styles.notificationIcon}
                      data-name="create-note"
                    ></div>
                    <div
                      className={styles.userIcon}
                      data-name="create-note"
                    ></div>
                    <div
                      data-name="create-note"
                      className={styles.paintIcon}
                      onClick={(e) => {
                        console.log("inside paint");
                        e.stopPropagation();
                        handlePaint(e);
                      }}
                    ></div>
                    <div
                      data-name="create-note"
                      className={styles.imgIcon}
                    ></div>
                    <div
                      data-name="create-note"
                      className={styles.archieveIcon}
                    ></div>
                    <div
                      data-name="create-note"
                      className={styles.ellipsesIcon}
                    ></div>
                    <div
                      data-name="create-note"
                      className={styles.undoIcon}
                    ></div>
                    <div
                      data-name="create-note"
                      className={styles.redoIcon}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <NotesList />
          {/* <div className={styles.label}>OTHERS</div>
        <NotesList /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
