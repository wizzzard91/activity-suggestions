import './styles.css';
import type { DaySuggestion } from '../api/suggestions.api';

export interface ContentCardProps {
  daySuggestion: DaySuggestion;
}

export const ContentCard = ({ daySuggestion }: ContentCardProps) => {
  const cardTitle = `Suggestions for ${new Date(daySuggestion.date).toLocaleDateString()}`;

  const sortedActivities = [...daySuggestion.activities].sort((a, b) => b.rank - a.rank);

  const prettifiedActivities = sortedActivities.map((activity) => (
    <div className="activity-item">
      <div>{activity.activityName}</div>
      <div>{activity.rank}/10</div>
    </div>
  ));

  return (
    <div className="content-card">
      <h3>{cardTitle}</h3>
      {prettifiedActivities}
    </div>
  );
};
