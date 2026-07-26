interface TechIconsProps {
  items: { name: string; image: string }[];
}

export default function TechIcons({ items }: TechIconsProps) {
  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-2 w-20"
          title={item.name}
        >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          <span className="text-xs text-[#737373] text-center">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
