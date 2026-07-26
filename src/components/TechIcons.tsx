interface TechIconsProps {
  items: { name: string; image: string }[];
}

export default function TechIcons({ items }: TechIconsProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-2 "
          title={item.name}
        >
            <img
              src={item.image}
              alt={item.name}
              className="object-contain w-20 h-20"
            />
          <span className="text-[#737373] text-center">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
