import clsx from 'clsx';

interface Props {
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
  showText?: boolean;
  textClassName?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    showText = false,
    textClassName,
    size = 'medium',
  } = props;

  const loading = loadingFromProps || 'lazy';
  const priority = priorityFromProps || 'low';

  // Définir les tailles en fonction de la prop size
  const logoSizes = {
    small: 'w-8 h-8 md:w-10 md:h-10',
    medium: 'w-10 h-10 md:w-[70px] md:h-[70px]',
    large: 'w-12 h-12 md:w-[90px] md:h-[90px]',
    xl: 'w-16 h-16 md:w-[120px] md:h-[120px]',
  };

  const textSizes = {
    small: 'text-xs md:text-sm',
    medium: 'text-sm md:text-xl',
    large: 'text-base md:text-2xl',
    xl: 'text-lg md:text-3xl',
  };

  return (
    <div className={clsx('flex items-center', className)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="Chanvre Vert Logo"
        width={size === 'xl' ? 120 : size === 'large' ? 90 : size === 'medium' ? 70 : 40}
        height={size === 'xl' ? 120 : size === 'large' ? 90 : size === 'medium' ? 70 : 40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx(
          logoSizes[size],
          'transition-transform duration-300 hover:scale-105', // Ajout de l'animation
        )}
        src={'/media/logo.png'}
      />

      {showText && (
        <span
          className={clsx(
            'ml-2 md:ml-3 font-medium tracking-wide',
            textSizes[size],
            'transition-transform duration-300 hover:scale-105',
            textClassName,
          )}
        >
          Chanvre Vert
        </span>
      )}
    </div>
  );
};
