import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]) //initial state should match the type of data
  //it should hold (otherwise error) which is an array

  useEffect(() =>{
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((data)=> setQuestions(data))
  },[])

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id); //filter method for fetch
      //follows where the state is. If the state was in QuestionItem component, this would be
      //filtered in the handleDeleteClick function
      setQuestions(updatedQuestions)
    });
  }

  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex}),
    })
    .then((resp) => resp.json())
    .then((updatedQuestion) => { //grabbed the json due to it being needed for the map method to find the matching id
      const updatedAnswer = questions.map((q) => {
        if(q.id === updatedQuestion.id) return updatedQuestion
        return q;
      })

      setQuestions(updatedAnswer)

    })
  }

  const displayQuestion = questions.map((eachQuestion) => (
    <QuestionItem
      key={eachQuestion.id}
      question={eachQuestion}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
      /> ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestion}</ul>
    </section>
  );
}

export default QuestionList;
