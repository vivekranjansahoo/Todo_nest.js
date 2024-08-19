export interface Todo {
  _id?: string; // Optional field for MongoDB ObjectId
  title: string;
  description: string;
  completed: boolean;
  userId: string; // Reference to the user who owns the To-Do
}
