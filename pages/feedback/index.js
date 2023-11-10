import { useState} from 'react'
import {buildFeedbackPath, extractFeedback} from '../api/feedback'


const Feedback = (props) => {

    const [feedbackData, setFeedbackData] = useState();

    const loadFeedbackHandler = (id) => {
        console.log(id)
        fetch(`/api/${id}`).then(res => {
            return res.json().then(data => {
                console.log(data)
                setFeedbackData(data.feedback);
            })
        })
    }

    return (
        <>
        {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedback.map(feedback => <li key={feedback.id}>
                    {feedback.text} <button onClick={() => loadFeedbackHandler(feedback.id)}>Show Details</button>
                    </li>)}
            </ul>
        </>
    )
}

export default Feedback;

export async function getStaticProps() {

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    return {
        props: {
            feedback: data
        }
    }
}