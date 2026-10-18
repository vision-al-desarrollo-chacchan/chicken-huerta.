declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ADMIN_EMAIL?: string;
    SEED_TOKEN?: string;
    BUCKET?: R2Bucket;
  }
}
