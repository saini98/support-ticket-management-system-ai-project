import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

import { dashboardSkeletonCardSx } from "./skeletonStyles";

interface TimelineSkeletonProps {
  items?: number;
}

function TimelineSkeleton({ items = 5 }: TimelineSkeletonProps) {
  return (
    <Card elevation={0} sx={dashboardSkeletonCardSx}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Skeleton variant="text" width={160} height={32} sx={{ mb: 2 }} />

        <Stack spacing={2}>
          {Array.from({ length: items }, (_, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
              <Skeleton variant="circular" width={24} height={24} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="35%" height={22} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="25%" height={16} />
              </Box>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TimelineSkeleton;
