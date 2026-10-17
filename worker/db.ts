export interface UserRecord {
  id: string;
  username: string;
  created_at?: string;
}

export interface ScoreRecord {
  id: string;
  user_id: string;
  challenge_id: string;
  score: number;
  completed_at?: string;
}

export class DatabaseService {
  constructor(private db: D1Database) {}

  async upsertUser(id: string, username: string): Promise<void> {
    await this.db
      .prepare(
        "INSERT INTO users (id, username) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET username = ?"
      )
      .bind(id, username, username)
      .run();
  }

  async insertScore(
    id: string,
    userId: string,
    challengeId: string,
    score: number
  ): Promise<void> {
    await this.db
      .prepare(
        "INSERT INTO scores (id, user_id, challenge_id, score) VALUES (?, ?, ?, ?)"
      )
      .bind(id, userId, challengeId, score)
      .run();
  }

  async getTopScores(limit: number = 10): Promise<any[]> {
    const { results } = await this.db
      .prepare(
        `SELECT s.id, u.username, s.score, s.completed_at 
         FROM scores s 
         JOIN users u ON s.user_id = u.id 
         ORDER BY s.score DESC 
         LIMIT ?`
      )
      .bind(limit)
      .all();

    return results || [];
  }
}
