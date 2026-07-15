import {
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { dashboardSkeletonCardSx } from "./skeletonStyles";

interface RecentTicketsTableSkeletonProps {
  rows?: number;
}

function RecentTicketsTableSkeleton({
  rows = 5,
}: RecentTicketsTableSkeletonProps) {
  const columns = 7;

  return (
    <Card elevation={0} sx={dashboardSkeletonCardSx}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Skeleton variant="text" width={160} height={32} sx={{ mb: 2 }} />

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {Array.from({ length: columns }, (_, index) => (
                  <TableCell key={`header-${index}`}>
                    <Skeleton variant="text" width="80%" height={20} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: rows }, (_, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {Array.from({ length: columns }, (__, colIndex) => (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      <Skeleton
                        variant="text"
                        width={colIndex === columns - 1 ? 48 : "90%"}
                        height={20}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default RecentTicketsTableSkeleton;
