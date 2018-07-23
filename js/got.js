function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function onReadyStateChange() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  var charactersAlive = deleteDeadCharacters(userDatas);
  var leftSideDiv = document.querySelector('.character-list');
  bubbleSortByNameAscending(charactersAlive);
  createCharacterDivForTheLeftSide(charactersAlive, leftSideDiv);
  console.log(charactersAlive);
}

getData('/json/characters.json', successAjax);

function deleteDeadCharacters(userDatas) {
  var charactersAlive = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i].dead !== 'true') {
      charactersAlive.push(userDatas[i]);
    }
  }
  return charactersAlive;
}

function bubbleSortByNameAscending(charactersAlive) {
  var i = charactersAlive.length - 1;
  var change;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (charactersAlive[j].name > charactersAlive[j + 1].name) {
        [charactersAlive[j], charactersAlive[j + 1]] = [charactersAlive[j + 1], charactersAlive[j]];
        change = j;
      }
    }
    i = change;
  }
}

function createCharacterDivForTheLeftSide(charactersAlive, leftSideDiv) {
  for (var i = 0; i < charactersAlive.length; i++) {
    var characterDiv = document.createElement('div');
    characterDiv.className = 'portrait';
    characterDiv.id = `character-portrait-${i}`;
    insertPortraitIntoCharacterDivContent(charactersAlive, i, characterDiv);
    insertCharacterNameIntoCharacterDivContent(charactersAlive, i, characterDiv);
    leftSideDiv.appendChild(characterDiv);
  }
}

function insertPortraitIntoCharacterDivContent(charactersAlive, i, characterDiv) {
  var portrait = document.createElement('img');
  portrait.src = `/${charactersAlive[i].portrait}`;
  portrait.character = charactersAlive[i];
  characterDiv.appendChild(portrait);
}

function insertCharacterNameIntoCharacterDivContent(charactersAlive, i, characterDiv) {
  var name = document.createElement('p');
  name.innerHTML += `${charactersAlive[i].name}`;
  characterDiv.appendChild(name);
}
