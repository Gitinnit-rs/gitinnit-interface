export interface Project {
  id: number;
  name: string;
  genre: string;
  author: string;
  path: string;
  image: string;
  tags: string[];
  defaultBranch: string
}

export interface Commit {
  message: string;
  hash: string;
  author: string;
  date: string;
}
