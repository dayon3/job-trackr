import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardCard = ({ column, icon, length }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 230,
        height: 'max-content',
        padding: '.5rem',
        borderRadius: '0.375rem',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <Typography sx={{ fontSize: 56 }} color="text.primary">
          {length}
        </Typography>
        {icon}
      </CardContent>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary">
          {column.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
