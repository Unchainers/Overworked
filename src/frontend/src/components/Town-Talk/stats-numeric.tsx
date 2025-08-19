export interface StatsNumericProps {
  label: string;
  value: string;
}

export default function StatsNumeric({ label, value }: StatsNumericProps) {
  return (
    <div className="flex flex-row items-center space-y-2">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}
