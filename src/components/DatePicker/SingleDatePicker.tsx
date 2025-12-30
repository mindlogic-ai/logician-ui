import {
  SingleDatepicker,
  SingleDatepickerProps,
} from 'chakra-dayzed-datepicker';

export const SingleDatePicker = ({
  propsConfigs,
  configs,
  usePortal = true,
  ...rest
}: SingleDatepickerProps) => {
  return (
    <SingleDatepicker
      usePortal={usePortal}
      {...rest}
      configs={{
        ...configs,
        dateFormat: configs?.dateFormat ?? 'MM/dd/yyyy',
      }}
      propsConfigs={{
        triggerBtnProps: {
          justifyContent: 'left',
          fontWeight: 'regular',
          color: 'gray.1500',
          fontSize: 'md',
          ...propsConfigs?.triggerBtnProps,
        },
        inputProps: {
          color: 'primary.dark',
          ...propsConfigs?.inputProps,
        },
        popoverCompProps: {
          popoverContentProps: {
            boxShadow: 'lg',
            ...propsConfigs?.popoverCompProps?.popoverContentProps,
          },
          ...propsConfigs?.popoverCompProps,
        },
        calendarPanelProps: {
          wrapperProps: {
            gap: 4,
            ...propsConfigs?.calendarPanelProps?.wrapperProps,
          },
          dividerProps: {
            display: 'none',
            ...propsConfigs?.calendarPanelProps?.dividerProps,
          },
          contentProps: {
            borderWidth: 0,
            p: 4,
            ...propsConfigs?.calendarPanelProps?.contentProps,
          },
          bodyProps: {
            gap: 0,
            rowGap: 1,
            ...propsConfigs?.calendarPanelProps?.bodyProps,
          },
          ...propsConfigs?.calendarPanelProps,
        },
        dateNavBtnProps: {
          color: 'primary.main',
          ...propsConfigs?.dateNavBtnProps,
        },
        weekdayLabelProps: {
          mb: 2,
          color: 'gray.1000',
          fontWeight: 'regular',
          ...propsConfigs?.weekdayLabelProps,
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            width: 34,
            height: 34,
            color: 'gray.1500',
            fontSize: 'sm',
            fontWeight: 'regular',
            _hover: {
              background: 'primary.lightest',
              ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps?._hover,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps,
          },
          todayBtnProps: {
            fontWeight: 'semibold',
            ...propsConfigs?.dayOfMonthBtnProps?.todayBtnProps,
          },
          selectedBtnProps: {
            color: 'white',
            border: 'none',
            background: 'primary.main',
            borderRadius: 'full',
            ...propsConfigs?.dayOfMonthBtnProps?.selectedBtnProps,
          },
          ...propsConfigs?.dayOfMonthBtnProps,
        },
        ...propsConfigs,
      }}
    />
  );
};
