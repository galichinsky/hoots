// src/components/HootDetails/HootDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import { Link } from "react-router-dom";

const HootDetails = (props) => {
  const { hootId } = useParams();
  // console.log("hootId", hootId);

  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log("hootData", hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  // Verify that hoot state is being set correctly:
  console.log("hoot state:", hoot);

  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.name} posted on &nbsp;
          {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{hoot.text}</p>
      {hoot.author._id === props.user._id && (
        <>
          <Link to={`/hoots/${hootId}/edit`}>Edit</Link> | {" "}
          <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
        </>
      )}
      <section>
        <h2>Comments</h2>

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.name} posted on &nbsp;
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
        <CommentForm handleAddComment={handleAddComment} />
      </section>
    </main>
  );
};

export default HootDetails;
