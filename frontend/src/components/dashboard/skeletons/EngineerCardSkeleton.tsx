import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";

import { dashboardSkeletonCardSx } from "./skeletonStyles";

function EngineerCardSkeleton() {
  return (
    <Card elevation={0} sx={dashboardSkeletonCardSx}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Skeleton variant="circular" width={48} height={48} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={24} />
            <Skeleton variant="text" width="45%" height={20} />
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Skeleton
              variant="text"
              width={40}
              height={32}
              sx={{ mx: "auto" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={16}
              sx={{ mx: "auto" }}
            />
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Skeleton
              variant="text"
              width={40}
              height={32}
              sx={{ mx: "auto" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={16}
              sx={{ mx: "auto" }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default EngineerCardSkeleton;
