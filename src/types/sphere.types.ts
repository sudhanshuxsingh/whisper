export type SphereProps = {
  userId: string;
  title: string;
  description: string;
  showSuggestionToUser: boolean;
  apiKey: string;
  isAcceptingMessages: boolean;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  type: 'message' | 'feedback';
};
