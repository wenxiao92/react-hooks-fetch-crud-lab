import React from "react";

function QuestionItem({ question, onDeleteClick, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  //console.log(id, prompt, answers, correctIndex) //what gets displayed is the first id,
  //first prompt, first answers, correctIndex all at once. And then the second id, second etc...

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  //must create a function to house the prop (of another function). The on click does not
  //'read' a prop. The on event must be assigned to a function, not a reference of it
    function handleDeleteClick(){
      onDeleteClick(id);
    }

    function handleChange(e){
      onAnswerChange(id, e.target.value)
    }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
