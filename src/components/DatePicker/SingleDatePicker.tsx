import {
  SingleDatepicker,
  SingleDatepickerProps,
} from 'chakra-dayzed-datepicker';

import { MdOutlineCalendarToday } from '../Icon';

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
          pl: 2,
          fontWeight: 'regular',
          color: 'gray.1500',
          fontSize: 'md',
          children: (
            <>
              <MdOutlineCalendarToday
                color="gray.600"
                style={{ marginInlineEnd: 8 }}
              />
            </>
          ),
        } as any, // Type assertion for v3 compatibility
        inputProps: {
          color: 'primary.dark',
          ...propsConfigs?.inputProps,
        },
        popoverCompProps: {
          popoverContentProps: {
            borderRadius: 16,
            border: '1px solid',
            borderColor: 'blue.300',
            boxShadow: 'lg',
            ...propsConfigs?.popoverCompProps?.popoverContentProps,
          } as any,
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
            p: 4,
            border: 'none',
            ...propsConfigs?.calendarPanelProps?.contentProps,
          } as any,
          bodyProps: {
            gap: 0,
            rowGap: 1,
            ...propsConfigs?.calendarPanelProps?.bodyProps,
          } as any,
          ...propsConfigs?.calendarPanelProps,
        },
        dateNavBtnProps: {
          color: 'primary.main',
          ...propsConfigs?.dateNavBtnProps,
        },
        weekdayLabelProps: {
          mb: 2,
          color: 'gray.1000',
          fontSize: 'xs',
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
              background: 'primary.light',
              ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps?._hover,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps,
          },
          // Today
          todayBtnProps: {
            fontWeight: 'semibold',
            ...propsConfigs?.dayOfMonthBtnProps?.todayBtnProps,
          },
          selectedBtnProps: {
            color: 'white',
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
