import {
  RangeDatepicker as BaseRangeDatePicker,
  RangeDatepickerProps,
} from 'chakra-dayzed-datepicker';

import { MdOutlineCalendarToday } from '../Icon';

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
        // Manually make it look like an Input
        triggerBtnProps: {
          justifyContent: 'left',
          pl: 2,
          fontWeight: 'regular',
          color: 'gray.1500',
          fontSize: 'md',
          leftIcon: (
            <MdOutlineCalendarToday
              color="gray.600"
              style={{ marginInlineEnd: 3 }}
            />
          ),
        },
        inputProps: {
          color: 'primary.dark',
          ...propsConfigs?.inputProps,
        },
        dayOfMonthBtnProps: {
          // Regular day
          defaultBtnProps: {
            fontWeight: 'regular',
            _hover: {
              background: 'primary.light',
              ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps?._hover,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps,
          },
          // Today
          todayBtnProps: {
            color: 'gray.1200',
            fontWeight: 'semibold',
            ...propsConfigs?.dayOfMonthBtnProps?.todayBtnProps,
          },
          selectedBtnProps: {
            color: 'primary.dark',
            background: 'primary.light',
            ...propsConfigs?.dayOfMonthBtnProps?.selectedBtnProps,
          },
          isInRangeBtnProps: {
            color: 'primary.dark',
            background: 'primary.light',
            ...propsConfigs?.dayOfMonthBtnProps?.isInRangeBtnProps,
          },
          ...propsConfigs?.dayOfMonthBtnProps,
        },
        ...propsConfigs,
      }}
    />
  );
};
