import { ReactElement, JSXElementConstructor, ReactNode } from "react";
import { toast, ToastContentProps } from "react-toastify";

export const handleSuccess = (
  msg:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ((props: ToastContentProps<unknown>) => React.ReactNode)
    | null
    | undefined
) => {
  toast.success(msg, {
    position: "top-right",
  });
};

export const handleError = (
  msg:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ((props: ToastContentProps<unknown>) => React.ReactNode)
    | null
    | undefined
) => {
  toast.error(msg, {
    position: "top-right",
  });
};
