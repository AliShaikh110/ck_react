import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { searchTopics } from "../util/topicSearch";
import UseMeiliDataContext from "../context/MeiliContext";

interface topSearchBarProps {
  routeName: string;
  typeName: "topicData" | "subjectData" | "exams" | "category";
  dropdownType:string
}

export type TopicHit = {
    id: number;
    title?: string;
    name?: string;
    slug?: string;
    description?: string;
};

const TopicSearchBar = ({  routeName, typeName, dropdownType }: topSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TopicHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const { addDropItem } = UseMeiliDataContext();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const handle = setTimeout(async () => {
      try {
        setLoading(true);
        const hits = await searchTopics(query, routeName);
        console.log(hits)
        setResults(hits);
      } catch (err) {
        console.error("Meilisearch error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handle);
  }, [query, routeName]);

  const handleSelect = (topic:TopicHit) => {
    const title = topic.title || topic.name || topic.slug || `Topic #${topic.id}`;

    addDropItem(title, topic.id, typeName,dropdownType);
    setQuery("");
    setResults([]);
  };

  return (
    <Box sx={{ maxWidth: 600, width: "100%", position: "relative" }}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        label="Search topics"
        placeholder="Type to search…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!touched) setTouched(true);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading && <CircularProgress size={18} />}
            </InputAdornment>
          ),
        }}
      />

      {/* helper text below input, still in flow but small */}
      {!loading && touched && query && results.length === 0 && (
        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "text.secondary" }}
        >
          No topics found for “{query}”.
        </Typography>
      )}

      {/* DROPDOWN – absolutely positioned so it doesn’t push layout */}
      {!loading && results.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",          // just below the TextField
            left: 0,
            width: "100%",
            mt: 0.5,
            maxHeight: 260,
            overflowY: "auto",
            borderRadius: 2,
            zIndex: 10,
          }}
        >
          <List dense disablePadding>
            {results.map((topic: TopicHit) => {
              const primaryText =
                topic.title || topic.name || topic.slug || `Topic #${topic.id}`;

              return (
                <ListItemButton
                  key={topic.id}
                  onClick={() => handleSelect(topic)}
                >
                  <ListItemText primary={primaryText} />
                </ListItemButton>
              );
            })}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default TopicSearchBar;
