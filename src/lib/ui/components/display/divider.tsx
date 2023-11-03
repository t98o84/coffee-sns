export interface DividerProps {
  text?: string;
  className?: string;
  textClassName?: string;
}

export function Divider(props: DividerProps) {
  const Border = () => (
    <div
      className={`flex-grow border-t border-gray-400 ${props.className}`}
    ></div>
  );

  return (
    <div className="relative flex items-center">
      <Border />
      {props.text && (
        <>
          <span
            className={`flex-shrink mx-4 text-gray-400 ${props.textClassName}`}
          >
            {props.text}
          </span>
          <Border />
        </>
      )}
    </div>
  );
}
