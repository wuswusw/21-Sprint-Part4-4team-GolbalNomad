export type BadgeStatus = 'cancel' | 'confirmed' | 'rejected' | 'approval' | 'completed';

export interface CardVerticalProps {
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount?: number;
  price: number;
  onClick?: () => void;
}

export interface CardHorizontal1Props {
  imageUrl: string;
  status: BadgeStatus;
  title: string;
  scheduledDate: string;
  headCount?: number;
  price: number;
  people: number;
  onEdit?: () => void;
  onCancel?: () => void;
  onWriteReview?: () => void;
}

export interface CardHorizontal2Props {
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount?: number;
  price: number;
  onEdit?: () => void;
  onDelete?: () => void;
}
