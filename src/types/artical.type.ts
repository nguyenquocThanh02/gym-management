export type typeArtical = {
  _id?: string;
  title: string;
  description?: string;
  coverImage?: string;
  content?: string | String;
  userId?: string;
  author?: {
    name?: string;
  };
  status?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
