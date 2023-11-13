import classes from './comment-list.module.css';

function CommentList() {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>My first comment!</p>
        <div>
          By <address>Kartik</address>
        </div>
      </li>
      <li>
        <p>My second comment!</p>
        <div>
          By <address>Kartik</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
