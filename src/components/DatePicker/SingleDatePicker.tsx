import { Popover } from '@chakra-ui/react';
import {
  SingleDatepicker,
  SingleDatepickerProps,
} from 'chakra-dayzed-datepicker';
import { format } from 'date-fns';

import useLanguage from '@/hooks/useLanguage';
import { getControlSize } from '@/theme/controlSizes';

import { Button, ButtonProps } from '../Button';
import { MdOutlineCalendarToday } from '../Icon';
import {
  getDateFnsLocale,
  getDayNames,
  getDefaultFullDateFormat,
  getMonthNames,
} from '../MonthPicker/constants';
import type { DatePickerSizeProps } from './DatePicker.types';

export const SingleDatePicker = ({
  propsConfigs,
  configs,
  usePortal = true,
  size,
  ...rest
}: SingleDatepickerProps & DatePickerSizeProps) => {
  const control = getControlSize(size);
  const { language } = useLanguage();
  const dateFormat = configs?.dateFormat ?? getDefaultFullDateFormat(language);
  const dateFnsLocale = getDateFnsLocale(language);

  return (
    <SingleDatepicker
      usePortal={usePortal}
      {...rest}
      configs={{
        monthNames: getMonthNames(language, 'LLLL'),
        dayNames: getDayNames(language),
        ...configs,
        dateFormat,
      }}
      propsConfigs={{
        triggerBtnProps: {
          justifyContent: 'left',
          fontWeight: 'regular',
          color: 'fg.default',
          fontSize: 'md',
          ...propsConfigs?.triggerBtnProps,
        },
        inputProps: {
          color: 'fg.default',
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
          color: 'fg.muted',
          fontWeight: 'regular',
          ...propsConfigs?.weekdayLabelProps,
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            width: 34,
            height: 34,
            color: 'fg.default',
            fontSize: 'sm',
            fontWeight: 'regular',
            _hover: {
              background: 'primary.wash',
              ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps?._hover,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps,
          },
          todayBtnProps: {
            fontWeight: 'semibold',
            boxShadow: 'inset 0 0 0 1px var(--chakra-colors-border-strong)',
            ...propsConfigs?.dayOfMonthBtnProps?.todayBtnProps,
          },
          selectedBtnProps: {
            color: 'fg.onPrimary',
            border: 'none',
            background: 'primary.main',
            borderRadius: 'full',
            ...propsConfigs?.dayOfMonthBtnProps?.selectedBtnProps,
          },
          ...propsConfigs?.dayOfMonthBtnProps,
        },
        ...propsConfigs,
      }}
    >
      {(selectedDate) => (
        <Popover.Trigger asChild>
          <Button
            pl={2}
            variant="secondary"
            size={size}
            {...(propsConfigs?.triggerBtnProps as ButtonProps)}
          >
            <MdOutlineCalendarToday
              boxSize={control.iconBoxSize}
              color="fg.subtle"
              style={{ marginInlineEnd: 3 }}
            />
            {selectedDate
              ? format(selectedDate, dateFormat, { locale: dateFnsLocale })
              : ''}
          </Button>
        </Popover.Trigger>
      )}
    </SingleDatepicker>
  );
};
