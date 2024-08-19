import styles from "./BackgroundOptions.module.css";
import { updateBackground } from "../../store/notesSlice";
import { useDispatch } from "react-redux";
function BackgroundOptionsModel({
  noteId,
  getColor,
}: {
  noteId?: string;
  getColor?: (color: string) => void;
}) {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [color, setcolor] = useState("");

  const colorsSet1 = [
    { color: "#FF0000", id: "1" }, // Red
    { color: "#008000", id: "2" }, // Green
    { color: "#0000FF", id: "3" }, // Blue
    { color: "#FFFF00", id: "4" }, // Yellow
    { color: "#00FFFF", id: "5" }, // Cyan
    { color: "#FF00FF", id: "6" }, // Magenta
    { color: "#FFA500", id: "7" }, // Orange
    { color: "#800080", id: "8" }, // Purple
    { color: "#FFC0CB", id: "9" }, // Pink
    { color: "#A52A2A", id: "10" }, // Brown
    { color: "#00FF00", id: "11" }, // Lime
    { color: "#4B0082", id: "12" }, // Indigo
  ];
  const colorsSet2 = [
    { color: "#EE82EE", id: "13" }, // Violet
    { color: "#FFD700", id: "14" }, // Gold
    { color: "#C0C0C0", id: "15" }, // Silver
    { color: "#808080", id: "16" }, // Gray
    { color: "#008080", id: "17" }, // Teal
    { color: "#000080", id: "18" }, // Navy
    { color: "#808000", id: "19" }, // Olive
    { color: "#800000", id: "20" }, // Maroon
    { color: "#40E0D0", id: "21" }, // Turquoise
    { color: "#FFDAB9", id: "22" }, // Peach
    { color: "#E6E6FA", id: "23" }, // Lavender
    { color: "#FF7F50", id: "24" }, // Coral
  ];

  const updateBackgroundColor = (color: string) => {
    console.log(color);
    // setcolor(color);
    if (getColor) getColor(color);
    if (noteId) dispatch(updateBackground({ id: noteId, color: color }));
  };
  return (
    <div className={styles.backgroundOptionsContainer}>
      <div className={styles.backgroundOptionsWrapper}>
        {/* <div
          className={styles.option}
          data-name="paint"
          style={{ border: "4px solid white" }}
        ></div> */}
        {colorsSet1.map((color) => (
          <div
            key={color.id}
            className={styles.option}
            data-value={color.color}
            style={color ? { backgroundColor: color.color } : {}}
            data-name="paint"
            onClick={(e) => {
              e.stopPropagation();
              updateBackgroundColor(color.color);
            }}
          ></div>
        ))}
      </div>
      <div className={styles.backgroundOptionsWrapper}>
        {colorsSet2.map((color) => (
          <div
            key={color.id}
            className={styles.option}
            data-value={color.color}
            style={color ? { backgroundColor: color.color } : {}}
            data-name="paint"
            onClick={(e) => {
              e.stopPropagation();
              updateBackgroundColor(color.color);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BackgroundOptionsModel;
