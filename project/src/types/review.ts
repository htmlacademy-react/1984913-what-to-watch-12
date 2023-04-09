export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
  id: number;
  name: string;
  };
}

export type NewReview = {
  comment: string;
  rating: number;
}

export type Reviews = Review[];
