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
  activateSearchBar(userDatas);
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
  portrait.addEventListener('click', function clickEvent() {
    showOneCharacter(this.character);
  });
  characterDiv.appendChild(portrait);
}

function insertCharacterNameIntoCharacterDivContent(charactersAlive, i, characterDiv) {
  var name = document.createElement('p');
  name.innerHTML += `${charactersAlive[i].name}`;
  characterDiv.appendChild(name);
}

function showOneCharacter(character) {
  var rightSideDiv = document.querySelector('.one-character');
  deleteCharacterTemporaryIdDivIfExists(rightSideDiv);
  var characterDiv = createCharacterDivForRightSide();
  createTitleDivForRightSide(characterDiv);
  createPictureDivForRightSide(character, characterDiv);
  createNameDivForRightSide(character, characterDiv);
  createCrestForRightSide(character, characterDiv);
  createBioDivForRightSide(character, characterDiv);
  rightSideDiv.appendChild(characterDiv);
}

function deleteCharacterTemporaryIdDivIfExists(rightSideDiv) {
  if (document.querySelector('#character-temporary')) {
    var characterTemporary = document.querySelector('#character-temporary');
    rightSideDiv.removeChild(characterTemporary);
  }
}

function createCharacterDivForRightSide() {
  var characterDivForRightSide = document.createElement('div');
  characterDivForRightSide.className = 'character-right-side';
  characterDivForRightSide.id = 'character-temporary';
  return characterDivForRightSide;
}

function createTitleDivForRightSide(characterDiv) {
  var titleDivForRightSide = document.createElement('div');
  titleDivForRightSide.className = 'title-right-side';
  titleDivForRightSide.innerHTML = 'Game of Thrones';
  characterDiv.appendChild(titleDivForRightSide);
}

function createPictureDivForRightSide(character, characterDiv) {
  var pictureDivForRightSide = document.createElement('img');
  pictureDivForRightSide.className = 'picture-right-side';
  if (character.name === 'Jorah Mormont') {
    pictureDivForRightSide.src = '/assets/pictures/jorah_mormont.jpg';
  } else {
    pictureDivForRightSide.src = `/${character.picture}`;
  }
  characterDiv.appendChild(pictureDivForRightSide);
}

function createNameDivForRightSide(character, characterDiv) {
  var nameDivForRightSide = document.createElement('div');
  nameDivForRightSide.className = 'name-right-side';
  nameDivForRightSide.innerHTML = character.name;
  characterDiv.appendChild(nameDivForRightSide);
}

function createCrestForRightSide(character, characterDiv) {
  if (character.house !== '') {
    var crestDivForRightSide = document.createElement('img');
    crestDivForRightSide.className = 'crest-right-side';
    crestDivForRightSide.src = `/assets/houses/${character.house}.png`;
    characterDiv.appendChild(crestDivForRightSide);
  }
}

function createBioDivForRightSide(character, characterDiv) {
  var bioDivForRightSide = document.createElement('div');
  bioDivForRightSide.className = 'bio-right-side';
  bioDivForRightSide.innerHTML = character.bio;
  characterDiv.appendChild(bioDivForRightSide);
}

function activateSearchBar(charactersAlive) {
  var searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', function clickEvent() {
    searchForCharacterName(charactersAlive);
  });
}

function searchForCharacterName(charactersAlive) {
  var rightSideDiv = document.querySelector('.one-character');
  var searched = document.querySelector('#search-text').value.toLowerCase();
  var found = false;
  var i = charactersAlive.length - 1;
  while (i >= 0 && !found) {
    if (searched === charactersAlive[i].name.toLowerCase()) {
      found = true;
      showOneCharacter(charactersAlive[i]);
    }
    i--;
  }
  if (!found) {
    notFound(rightSideDiv);
  }
}

function notFound(rightSideDiv) {
  deleteCharacterTemporaryIdDivIfExists(rightSideDiv);
  var notFoundDiv = document.createElement('div');
  notFoundDiv.className = 'not-found';
  notFoundDiv.id = 'character-temporary';
  notFoundTitle(notFoundDiv);
  notFoundImage(notFoundDiv);
  rightSideDiv.appendChild(notFoundDiv);
}

function notFoundTitle(notFoundDiv) {
  var titleNotFound = document.createElement('div');
  titleNotFound.innerHTML = 'Character not found <br><br><br> Ask him';
  notFoundDiv.appendChild(titleNotFound);
}

function notFoundImage(notFoundDiv) {
  var imageNotFound = document.createElement('img');
  imageNotFound.src = '/assets/site/not-found.png';
  notFoundDiv.appendChild(imageNotFound);
}
