export function checkSessionStorage() {
  const storedData = sessionStorage.getItem("apiResponse");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
}

export function setGames(data) {
  games(data);
  arrowsControl();
}

function games(data) {
  const div = document.querySelector(".bodyBoard");
  const node = document.querySelector(".game");
  const images = getImages();
  let pages = [];

  data.forEach((element) => {
    let bodyBoardClone = div.cloneNode(false);
    div.parentElement.appendChild(bodyBoardClone);

    element.games.forEach((elementChild) => {
      let cloneNode = node.cloneNode(true);
      bodyBoardClone.id ="round" + element.round;
      bodyBoardClone.appendChild(cloneNode);

      if (bodyBoardClone.id != "round1") {
        bodyBoardClone.classList.add("hidden");
      }

      cloneNode.querySelector(".homeTeam b").innerHTML =
        elementChild.team_home_name;
      cloneNode.querySelector(".homeTeam img").src =
        images[elementChild.team_home_id];
      cloneNode.querySelector(".score .homeTeamScore").innerHTML =
        elementChild.team_home_score;
      cloneNode.querySelector(".awayTeam b").innerHTML =
        elementChild.team_away_name;
      cloneNode.querySelector(".awayTeam img").src =
        images[elementChild.team_away_id];
      cloneNode.querySelector(".score .awayTeamScore").innerHTML =
        elementChild.team_away_score;
    });
    pages.push(bodyBoardClone);
  });

  div.remove();
}

function arrowsControl() {
  const arrowB = document.querySelector("#arrowB");
  const arrowF = document.querySelector("#arrowF");
  const txtRows = document.querySelector("#rodada");
  const txtRowsBase = txtRows.innerHTML;
  let current = 1;

  txtRows.innerHTML = txtRows.innerHTML + " " + current;

  if (current == 1) {
    arrowB.classList.add("disabled");
  }

  arrowB.addEventListener("click", () => {
    if (current > 1) {
      current -= 1;
      txtRows.innerHTML = txtRowsBase + " " + current;
      setPagination(current);
    }

    if (current == 1) {
      arrowB.classList.add("disabled");
    }else{
      arrowF.classList.remove("disabled");
    }
  });

  arrowF.addEventListener("click", () => {
    if (current < 14) {
      current += 1;
      txtRows.innerHTML = txtRowsBase + " " + current;
      setPagination(current);
    }

    if (current == 14) {
      arrowF.classList.add("disabled");
    }else{
      arrowB.classList.remove("disabled");
    }
  });
}

function getImages() {
  const requireContext = require.context(
    "../images",
    false,
    /\.(png|jpg|jpeg|gif|svg)$/
  );

  const images = {};

  requireContext.keys().forEach((filename) => {
    const imageName = filename
      .replace("./", "")
      .replace(/\.(png|jpg|jpeg|gif|svg)$/, "");

    images[imageName] = requireContext(filename);
  });

  return images;
}

function setPagination(current) {
  const div = document.querySelectorAll(".bodyBoard");
  
  div.forEach(element => {
    if(element.id === 'round'+current && element.classList.value.includes('hidden')){
      element.classList.remove('hidden');
    }else{
      element.classList.add('hidden');
    }
  });

}