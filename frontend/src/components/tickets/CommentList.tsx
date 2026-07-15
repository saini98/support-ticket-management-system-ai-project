import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import type { Comment } from "../../types/comment.types";
import { formatTicketDate } from "../../utils/ticket.utils";
import { formatUserLabel } from "../../utils/user.utils";

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
        <Typography color="text.secondary">
          No comments yet. Be the first to add one.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined">
      <List disablePadding>
        {comments.map((comment, index) => (
          <ListItem
            key={comment.id}
            alignItems="flex-start"
            divider={index < comments.length - 1}
            sx={{ px: 3, py: 2 }}
          >
            <ListItemAvatar>
              <Avatar>{comment.author.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={formatUserLabel(comment.author)}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    User ID: {comment.author.id}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {comment.message}
                  </Typography>
                  <Typography component="span" variant="caption" color="text.secondary">
                    {formatTicketDate(comment.createdAt)}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default CommentList;
