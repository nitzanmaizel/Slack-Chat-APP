import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import ColorPanel from "./ColorPanel/ColorPanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import SidePanel from "./SidePanel/SidePanel";

const App = () => {
  return (
    <Grid>
      <ColorPanel />
      <SidePanel />
      <Messages />
      <MetaPanel />
    </Grid>
  );
};

export default App;
