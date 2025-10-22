export interface Submission {
  id: string;
  challenge_id: string;
  user_id: string;
  repo_url: string;
  status: 'pending' | 'approved' | 'rejected';
}
