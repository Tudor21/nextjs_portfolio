interface MessageProps {
  quote?: string;
}

const Message: React.FC<MessageProps> = ({
  quote = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
}: MessageProps) => {
  return (
    <section>
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        <div className="relative mx-auto max-w-6xl px-6 lg:block text-center">
          <p className="font-medium text-2xl lg:text-3xl">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};

export default Message;
