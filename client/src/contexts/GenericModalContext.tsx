import { createContext, ReactNode, useState } from 'react';

const GenericModalContext: any = createContext(null);

const GenericModalProvider = ({ children }: any) => {
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState<ReactNode>(null);

  const [stackOfOpenModals, setStackOfOpenModals] = useState<Array<ReactNode>>([]);

  const openGenericModal = (body: ReactNode) => {
    if (isGenericModalOpen) {
      setStackOfOpenModals([modalBody, ...stackOfOpenModals]);
    }

    setModalBody(body);
    setIsGenericModalOpen(true);
  };

  const closeGenericModal = () => {
    if (stackOfOpenModals?.length) {
      setModalBody(stackOfOpenModals[0]);
      setStackOfOpenModals(stackOfOpenModals.slice(1));
      return;
    }
    setIsGenericModalOpen(false);
  };
  return (
    <GenericModalContext.Provider
      value={{
        isGenericModalOpen,
        openGenericModal,
        closeGenericModal,
        modalBody,
      }}
    >
      {children}
    </GenericModalContext.Provider>
  );
};

export { GenericModalProvider, GenericModalContext };
