const SUPABASE_URL = 'https://gwoirahsdyodlcidrpzm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3b2lyYWhzZHlvZGxjaWRycHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMDEyNjYsImV4cCI6MjA2Nzc3NzI2Nn0.4FMNMYTXSjZXV8y_vS_2SLjEz3gFn2G81i-Zjv39jyY';

async function saveScoreToSupabase(name, score) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify({ name, score })
  });
}

async function fetchLeaderboardFromSupabase() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?select=*`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  data.sort((a, b) => b.score - a.score); // highest first
  return data.slice(0, 10);
}
