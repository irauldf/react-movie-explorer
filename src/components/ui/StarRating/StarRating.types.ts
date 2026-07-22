export interface StarRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  messages?: string[];
  defaultRating?: number;
  onSetRating: (rating: number) => void;
}
