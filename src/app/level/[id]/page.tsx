export default async function Level({ params }: { params: { id: string } }) {
  return (
    <div className="text-7xl w-[800px]">
      Level {params.id}
    </div>
  );
}
