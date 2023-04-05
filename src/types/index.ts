export interface Project {
  id: number;
  name: string;
  genre: string;
  author: string;
  path: string;
  remoteURL: string;
  image: string;
  tags: string[];
  defaultBranch: string;

  musicFilePath?: string;
}

export interface Commit {
  message: string;
  hash: string;
  author: string;
  date: string;
}
