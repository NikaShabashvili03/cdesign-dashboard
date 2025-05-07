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
      <div className='px-10 py-4 bg-[#4c583e] rounded-xl w-fit'>
        <h2 className='text-2xl text-[#daded8] font-bold'>{t("renovations")}</h2>
      </div>
      <div className={clsx(
        'grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 w-full',
        data?.length !== 0 ? "grid" : "flex justify-center py-5"
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
            <h2 className='text-xl text-[#4c583e] font-semibold'>{t("empty_renovations")}</h2>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
