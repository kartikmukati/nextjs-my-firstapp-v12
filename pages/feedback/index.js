import {buildFeedbackPath, extractFeedback} from '../api/feedback'

const Feedback = (props) => {

    return (
        <ul>
            {props.feedback.map(feedback => <li key={feedback.id}>{feedback.text}</li>)}
        </ul>
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