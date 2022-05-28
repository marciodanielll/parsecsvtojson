function parseCsvForJson(str) {
  const result = str.split('\n').reduce((acc, row, index, arr) => {
    if (index === 0) return acc;
    acc.push({ [arr[0]]: row });
    return acc;
  }, []);
  const json = document.getElementById('json');
  json.value = JSON.stringify(result);
}

function createEventButtoConverter() {
  const buttoConverter = document.getElementById('converter');
  buttoConverter.addEventListener('click', () => {
    const textArea = document.getElementById('csv').value;
    parseCsvForJson(textArea);
  });
}

function creatreVentButtoDownload() {
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
  createEventButtoConverter();
  creatreVentButtoDownload();
}
