-- Create search_history table for storing agent testing results
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  product TEXT NOT NULL,
  status TEXT NOT NULL,
  result JSONB,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT search_history_status_check CHECK (status IN ('success', 'error', 'loading'))
);

-- Enable row level security
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own search history
DROP POLICY IF EXISTS "Users can only access their own search history" ON search_history;
CREATE POLICY "Users can only access their own search history"
ON search_history
FOR ALL
USING (auth.uid() = user_id);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE search_history;
