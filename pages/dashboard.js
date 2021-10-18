import DashboardShell from '@/components/DashboardShell';
import DashboardCard from '@/components/DashboardCard';
import useTrackerData from '@/hooks/useTrackerData';
import { useAuth } from '@/lib/auth';
import COLUMN_ICONS from '@/utils/icons';
import styles from '@/styles/Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();
  const userId = user?.uid;
  const { initialData } = useTrackerData(userId);

  return (
    <DashboardShell cta color button>
      <section className={styles.section}>
        {initialData?.columnOrder?.map((col, index) => {
          const column = initialData?.columns[col];
          const jobs = column.jobIds?.map((job) => initialData?.jobs[job]);
          const length = jobs.length;
          const icon = COLUMN_ICONS[Object.keys(COLUMN_ICONS)[index]];

          return (
            <DashboardCard
              key={index}
              column={column}
              icon={icon}
              length={length}
            />
          );
        })}
      </section>
    </DashboardShell>
  );
}
