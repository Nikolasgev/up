async function search() {
    const keyword = document.getElementById('keyword').value;
    const response = await fetch(`http://localhost:3000/keywords/${keyword}`);
    const data = await response.json();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(word => {
            const button = document.createElement('button');
            button.innerText = word;
            button.onclick = () => downloadWord(word);
            resultsContainer.appendChild(button);
        });
    } else {
        resultsContainer.innerText = 'No words found for this keyword.';
    }
}

async function downloadWord(word) {
    const response = await fetch(`http://localhost:3000/download/${word}`);
    const blob = await response.blob();

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${word}`;
    document.body.appendChild(a);
    a.style.display = 'none';
    a.click();
    document.body.removeChild(a);
}

