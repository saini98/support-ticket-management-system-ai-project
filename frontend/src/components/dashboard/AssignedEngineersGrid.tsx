import { Card, CardContent, Grid, Typography } from "@mui/material";

import EngineerCard from "./EngineerCard";
import type { EngineerCardData } from "./engineerCardData";

interface AssignedEngineersGridProps {
  title?: string;
  engineers?: EngineerCardData[];
}

function AssignedEngineersGrid({
  title = "Assigned Engineers",
  engineers = [],
}: AssignedEngineersGridProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 }, height: "100%" }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>

        {engineers.length === 0 ? (
          <Typography color="text.secondary">
            No assigned engineers yet. Assign tickets to see engineer stats here.
          </Typography>
        ) : (
          <Grid container spacing={2} alignItems="stretch">
            {engineers.map((engineer) => (
              <Grid key={engineer.id} item xs={12} sm={6} lg={12}>
                <EngineerCard
                  name={engineer.name}
                  role={engineer.role}
                  assignedTickets={engineer.assignedTickets}
                  resolvedTickets={engineer.resolvedTickets}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default AssignedEngineersGrid;
