function parseCsvForJson(str) {
  if (str.length === 0 || str === '  ') {
    const body = document.getElementById('body');
    const dialog = document.createElement('dialog');
    dialog.id = 'dialog';
    const p = document.createElement('p');
    p.innerText = 'Valor inválido';
    dialog.appendChild(p);
    const resetButton = document.createElement('button');
    resetButton.innerText = 'OK';
    resetButton.addEventListener('click', () => {
      console.log('clicked');
      dialog.close();
    });
    dialog.appendChild(resetButton);
    body.appendChild(dialog);
    dialog.showModal();
  } else {
    const result = str.split('\n').reduce((acc, row, index, arr) => {
      if (index === 0) return acc;
      acc.push({ [arr[0]]: row });
      return acc;
    }, []);
    const json = document.getElementById('json');
    json.value = JSON.stringify(result);
  }
}

function createEventButtonConverter() {
  const buttonConverter = document.getElementById('converter');
  buttonConverter.addEventListener('click', () => {
    const textArea = document.getElementById('csv').value;
    parseCsvForJson(textArea);
  });
}

function createEventButtonDownload() {
  const buttonDownload = document.getElementById('download');
  buttonDownload.addEventListener('click', (event) => {
    event.preventDefault();
    const json = document.getElementById('json').value;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'list.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

window.onload = () => {
  createEventButtonConverter();
  createEventButtonDownload();
}
