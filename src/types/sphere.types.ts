export type SphereProps = {
  userId: string;
  title: string;
  description: string;
  showSuggestionToUser: boolean;
  apiKey: string;
  isAcceptingMessage: boolean;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  type: 'message' | 'feedback';
};
