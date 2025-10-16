import './styles.css';

export interface ContentCardProps {
  title: string;
  author: string;
}

export const ContentCard = (props: ContentCardProps) => (
  <div className="content-card">
    <h3>{props.title}</h3>
    <p>by {props.author}</p>
  </div>
)
