import "./style/style.css";
import "./style/global.css";

import { makeRequest } from "./js/request.js";
import { checkSessionStorage, setGames } from "./js/functions.js";

async function init() {
  let session = checkSessionStorage();

  if (!session) {
    session = await makeRequest();

    setGames(session);
  } else {
    setGames(session);
  }
}

init();