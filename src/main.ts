import { Viewer } from "./scripts/init";
import * as start from "./scripts/start";

const runApp = () => {
  const container = document.querySelector(".container");
  const viewer = new Viewer(container!);
  start.start(viewer);
};

runApp();
