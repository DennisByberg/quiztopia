import "./Toggle.scss";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/darkModeSlice";

function Toggle() {
  const dispatch = useDispatch();

  function handleToggle(): void {
    dispatch(toggleDarkMode());
  }

  return (
    <section>
      <label className="switch">
        <input type="checkbox" onClick={handleToggle} />
        <span className="slider round"></span>
      </label>
    </section>
  );
}
export default Toggle;
