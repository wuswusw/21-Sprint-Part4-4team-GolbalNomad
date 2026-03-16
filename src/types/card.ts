export type BadgeStatus = 'cancel' | 'confirmed' | 'rejected' | 'approval' | 'completed';

export interface CardVerticalProps {
  id: number | string;
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount?: number;
  price: number;
  onClick?: () => void;
}

export interface CardHorizontal1Props {
  id: number | string;
  imageUrl: string;
  status: BadgeStatus;
  title: string;
  scheduledDate: string;
  headCount?: number;
  price: number;
  people: number;
}

export interface CardHorizontal2Props {
  id: number | string;
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount?: number;
  price: number;
  onEdit?: () => void;
  onDelete?: () => void;
}
