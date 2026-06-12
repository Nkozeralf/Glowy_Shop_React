interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <h2
        className="
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-bold
          leading-tight
          tracking-tight
          text-glowy-black
          dark:text-glowy-white
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            max-w-xl
            text-base
            md:text-lg
            text-glowy-gray
            dark:text-white/60
          "
        >
          {subtitle}
        </p>
      )}

      <div className="w-12 h-1 rounded-full bg-glowy-pink mt-1" />
    </div>
  )
}