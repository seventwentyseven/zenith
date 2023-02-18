import { IArticle } from '../../constants/articles'

const Article = (props: IArticle) => {
  let articleBody = props.articleBody
  // NOTE: This abomination below shortens the article's body to 100 characters.
  if (props.articleBody!.toString().length >= 100)
    articleBody = props.articleBody?.toString().substring(0, 100) + '...'
  return (
    <div className="card rounded-lg w-full mt-4 bg-base-200 border-white/20 border-px">
      <figure>
        <img
          src={props.articleThumbnail}
          alt="Article Thumbnail"
          height="4rem"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-row items-center justify-between -mt-4">
          <div>
            <img
              src={`https://a.seventwentyseven.xyz/${props.authorId}`}
              className="avatar rounded-full w-10 mr-2"
            />
            {props.authorName}
          </div>
          <div>Something here, idk what</div>
        </div>
        <hr className="my-2 -mx-8 border-base-content" />
        <h2 className="card-title">{props.articleTitle}</h2>
        <p>{articleBody}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read more</button>
        </div>
      </div>
    </div>
  )
}

export default Article
