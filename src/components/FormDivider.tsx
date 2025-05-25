type FormDividerProps = {
  text?: string;
};

export default function FormDivider({
  text = "Or sign up with",
}: FormDividerProps) {
  return (
    <div className="sign-up-with relative flex items-center justify-center my-10">
      <p className="text-sm font-medium text-black/50 text-center absolute bg-white px-6">
        {text}
      </p>
      <div className="divider border-t border-black/20 w-full" />
    </div>
  );
}
