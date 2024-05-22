function getDefinition() {
    var word = document.getElementById("word").value;
    var wordMeaning = document.getElementById("meaning");
  
    wordMeaning.innerHTML = ""; // Clear previous content
  
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Word not found');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data[0].meanings.forEach((meaning) => {
          meaning.definitions.slice(0, 2).forEach((definitions) => {
            const wordDefinition = definitions.definition;
            const wordExample = definitions.example;
            let h1 = document.createElement("h2");
            let h4 = document.createElement("h4");
            let p = document.createElement("p");
            let hr = document.createElement("hr");
            h1.innerHTML = "Meaning:";
            h4.innerHTML = wordDefinition;
            p.innerHTML = wordExample;
            wordMeaning.append(h1, h4, p, hr);
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error here
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Word not found. Please try another word.";
        wordMeaning.appendChild(errorMessage);
      });
}