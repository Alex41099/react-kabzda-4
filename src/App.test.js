
import {createRoot} from "react-dom/client";
import {SamuraiJSApp} from "./App";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<SamuraiJSApp/>);
  root.unmount();
});