import clsx from "clsx";
import { LoaderIcon } from "lucide-react";

type SubmitButtonProps = {
  isPending: boolean;
};

export default function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={clsx(
        "hover:opacity-75 disabled:opacity-75",
        isPending && "opacity-75",
      )}
      disabled={isPending}
    >
      {isPending ? (
        <LoaderIcon className="animate-spin" aria-label="Loading" />
      ) : null}
      Submit
    </button>
  );
}
