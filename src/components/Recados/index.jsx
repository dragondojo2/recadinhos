import "./styles.scss";

export function Recados({ content, author, children }) {
  return (
    <div className="recado">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          {/* <img src={author.avatar} alt={author.name} /> */}
          <span>{author}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
