import {
  createContext,
  createRef,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type GuideCueContextType = {
  cueRefs: React.RefObject<HTMLElement>[];
  setCueRefs: Dispatch<SetStateAction<React.RefObject<HTMLElement>[]>>;
  page: string;
  numSteps: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  isDisabled: boolean;
  onComplete?: () => void;
};

export const GuideCueContext = createContext<GuideCueContextType>({
  cueRefs: [],
  setCueRefs: () => {},
  page: '',
  numSteps: 0,
  currentIndex: 0,
  setCurrentIndex: () => {},
  isDisabled: false,
  onComplete: () => {},
});

export const useGuideCue = () => {
  return useContext(GuideCueContext);
};

export const GuideCueProvider = ({
  children,
  page,
  numSteps,
  isDisabled = false,
  onComplete,
}: {
  children: React.ReactNode;
  page: string;
  numSteps: number;
  isDisabled?: boolean;
  onComplete?: () => void;
}) => {
  const [cueRefs, setCueRefs] = useState<React.RefObject<HTMLElement>[]>(
    Array.from({ length: numSteps }, () => createRef<HTMLElement>())
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <GuideCueContext.Provider
      value={{
        cueRefs,
        setCueRefs,
        page,
        numSteps,
        currentIndex,
        setCurrentIndex,
        isDisabled,
        onComplete,
      }}
    >
      {children}
    </GuideCueContext.Provider>
  );
};
