import { useEffect } from 'react';
import RenovationCard from '../components/renovation/RenovationCard';
import { useRenovationStore } from '../stores/renovationStore';
import clsx from 'clsx';
import RenovationCardSkeleton from '../components/renovation/RenovationCardSkeleton';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { data, loading, fetchRenovations } = useRenovationStore()
  const { t } = useTranslation()
  
  useEffect(() => {
    fetchRenovations()
  }, [])

  return (
    <div className='w-full flex flex-col gap-5 py-5'>
      <div className='px-10 py-4 bg-main-color rounded-xl w-fit'>
        <h2 className='text-2xl text-secondary-color font-bold'>{t("renovations")}</h2>
      </div>
      <div className={clsx(
        'sm:grid-cols-3 lg:grid-cols-5 gap-5 w-full',
        data?.length !== 0 ? "flex flex-col sm:grid" : "flex flex-col items-center justify-center py-5"
      )}>
        {loading ? (
            [...Array(4)].map((_, i) => (
              <RenovationCardSkeleton key={i}/>
            ))
        ) : (
          data.length !== 0 ?
          (
            data?.map((renovation) => (
              <RenovationCard key={renovation.id} {...renovation}/>
            ))
          )
          : (
            <h2 className='text-xl text-main-color font-semibold'>{t("empty_renovations")}</h2>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
