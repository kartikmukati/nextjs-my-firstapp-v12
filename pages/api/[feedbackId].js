import {buildFeedbackPath, extractFeedback} from './feedback'

function handler(req, res) {

    const feedbackId = req.query.feedbackId;
    console.log(feedbackId)
    //file path
    const filePath = buildFeedbackPath();
    // data read
    const feedbackData = extractFeedback(filePath);

    // filter unique id 
    const selectedFeedback = feedbackData.find((feedback) => feedback.id === feedbackId)

    //res
    res.status(200).json({feedback: selectedFeedback});
}

export default handler;