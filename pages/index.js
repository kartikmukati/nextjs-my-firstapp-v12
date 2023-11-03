import { useRef, useState } from 'react';

function HomePage(props) {

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [loadedFeedback, setLoadedFeedback] = useState([]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {email: enteredEmail, text: enteredFeedback}

    // API Route Request 
    fetch('/api/feedback', {
      method:  'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res)
    }).catch(err => console.log(err))

  }

  function loadFeedbackHandler() {
    fetch('/api/feedback').then(res => {
      return res.json().then(data => {
        setLoadedFeedback(data.feedback)
      })
    }).catch(err => console.log(err))
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email address</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}/>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr></hr>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {loadedFeedback.map(feedback => <li key={feedback.id}>{feedback.text}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
