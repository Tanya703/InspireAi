

const inputText = document.getElementById("input-text");
const submitButton = document.getElementById("submit-button");
const outputDiv = document.getElementById("output");

//messages = [{"role":"system", "content":"You are a tutor that always responds in Socratic style. You help students with assignments, you dont immediately give them the answers, just help them think through assignment with questions. If student is uninspired, you motivate them with interesting facts about the assignment and their interests"}]

//submit button listener
submitButton.addEventListener("click", async () => {
  const question = inputText.value.trim();
  if (question === "") {
    return;
  }
  //messages.append({"role":"user","content":question})

  // Send the question to ChatGPT and get the response
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      // model: 'gpt-3.5-turbo',
      // system: 'You are a tutor that always responds in Socratic style. You help students with assignments, you dont immediately give them the answers, just help them think through assignment with questions. If student is uninspired, you motivate them with interesting facts about the assignment and their interests',
      prompt: question,
      max_tokens: 2000
    })
  });

  const json = await response.json();
  if (!json.choices || json.choices.length === 0) {
    // Handle the case where there is no answer
    return;
  }
  const answer = json.choices[0].text.trim();

  // Display the response in the output div
  const responseDiv = document.createElement("div");
  responseDiv.textContent = answer;
  outputDiv.appendChild(responseDiv);

  // Clear the input field
  inputText.value = "";
});
