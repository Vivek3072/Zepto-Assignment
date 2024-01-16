interface ChipProps {
  label: string;
  img: string;
  onRemove: () => void;
}

const Chip: React.FC<ChipProps> = ({ img, label, onRemove }) => {
  return (
    <div className="flex items-center gap-2 bg-primary text-white rounded-full py-1 px-2">
      <img src={img} alt=""
        className="w-6 h-6 rounded-full"
      />
      <span className="text-sm font-medium">{label}</span>
      <button
        onClick={onRemove}
        className="rounded-full flex items-center justify-center bg-black bg-opacity-30 text-white p-1 text-lg"
        aria-label={`Remove ${label}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="white"
          className="bi bi-x-lg"
          viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </button>
    </div>
  );
};

export default Chip;
