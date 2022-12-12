export interface Project {
  id: number;
  name: string;
  genre: string;
  author: string;
  path: string;
  image: string;
  tags: string[];
}

export interface Commit {
  message: string;
  hash: string;
  author: string;
  date: string;
}
