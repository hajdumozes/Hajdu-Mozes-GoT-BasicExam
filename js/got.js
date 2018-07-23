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
  bubbleSortByNameAscending(charactersAlive);
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
