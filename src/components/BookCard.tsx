type Props = {
  large?: boolean;
};

export default function BookCard({ large }: Props) {
  return (
    <div className={`relative ${large ? "w-full max-w-[480px]" : "w-full max-w-[340px]"}`}>
      <div
        className={`w-full
          ${large ? "aspect-[4/5]" : "h-[240px]"}
          bg-[url('/images/book-card-image.png')]
          bg-center bg-contain bg-no-repeat`}
      />
    </div>
  );
}
