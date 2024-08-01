import { RefObject } from 'react';

export const modalNotice = (ref: RefObject<HTMLDialogElement>) => {
  ref.current?.showModal();
};
