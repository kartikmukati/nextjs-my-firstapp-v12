// /api/comments/e1
// /api/comments/e2

function handler(req, res) {

    const eventId = req.query.eventId;

    if(req.method === 'POST') {

        //req.body extract
        const { email, name, text } = req.body;

        //add server side validation

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({message: 'Invalid Input'})
            return;
        }

        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            text
        }
        console.log(newComment);
        res.status(201).json({message: 'Added Comment', comment: newComment});
    }
    else if (req.method === 'GET') {
        const dummyList = [
            {id: 'c1', email: 'Kartik', text: 'A first comment from backend!'},
            {id: 'c2', email: 'Kartik Mukati', text: 'A second comment from backend!'},
        ]

        res.status(200).json({comments: dummyList})
    }

}

export default handler;