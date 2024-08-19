import React, { useState } from "react";
import styles from "./NoteList.module.css";
import BackgroundOptionsModel from "../BackgroundOptionsModel";
import { useOutsideClick } from "../../hooks/outsideClickHook";
import { deleteNote, pinNote } from "../../store/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Note from "../Note";
function NotesList() {
  interface Note {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    background?: string;
  }
  const [isOptionModelOpen, setisOptionModelOpen] = useState<string | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState<Note>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const pinnedNotes = notes.filter((ele) => ele.isPinned === true);
  const unpinnedNotes = notes.filter((ele) => ele.isPinned === false);
  const dispatch = useDispatch();

  const handleDelete = (noteId: string) => {
    console.log(noteId);
    dispatch(deleteNote(noteId));
  };
  const handlePin = (noteId: string) => {
    console.log(noteId);
    dispatch(pinNote(noteId));
  };
  const openModal = (note: Note) => {
    setNote(note);
    setModalOpen(true);
  };
  const closeModal = () => {
    console.log("closed");
    setModalOpen(false);
    console.log(modalOpen);
  };
  const handlePaint = (noteId: string) => {
    setisOptionModelOpen(noteId);
  };
  const handleClickOutside = () => {
    setisOptionModelOpen(null);
  };

  const ref = useOutsideClick(handleClickOutside);
  return (
    <>
      <Note isOpen={modalOpen} onClose={closeModal} note={note}></Note>
      {pinnedNotes.length > 0 && <div className={styles.label}>PINNED</div>}
      <div className={styles.notesListContainer}>
        <div className={styles.layout}>
          {pinnedNotes.map((note) => (
            // <Note key={note.id} note={note} />
            <div
              key={note.id}
              className={styles.notesWrapper}
              onClick={() => {
                openModal(note);
              }}
            >
              <div className={styles.note}>
                <div className={styles.selectIcon}></div>
                <div
                  className={styles.noteContent}
                  style={
                    note.background ? { backgroundColor: note.background } : {}
                  }
                >
                  <div className={styles.titleDescContainer}>
                    <div
                      className={styles.pinnedIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePin(note.id);
                      }}
                    ></div>
                    <div className={styles.title}>{note.title}</div>
                    <div className={styles.description}>{note.content}</div>
                  </div>
                  <div className={styles.iconList}>
                    <div className={styles.notificationIcon}></div>
                    <div className={styles.userIcon}></div>
                    <div
                      ref={ref}
                      data-name="paint"
                      className={styles.paintIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePaint(note.id);
                      }}
                    ></div>
                    <div className={styles.imgIcon}></div>
                    <div
                      className={styles.archieveIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note.id);
                      }}
                    ></div>
                    <div className={styles.ellipsesIcon}></div>
                  </div>
                </div>
                {isOptionModelOpen && (
                  <BackgroundOptionsModel noteId={note.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {pinnedNotes.length > 0 && <div className={styles.label}>OTHERS</div>}
      <div className={styles.notesListContainer}>
        <div className={styles.layout}>
          {unpinnedNotes.map((note) => (
            // <Note key={note.id} note={note} />
            <div
              key={note.id}
              className={styles.notesWrapper}
              onClick={() => {
                openModal(note);
              }}
            >
              <div className={styles.note}>
                <div className={styles.selectIcon}></div>
                <div
                  className={styles.noteContent}
                  style={
                    note.background ? { backgroundColor: note.background } : {}
                  }
                >
                  <div className={styles.titleDescContainer}>
                    <div
                      className={styles.pinIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePin(note.id);
                      }}
                    ></div>
                    <div className={styles.title}>{note.title}</div>
                    <div className={styles.description}>
                      {note.content.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className={styles.iconList}>
                    <div className={styles.notificationIcon}></div>
                    <div className={styles.userIcon}></div>
                    <div
                      ref={ref}
                      data-name="paint"
                      className={styles.paintIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePaint(note.id);
                      }}
                    ></div>
                    <div className={styles.imgIcon}></div>
                    <div
                      className={styles.archieveIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note.id);
                      }}
                    ></div>
                    <div className={styles.ellipsesIcon}></div>
                  </div>
                </div>
                {isOptionModelOpen === note.id && (
                  <BackgroundOptionsModel noteId={note.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesList;
