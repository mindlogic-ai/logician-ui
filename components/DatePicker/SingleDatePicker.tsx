import React from 'react';
import {
  SingleDatepicker,
  SingleDatepickerProps,
} from 'chakra-dayzed-datepicker';

import { Icon } from '../Icon';

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
        // Manually make it look like an Input
        triggerBtnProps: {
          justifyContent: 'left',
          pl: 2,
          fontWeight: 'regular',
          color: 'gray.1500',
          fontSize: 'md',
          height: '100%',
          leftIcon: (
            <Icon
              icon="MdOutlineCalendarToday"
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
          ...propsConfigs?.dayOfMonthBtnProps,
        },
        ...propsConfigs,
      }}
    />
  );
};
