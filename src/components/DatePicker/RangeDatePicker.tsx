import {
  RangeDatepicker as BaseRangeDatePicker,
  RangeDatepickerProps,
} from 'chakra-dayzed-datepicker';

export const RangeDatePicker = ({
  propsConfigs,
  configs,
  usePortal = true,
  ...rest
}: RangeDatepickerProps) => {
  return (
    <BaseRangeDatePicker
      usePortal={usePortal}
      {...rest}
      configs={{
        ...configs,
        dateFormat: configs?.dateFormat ?? 'MMM dd, yyyy',
      }}
      propsConfigs={{
        triggerBtnProps: {
          justifyContent: 'left',
          pl: 2,
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
            p: 2,
            borderRadius: 16,
            borderWidth: '1px',
            borderColor: 'primary.lightest',
            boxShadow: 'lg',
            css: {
              '.chakra-button[aria-pressed="true"]': {
                borderRadius: 'full',
              },
              '.chakra-button[aria-pressed="false"]:has(+ .chakra-button[aria-pressed="true"])':
                {
                  borderRightRadius: 'sm',
                },
              '.chakra-button[aria-pressed="true"] + .chakra-button[aria-pressed="false"]':
                {
                  borderLeftRadius: 'sm',
                },
              '.chakra-button[aria-pressed="false"]:nth-child(7n + 1)': {
                borderLeftRadius: 'sm',
              },
              '.chakra-button[aria-pressed="false"]:nth-child(7n)': {
                borderRightRadius: 'sm',
              },
            },
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
            borderStyle: 'none',
            ...propsConfigs?.calendarPanelProps?.dividerProps,
          },
          contentProps: {
            px: 6,
            py: 4,
            borderWidth: '1px',
            borderColor: 'primary.lightest',
            borderRadius: 16,
            bg: 'white',
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
          fontSize: 'sm',
          fontWeight: 'regular',
          ...propsConfigs?.weekdayLabelProps,
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            width: 34,
            height: 34,
            color: 'gray.1500',
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
            background: 'primary.lightest',
            fontWeight: 'semibold',
            position: 'relative',
            zIndex: 1,
            borderRadius: 0,
            _hover: {
              background: 'primary.lightest',
            },
            _before: {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: 'primary.main',
              borderRadius: 'full',
              zIndex: -1,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.selectedBtnProps,
          },
          isInRangeBtnProps: {
            color: 'primary.dark',
            background: 'primary.lightest',
            borderRadius: 0,
            ...propsConfigs?.dayOfMonthBtnProps?.isInRangeBtnProps,
          },
          ...propsConfigs?.dayOfMonthBtnProps,
        },
        ...propsConfigs,
      }}
    />
  );
};
