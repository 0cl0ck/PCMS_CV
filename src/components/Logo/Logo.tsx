import clsx from 'clsx';

interface Props {
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props;

  const loading = loadingFromProps || 'lazy';
  const priority = priorityFromProps || 'low';

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Chanvre Vert Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(
        'max-w-[12rem] w-full h-[34px]',
        'transition-transform duration-300 hover:scale-105', // Ajout de l'animation
        className,
      )}
      src="/media/logo_03.png"
    />
  );
};
