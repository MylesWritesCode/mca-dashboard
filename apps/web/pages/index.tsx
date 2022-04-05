import { Button, NavigationDrawer } from "ui";
import { MENU_ITEMS } from "../config";

export default function Web() {
  return (
    <div>
      <NavigationDrawer items={MENU_ITEMS} />
      <h1>Web</h1>
      <Button>This is my button</Button>
    </div>
  );
}
