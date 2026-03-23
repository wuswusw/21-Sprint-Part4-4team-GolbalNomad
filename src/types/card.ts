export type BadgeStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

export interface CardVerticalProps {
  id: number | string;
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount?: number;
  price: number;
  onClick?: () => void;
}

export interface CardReservationProps {
  id: number | string;
  imageUrl: string;
  status: BadgeStatus;
  title: string;
  scheduledDate: string;
  price: number;
  people: number;
  onCancelSuccess?: () => void;
}

export interface CardExperiencesProps {
  id: number | string;
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount?: number;
  price: number;
  onDelete?: () => void;
}
